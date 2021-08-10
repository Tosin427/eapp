import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";
import "antd/dist/antd.css";
import "./Login.css";
import img from '../../img/login-img1.png'

const Login = ({ login, isAuthenticated }) => {
  const initial_state = {
    email: '',
    password: '',
    isLoggingIn: false,
    showPassword: false,
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


  const handleTogglePassword = () => {
    return setState(prevState => ({
      ...prevState,
      showPassword: !prevState.showPassword
    }))
  }


  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="login-wrapper">
        <div className="left-side">
            <h1>Welcome back,</h1>
            <h2>Kindly fill in details to log in</h2>
            <img src={img} alt="Banner" />
        </div>
        <div className="right-side">
            <form onSubmit={onSubmit}>
                <h1 className="title">Welcome back!</h1>
                <label htmlFor="email">Email</label>
                <div className="input-group">
                    <input 
                      placeholder="someemail@example.com"
                      name='email'
                      value={state.email} 
                      onChange={onChange}
                      type="text" />
                    <i className="fa fa-envelope"></i>
                </div>
                <label htmlFor="password">Password</label>
                <div className="input-group">
                    <input 
                      type={state.showPassword ? 'text' : 'password'}
                      name='password'
                      value={state.password}
                      onChange={onChange}  
                      placeholder="somepassword"/>
                    <i 
                      onClick={handleTogglePassword}
                      className={`fa ${state.showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                    
                </div>
                <Link to="/" className="forgot-password right">Forgot password?</Link>
                <button type='submit' className="login primary">Sign in <i className="fa fa-lock"></i></button>
                <button onClick={() => null} className="login"> <img alt='Google logo' src="https://img.icons8.com/color/48/000000/google-logo.png"/> Sign in with google</button>
                <p>Dont have an account? <Link to="/register" className="form-link">Register</Link></p>
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
