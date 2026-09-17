import "./Header.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";


export default function Header() {

    const { user, logout } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const location = useLocation();
    const navigate = useNavigate();


    useEffect(() => {
        setMenuOpen(false);
        if (!location.pathname.startsWith("/menu")) {
            setSearchValue("");
        }
    }, [location.pathname]);

    if (
        location.pathname === "/login" ||
        location.pathname === "/register"
    ) {
        return null;
    }

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchValue(value);

        if (value.trim()) {
            navigate(`/menu?search=${encodeURIComponent(value.trim())}`, { replace: true });
        } else if (location.pathname.startsWith("/menu")) {
            navigate("/menu", { replace: true });
        }
    };

    return (
        <header className="header">

            <div className="header__search">

                <input type="text"
                    placeholder="Buscar bebida..."
                    className="header__input"
                    value={searchValue}
                    onChange={handleSearchChange}
                />

            </div>

            <div className="header__actions">

                {!user ? (
                    <>
                        <Link
                            to="/login"
                            className="header__link"
                        >
                            Iniciar Sesión
                        </Link>

                        <Link
                            to="/register"
                            className="header__button"
                        >
                            Registrar
                        </Link>
                    </>
                ) : (
                    <div className="header__user-wrapper">

                        <button
                            className="header__user"
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                            👤 {user.name} ▼
                        </button>

                        {menuOpen && (

                            <div className="header__dropdown">

                                <Link
                                    to="/perfil"
                                    className="header__dropdown-link"
                                >
                                    Mi perfil
                                </Link>

                                {user.role === "admin" && (
                                    <Link
                                        to="/admin"
                                        className="header__dropdown-link"
                                    >
                                        Panel Admin
                                    </Link>
                                )}

                                <button
                                    className="header__logout"
                                    onClick={logout}
                                >
                                    Cerrar sesión
                                </button>

                            </div>

                        )}

                    </div>
                )}
            </div>

        </header>
    );
}