import React, { Component } from 'react';
import './Style_Register.css';
import { isEmail } from 'validator';
// import { FacebookLoginButton,GoogleLoginButton } from "react-social-login-buttons";
// import { FacebookLoginButton } from "react-social-login-buttons";
// import { register } from './UserFunctions' try get api from Laravel + DB


export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = this.getInitialState();
  }
  state = {
    isPasswordShown: false
  };

  togglePasswordVisiblity = () => {
    const { isPasswordShown } = this.state;
    this.setState({ isPasswordShown: !isPasswordShown });
  };

  getInitialState = () => ({
    data: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    errors: {}
  });

  handleChange = (e) => {
    this.setState({
      data: {
        ...this.state.data,
        [e.target.name]: e.target.value
      },
      errors: {
        ...this.state.errors,
        [e.target.name]: ''
      }
    });
  }

  validate = () => {
    const { data } = this.state;
    let errors = {};

    if (data.firstName === '') errors.firstName = 'First Name can not be blank.';
    if (data.lastName === '') errors.lastName = 'Last Name can not be blank.';
    if (!isEmail(data.email)) errors.email = 'Email must be valid.';
    if (data.email === '') errors.email = 'Email can not be blank.';
    if (data.password === '') errors.password = 'Password must be valid.';
    if (data.confirmPassword !== data.password) errors.confirmPassword = 'Passwords must match.';

    return errors;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { data } = this.state;
    const errors = this.validate();

    if (Object.keys(errors).length === 0) {
      console.log(data);
      //Call an api here
      // register(newUser).then(res => { // my code
      //     this.props.history.push(`/login`)
      // })
      //Resetting the form
      this.setState(this.getInitialState());
    } else {
      this.setState({ errors });
    }
  }
  render() {
    const { isPasswordShown } = this.state;
    const { data, errors } = this.state;
    
    return (
      <div className="register-wrapper">
        <div className="register-container">
        <header className="register-title">Register Form</header>
          <form className="register-form" onSubmit={this.handleSubmit}>
           <div className="row"> {/* row1 */}
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="register-input-field">
                  <input
                    placeholder="First Name"
                    id="firstName"
                    value={data.firstName}
                    invalid={errors.firstName ? true : false}
                    name="firstName"
                    onChange={this.handleChange} 
                  />
                  <span className="register-messages">{errors.firstName}</span>
                </div>
              </div>
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="register-input-field">
                 <input
                    placeholder="Last Name"
                    id="lastName"
                    value={data.lastName}
                    invalid={errors.lastName ? true : false}
                    name="lastName"
                    onChange={this.handleChange} 
                  />
                  <span className="register-messages">{errors.lastName}</span>
                </div>
              </div>
            </div> {/* end row1 */}
            <div className="register-input-field">
              <input
                placeholder="Email"
                id="email"
                value={data.email} invalid={errors.email ? true : false}
                name="email"
                onChange={this.handleChange}
              />
              <span className="register-messages">{errors.email}</span>
            </div>

            <div className="register-input-field">
              <input
                placeholder="Password"
                id="password"
                value={data.password}
                type={isPasswordShown ? "text" : "password"}
                name="password"
                invalid={errors.password ? true : false}
                onChange={this.handleChange}
              />
              <span className="register-messages">{errors.password}</span>
              <i 
                className="fa fa-eye password-icon"
                onClick={this.togglePasswordVisiblity}
              />
            </div>
              
            <div className="register-input-field">
              <input
                placeholder="Confirm Password"
                id="confirmPassword"
                value={data.confirmPassword}
                type="password"
                name="confirmPassword"
                invalid={errors.confirmPassword ? true : false}
                onChange={this.handleChange}
              />
              <span className="register-messages">{errors.confirmPassword}</span>
            </div>
            <div className="register-button">
              <div className="register-btn-background"></div>
              <button>REGISTER</button>
            </div>
            <div className="register-text-center">
              <small className="fogotPass">Already Account? Login</small>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
