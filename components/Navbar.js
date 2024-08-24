import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo_white from "../public/assets/logo/logo_white.png";
import { MenuItems } from "@/constants";
import { MenuIcon } from "@heroicons/react/outline";

const Navbar = () => {
  const [menuShow, setMenuShow] = useState("hidden");
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
          <span>
            <MenuIcon className="btn-width" />
          </span>
        </button>
        <a className="col-md-3 col-lg-2 me-0 px-3" href="#">
          <Image src={logo_white} priority alt="Dokane_POS_logo" height={40} />
        </a>
      </header>
      <div id="defaultLayout">
        <div className="container-fluid">
          <div className="row">
            <nav
              id="sidebarMenu"
              className={`col-md-3 col-lg-2 d-md-block bg-light sidebar collapse pt-2 pt-md-5 ${menuShow}`}
            >
              <div className="position-sticky pt-0 pt-md-5">
                <ul className="nav flex-column">
                  {MenuItems.map((item, index) => (
                    <li key={index} className="nav-item">
                      <Link
                        onClick={() => setMenuShow("hidden")}
                        className="nav-link d-flex justify-content-between align-items-center pe-3 fs-6"
                        href={item.url}
                      >
                        <span>
                          <img
                            src={`assets/icon/${item.icon}`}
                            className="icon"
                          />
                          {item.name}
                          <small
                            className={`badge rounded-pill ${
                              item.isPro ? "bg-blue" : "bg-orange"
                            } ms-3`}
                          >
                            {item.isPro ? "Pro" : "Free"}
                          </small>
                        </span>
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
