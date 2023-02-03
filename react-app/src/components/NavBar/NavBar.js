import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { BsSearch } from "react-icons/bs";
import { search } from "../../store/search";
import { Modal } from "../../context/Modal";
import LoginForm from "../../features/auth/AuthModal/LoginForm";
import SignUpForm from "../../features/auth/AuthModal/SignUpForm";
import LogoutButton from "../../features/auth/LogoutButton";
import NavUserDropdown from "./NavUserDropdown";
import RibbitLogo from "../../images/ribbit-banners/ribbit_logo_love.png";
import "./NavBar.css";

const NavBar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [results, setResults] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  const products = useSelector((state) => Object.values(state.search));

  const communityResults = products.filter(
    (product) => product.name !== undefined
  );
  const userResults = products.filter(
    (product) => product.username !== undefined
  );

  console.log("COMM:", communityResults);
  useEffect(() => {
    console.log(products);
  }, [products]);

  const handleQuery = async (e) => {
    e.preventDefault();

    setResults(await dispatch(search(searchValue)).query);
    setShowSearchDropdown(true);
    console.log(results);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleQuery(e);
    }
  };
  return (
    <nav>
      {/* <ul>
        <li>
          <NavLink to="/" exact={true}>
            <img className="ribbit-logo" src={RibbitLogo} />
          </NavLink>
        </li>
        <li>
          <NavLink to="/" exact={true} activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/c/all" exact={true}>
            All
          </NavLink>
        </li>
        {!user && (
          <li>
            <button onClick={() => setShowLoginForm(true)}>Login</button>
          </li>
        )}
        {!user && (
          <li>
            <button onClick={() => setShowSignupForm(true)}>Sign Up</button>
          </li>
        )}
        {showLoginForm && (
          <Modal title="Log In" onClose={() => setShowLoginForm(false)}>
            <LoginForm
              setShowLoginForm={setShowLoginForm}
              showLoginForm={showLoginForm}
              showSignupForm={showSignupForm}
              setShowSignupForm={setShowSignupForm}
            />
          </Modal>
        )}
        {showSignupForm && (
          <Modal title="Sign Up" onClose={() => setShowSignupForm(false)}>
            <SignUpForm
              setShowLoginForm={setShowLoginForm}
              showLoginForm={showLoginForm}
              showSignupForm={showSignupForm}
              setShowSignupForm={setShowSignupForm}
            />
          </Modal>
        )}
        {user && (
          <li>
            <LogoutButton />
          </li>
        )}
      </ul> */}
      <div></div>
      <div className="nav-search-bar">
        <div className="nav-search-stuff">
          <div className="nav-search-input-container">
            <button className="nav-search-btn" onClick={handleQuery}>
              <BsSearch />
            </button>
            <input
              value={searchValue}
              onKeyPress={handleEnter}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search for users and communities on Ribbit"
            />
          </div>
        </div>
        {showSearchDropdown && (
          <div className="nav-search-dropdown">
            {Object.keys(products).length > 0 ? (
              <>
                {communityResults.length > 0 && (
                  <div className="nav-search-section">
                    <h3>Communities</h3>
                    {products.map((product) => (
                      <div className="search-result-section">
                        {product.name !== undefined && (
                          <div className="search-result-community">
                            <NavLink
                              to={`/c/${product.id}`}
                              onClick={() => {
                                setShowSearchDropdown(false);
                                setSearchValue("");
                              }}
                            >
                              {product.name}
                            </NavLink>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                {userResults.length > 0 && (
                  <div className="nav-search-section">
                    <h3>Users</h3>
                    {products.map((product) => (
                      <div className="search-result-section">
                        {product.username !== undefined && (
                          <div className="search-result-community">
                            <NavLink
                              to={`/users/${product.id}/profile`}
                              onClick={() => {
                                setShowSearchDropdown(false);
                                setSearchValue("");
                              }}
                            >
                              {product.username}
                            </NavLink>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              ""
            )}
            {/* {Object.keys(products).length > 0
            ? products.map((product) => (
                <div className="search-result">
                  {product.name !== undefined && (
                    <div className="nav-search-communities">
                      <h3>Communities</h3>
                    </div>
                  )}
                  <NavLink to={`/products/${product.id}`}>
                    <img
                      src={product.productImages[product.previewImgId].url}
                      alt="search-result-product"
                    />
                  </NavLink>
                  <div className="search-result-details">
                    {" "}
                    {product.name !== undefined ? (
                      <NavLink to={`/products/${product.id}`}>
                        {product.name}
                      </NavLink>
                    ) : product.username !== undefined ? (
                      <div>{product.username}</div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              ))
            : ""} */}
          </div>
        )}
      </div>
      {user && <NavUserDropdown />}
    </nav>
  );
};

export default NavBar;
