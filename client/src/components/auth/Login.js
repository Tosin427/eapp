import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";
import "antd/dist/antd.css";
import "./Login.css";

const Login = ({ login, isAuthenticated }) => {
  const initial_state = {
    email: '',
    password: '',
    isLoggingIn: false,
  }

  // const [formData, setFormData] = useState({
  //   email: "",
  //   password: "",
  // })

  const [state, setState] = useState(initial_state);

  // const { email, password } = formData;

  const onChange = (e) => setState(prevState => ({...prevState, [e.target.name]: e.target.value}))
    // setFormData({ ...formData, [e.target.name]: e.target.value });


  const onSubmit = (e) => {
    e.preventDefault();
    // PLEASEDO SOME VALIDATION HERE IF THE USERNAME IS FILLED AND PASSWORD IS NOT EMPTY
    login(state.email, state.password);
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="login-wrapper">
        <div className="login-form-wrapper">
            <h3><Link to='/'> <i className='fa fa-home'></i> </Link>Welcome back!</h3>
            <p>Log back into your account</p>
            <form onSubmit={onSubmit}>
                <label htmlFor="username">Email</label>
                <input 
                  placeholder="someemail@example.com" 
                  type="text" 
                  onChange={onChange}
                  disabled={state.isLoggingIn}
                  name='email' 
                  value={state.email} />
                <label htmlFor="password">Password</label>
                <input 
                  type="password"
                  name='password'  
                  disabled={state.isLoggingIn}
                  value={state.password}
                  onChange={onChange}
                  placeholder="somesecurepassword"/>
                <Link to="/" className="forgot-password">Forgot password?</Link>
                <button 
                  disabled={state.isLoggingIn}
                  className="login primary">{!state.isLoggingIn ? "Sign in" : "Please wait"} <i className="fa fa-lock"></i></button>
                <button 
                  disabled={state.isLoggingIn}
                className="login"> <img alt='google logo' src="https://img.icons8.com/color/48/000000/google-logo.png"/> Sign in with google</button>
                <Link to="/register" className="form-link">Create account here <i className="fa fa-arrow-right"></i></Link>
            </form>
        </div>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
