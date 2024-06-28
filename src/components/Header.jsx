import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['accessToken']);
  const navigate = useNavigate();

  const logoutHandler = () => {
    removeCookie('accessToken', { path: '/' });
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <header className="header-container">
      <div className="logo">Beweary</div>
      <nav>
        <ul>
          {isLoggedIn ? (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
