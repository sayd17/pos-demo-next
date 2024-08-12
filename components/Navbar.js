import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo_white from "../public/assets/logo/logo_white.png";

// Menu list
const menuItems = [
  {
    name: "Products",
    url: "/",
    isPro: true,
    icon: "product.png",
  },
  {
    name: "Adjustment",
    url: "/",
    isPro: true,
    icon: "adjustment.png",
  },
  {
    name: "Purchase",
    url: "/",
    isPro: true,
    icon: "purchase.png",
  },
  {
    name: "Sale",
    url: "/",
    isPro: true,
    icon: "sale.png",
  },
  {
    name: "Due Management",
    url: "/",
    isPro: true,
    icon: "due-management.png",
  },
  {
    name: "Quotations",
    url: "/quotations",
    isPro: false,
    icon: "quotation.png",
  },
  {
    name: "Invoice",
    url: "/invoice-generate",
    isPro: false,
    icon: "invoice.png",
  },
  {
    name: "Print Label",
    url: "/print-label",
    isPro: false,
    icon: "level-print.png",
  },
  {
    name: "Expense",
    url: "/",
    isPro: true,
    icon: "expense.png",
  },
  {
    name: "Income",
    url: "/",
    isPro: true,
    icon: "income.png",
  },
  {
    name: "Cash Flow",
    url: "/",
    isPro: true,
    icon: "cash-flow.png",
  },
  {
    name: "People",
    url: "/",
    isPro: true,
    icon: "people.png",
  },
  {
    name: "Reports",
    url: "/",
    isPro: true,
    icon: "report.png",
  },
  {
    name: "Customer Points",
    url: "/",
    isPro: true,
    icon: "customerPoints.png",
  },
  {
    name: "Settings",
    url: "/",
    isPro: true,
    icon: "setting.png",
  },
];

const Navbar = () => {
  const [menuShow, setMenuShow] = useState(false);
  return (
    <>
      <header
        className="navbar navbar-dark sticky-top bg-blue flex-md-nowrap p-0 shadow"
        style={{ height: "80px" }}
      >
        <button
          onClick={() => setMenuShow(true)}
          className="navbar-toggler position-absolute mt-3 d-md-none collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#sidebarMenu"
          aria-controls="sidebarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <a className="col-md-3 col-lg-2 me-0 px-3" href="#">
          <Image src={logo_white} alt="Dokane_POS_logo" height={40} />
        </a>
      </header>
      <div id="defaultLayout">
        <div className="container-fluid">
          <div className="row">
            <nav
              id="sidebarMenu"
              className={`col-md-3 col-lg-2 d-md-block bg-light sidebar collapse pt-2 pt-md-5 ${
                menuShow ? "show" : ""
              }`}
            >
              <div className="position-sticky pt-0 pt-md-5">
                <ul className="nav flex-column">
                  {menuItems.map((item, index) => (
                    <li key={index} className="nav-item">
                      <Link
                        onClick={() => setMenuShow(false)}
                        className="nav-link d-flex justify-content-between align-items-center pe-3 fs-6"
                        href={item.url}
                      >
                        <span>
                          <img
                            src={`assets/icon/${item.icon}`}
                            className="icon"
                          />
                          {item.name}
                          {item.isPro ? (
                            <small className="badge rounded-pill bg-blue ms-3">
                              PRO
                            </small>
                          ) : (
                            <small className="badge rounded-pill bg-orange ms-3">
                              Free
                            </small>
                          )}
                        </span>
                        <span data-feather="chevron-right"></span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
