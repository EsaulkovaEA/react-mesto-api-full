import React from "react";
import { Link, withRouter } from "react-router-dom";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.password) {
      const { email, password } = this.state;
      this.props.onRegister(email, password);
    }
  };
  render() {
    return (
      <div className="auth">
        <h1 className="auth__title">Регистрация</h1>
        <form onSubmit={this.handleSubmit} className="auth__form">
          <input required id="email" name="email" className="auth__input" placeholder="Email" type="email" value={this.state.email} onChange={this.handleChange} />
          <input required id="password" name="password" className="auth__input" placeholder="Пароль" type="password" value={this.state.password} onChange={this.handleChange} />
          <div className="register__button-container">
            <button type="submit" onSubmit={this.handleSubmit} className="auth__link" >
              Зарегистрироваться
            </button>
          </div>
        </form>
        <p className="auth__signin">
          Уже зарегистрированы?
          <Link to="/sign-in" className="auth__login-link">
            Войти
          </Link>
        </p>
      </div>
    );
  }
}

export default withRouter(Register);
