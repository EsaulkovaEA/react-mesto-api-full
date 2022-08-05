import logo from "../images/Logo.svg";
import { Switch, Route, Link } from "react-router-dom";

function Header({email,onSignOut}) {
  return (
    <header className="header">
      <img src={logo} alt="Логотип Место" className="header__logo" />
      <Switch>
        <Route exact path="/sign-in">
          <Link to="/sign-up" className="header__link">
            Регистрация
          </Link>
        </Route>
        <Route exact path="/sign-up">
          <Link to="/sign-in" className="header__link">
            Войти
          </Link>
        </Route>
        <Route exact path="/">
          <div className="header__user-info">
            <p className="header__email">{email}</p>
            <Link
              to="/sign-in"
              className="header__link header__link_signOut"
              onClick={onSignOut}
            >
              Выйти
            </Link>
          </div>
        </Route>
      </Switch>
    </header>
  );
}

export default Header;
