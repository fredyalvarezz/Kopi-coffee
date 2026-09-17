const Order = require("../models/Order");
const Product = require("../models/Product");

// @route  POST /api/orders
// @access Cualquier usuario autenticado (o puedes abrirlo a público si
//         prefieres permitir pedidos sin cuenta, usando solo "customer")
// @desc   Crea un pedido. Recalculamos el total en el backend por seguridad,
//         nunca confiamos en el total que mande el frontend.
async function createOrder(req, res, next) {
  try {
    const { customer, items, paymentStatus } = req.body;

    if (!customer || !items || items.length === 0) {
      res.status(400);
      throw new Error("Faltan el nombre del cliente o los items del pedido");
    }

    let total = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);

      if (!product) {
        res.status(404);
        throw new Error(`Producto no encontrado: ${item.productId}`);
      }

      if (!product.stock) {
        res.status(400);
        throw new Error(`"${product.title}" está agotado`);
      }

      total += product.basePrice * item.quantity;
      orderItems.push({ productId: product._id, quantity: item.quantity });
    }

    const order = await Order.create({
      customer,
      user: req.user?._id, // si está logueado, queda ligado a su cuenta
      items: orderItems,
      total,
      status: "pending",
      paymentStatus: paymentStatus || "unpaid",
    });

    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
}

// @route  GET /api/orders
// @access Admin / barista
// @desc   Lista todos los pedidos (para el panel de Orders/OrdersTable)
async function getOrders(req, res, next) {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;

    const orders = await Order.find(filter)
      .populate("items.productId", "title basePrice image")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    next(error);
  }
}

// @route  GET /api/orders/mine
// @access Usuario autenticado
async function getMyOrders(req, res, next) {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("items.productId", "title basePrice image")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    next(error);
  }
}

// @route  PATCH /api/orders/:id/status
// @access Admin / barista
async function updateOrderStatus(req, res, next) {
  try {
    const { status, paymentStatus } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      res.status(404);
      throw new Error("Pedido no encontrado");
    }

    if (status) order.status = status;
    if (paymentStatus) order.paymentStatus = paymentStatus;

    await order.save();
    res.json(order);
  } catch (error) {
    next(error);
  }
}

// @route  GET /api/orders/dashboard
// @access Admin
// @desc   Igual que tu SalesChart/Reports/StatsCard: ventas totales,
//         ventas por día (últimos 7 días) y top productos.
async function getDashboard(req, res, next) {
  try {
    const completedOrders = await Order.find({ status: "completed" });
    const totalSales = completedOrders.reduce((sum, o) => sum + o.total, 0);

    // Ventas agrupadas por día, últimos 7 días (para SalesChart)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const salesByDay = await Order.aggregate([
      { $match: { status: "completed", createdAt: { $gte: sevenDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          total: { $sum: "$total" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Top productos: contamos cuántas veces aparece cada producto en pedidos completados
    const topProducts = await Order.aggregate([
      { $match: { status: "completed" } },
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.productId",
          unitsSold: { $sum: "$items.quantity" },
        },
      },
      { $sort: { unitsSold: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "product",
        },
      },
      { $unwind: "$product" },
      {
        $project: {
          _id: 0,
          productId: "$_id",
          title: "$product.title",
          image: "$product.image",
          unitsSold: 1,
        },
      },
    ]);

    res.json({
      totalSales,
      totalOrders: completedOrders.length,
      pendingOrders: await Order.countDocuments({ status: { $in: ["pending", "preparing", "ready"] } }),
      salesByDay,
      topProducts,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createOrder,
  getOrders,
  getMyOrders,
  updateOrderStatus,
  getDashboard,
};
