import { useTranslation } from "react-i18next";
import MenuItems from "./MenuItems";

export default function Header() {
  const menus = MenuItems();
  const { t,i18n, ready } = useTranslation();
  if (!ready) return "loading translations...";
  
  return (
    <div className="header-area">
      <div className="navbar-area navbar-two">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <nav className="navbar navbar-expand-lg">
                <a className="navbar-brand" href="index.html">
                  <img src="assets/images/logo.png" alt="Logo" />
                </a>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarTwo"
                  aria-controls="navbarTwo"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="toggler-icon" />
                  <span className="toggler-icon" />
                  <span className="toggler-icon" />
                </button>
                <div
                  className="collapse navbar-collapse sub-menu-bar"
                  id="navbarTwo"
                >
                  <ul className="navbar-nav m-auto">
                    {menus.map((value, index) => {
                      return (
                        <li className="nav-item">
                          <a className="page-scroll" href="#home">
                            {t(value.locale)}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="navbar-btn d-none d-sm-inline-block">
                  <a className="main-btn" href="#">
                    Get a Ticket
                  </a>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div
        id="home"
        className="header-content-area bg_cover d-flex align-items-center"
        style={{ backgroundImage: "url(assets/images/header-bg.jpg)" }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="header-content text-center">
                <h2 className="header-title">
                  You are Using Free Lite Version of Eventify
                </h2>
                <h3 className="sub-title">
                  Please, purchase full version to get all sections, features
                  and permission to remove credits
                </h3>
                <ul className="header-btn">
                  <li>
                    <a
                      className="main-btn main-btn-2"
                      href="https://rebrand.ly/eventify-ud"
                      rel="nofollow"
                    >
                      Purchase Now
                    </a>
                  </li>
                  <li>
                    <a
                      className="main-btn"
                      href="https://rebrand.ly/eventify-ud"
                      rel="nofollow"
                    >
                      Learn More
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
