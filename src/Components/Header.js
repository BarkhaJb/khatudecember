import React, { useState, useEffect } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import logo from "./assets/images/finallogo.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Menu = ({ setCurrentArtist, searchAPI, selectStyle, setSelectStyle }) => {
  const [scroll, setScroll] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [artist, setArtist] = useState([]);
  const [searchValue, setSearchValue] = useState();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const navigate = useNavigate();
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 50);
    });
  }, []);

  const handleScroll = () => {
    setSelectStyle(null);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const url = "https://khatuwaleshyam.com:3100/artist/songs";
    fetch(url)
      .then((response) => response.json())
      .then((json) => setArtist(json))
      .catch((error) => console.log(error));
  }, []);

  const MoveToTopArtist = (user) => {
    // console.log('navigating artist', user);
    setCurrentArtist(user);
    setSelectStyle(null);
    navigate("/Top-Artist");
  };

  const SearchSongs = () => {
    navigate("/search", { state: searchValue });
  };

  return (
    <div className="container-fluid">
      <div className="navigation">
        <Navbar
          expand="lg"
          expanded={expanded}
          className="navbar navbar-expand-lg navbar-light bg-light"
        >
          <div className="header-left">
            <div className="headre-area">
              <div className="logo-n-toggle">
                <div className="logo">
                  {" "}
                  <Link className="logo-box" to="">
                    <img
                      onClick={() => handleScroll()}
                      src={logo}
                      className="logoimg"
                    />
                  </Link>
                </div>
              </div>

              <div className="form-inline my-2 my-lg-0 navbar-search">
                <input
                  class="form-control mr-sm-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  onChange={(e) => setSearchValue(e.target.value.toLowerCase())}
                />
                <button onClick={SearchSongs} className="searchbtn">
                  <i class="fa fa-search" aria-hidden="true"></i>
                  <p className="searchfont">Search</p>
                </button>
              </div>
            </div>
            <Navbar.Toggle
              aria-controls="responsive-na"
              onClick={() => setExpanded(expanded ? false : "expanded")}
            />
            <div className="menu">
              <Navbar.Collapse>
                <Nav onClick={() => setExpanded(false)}>
                  <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                      <NavLink
                        onClick={() => handleScroll()}
                        to="/"
                        className="nav-link"
                      >
                        {" "}
                        Home
                      </NavLink>
                    </li>
                    <li className="nav-item dropdown">
                      <NavLink
                        to=""
                        className="nav-link dropdown-toggle"
                        id="navbarDropdown"
                        role="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        Top Artists
                      </NavLink>

                      <div
                        onClick={() => handleScroll()}
                        class="dropdown-menu"
                        aria-labelledby="navbarDropdown"
                      >
                        {artist.map((user) => (
                          <ul>
                            <li
                              onClick={() => MoveToTopArtist(user)}
                              class="dropdown-item"
                            >
                              {user.artist}
                            </li>
                          </ul>
                        ))}
                      </div>
                    </li>

                    <li className="nav-item">
                      <NavLink
                        onClick={() => handleScroll()}
                        to="/Trending"
                        className="nav-link"
                      >
                        {" "}
                        Trending Bhajans
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        onClick={() => handleScroll()}
                        to="/Allbhajan"
                        className="nav-link"
                      >
                        {" "}
                        All Bhajans
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        onClick={() => handleScroll()}
                        to="/newReleases"
                        className="nav-link"
                      >
                        Latest Release
                      </NavLink>
                    </li>

                    <li className="nav-item sound">
                      <NavLink
                        onClick={() => handleScroll()}
                        to="/radio"
                        className="nav-link"
                      >
                        <i class="fa fa-volume-up" aria-hidden="true"></i>
                        <p className="radiopara"> Shri Shyam Radio</p>
                      </NavLink>
                    </li>
                    <li className="nav-item arzii">
                                                 <NavLink onClick={()=>handleScroll()}  to="/requestpage"className="nav-link">
                                                 <i class="fa fa-bell-o bell" aria-hidden="true"></i>
                                             <p className="arzipara"> arzii</p>
                                           </NavLink>
                                          </li>
                  </ul>
                </Nav>
              </Navbar.Collapse>
            </div>
          </div>
        </Navbar>
      </div>
    </div>
  );
};

export default Menu;
