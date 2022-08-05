import React from 'react';
import { withRouter } from 'react-router-dom';

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }
  handleChange(e) {
    const {name, value} = e.target;
    this.setState({
      [name]: value
    });
  }
  handleSubmit(e){
    e.preventDefault();
    if (!this.state.email || !this.state.password){
      return;
    }
    this.props.onLogin(this.state.email, this.state.password);
  }
  render(){
    return(
      <div className="auth">
        <h1 className="auth__title">Вход</h1>
        <form onSubmit={this.handleSubmit} className="auth__form">
          <input required id="email" name="email" className="auth__input" placeholder="Email" type="email" value={this.state.email} onChange={this.handleChange} />
          <input required id="password" name="password" className="auth__input" placeholder="Пароль" type="password" value={this.state.password} onChange={this.handleChange} />
          <button type="submit" onSubmit={this.handleSubmit} className="auth__link">Войти</button>
        </form>
      </div>
    )
  }
}

export default withRouter(Login);
