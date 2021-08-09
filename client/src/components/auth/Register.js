import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";
import "./Register.css";
import img from '../../img/login-img1.png'

const Register = ({ setAlert, register, isAuthenticated }) => {
  // const [formData, setFormData] = useState({
  //   name: "",
  //   email: "",
  //   password: "",
  //   password2: "",
  // });
  // const { name, email, password, password2 } = formData;

  const initial_state = {
    name: '',
    email: '',
    password: '',
    password2: '',
    isSigningUp: false,
    showPassword: false,
  }

  const [state, setState] = useState(initial_state);

  const onChange = (e) => setState(prevState => ({...prevState, [e.target.name]: e.target.value }))
    // setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const {name, email, password, password2} = state;
    if (password !== password2) {
      setAlert("Passwords do not match", "danger");
    } else {
      register({ name, email, password });
    }
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
    // <div classNameName="main">
    //   <div classNameName="contain1">
    //     <div>
    //       <Fragment>
    //         <h1
    //           classNameName="large text-primary"
    //           style={{ color: "#004100", fontSize: "28px" }}
    //         >
    //           Sign Up
    //         </h1>
    //         <p classNameName="lead" style={{ color: "#004100", fontSize: "16px" }}>
    //           <i classNameName="fas fa-user" /> Create Your Account
    //         </p>
    //         <form classNameName="form" onSubmit={onSubmit}>
    //           <div classNameName="form-group">
    //             <input
    //               type="text"
    //               placeholder="Name"
    //               name="name"
    //               value={name}
    //               onChange={onChange}
    //               style={{
    //                 width: "100%",
    //                 borderRadius: "5px",
    //                 border: "2px solid #fff",
    //                 backgroundColor: "#004100",
    //                 color: "#fff",
    //                 padding: "8px 10px",
    //                 margin: "8px 0",
    //               }}
    //             />
    //           </div>
    //           <div classNameName="form-group">
    //             <input
    //               type="email"
    //               placeholder="Email Address"
    //               name="email"
    //               value={email}
    //               onChange={onChange}
    //               style={{
    //                 width: "100%",
    //                 borderRadius: "5px",
    //                 border: "2px solid #fff",
    //                 backgroundColor: "#004100",
    //                 color: "#fff",
    //                 padding: "8px 10px",
    //                 margin: "8px 0",
    //               }}
    //             />
    //             {/* <small classNameName="form-text">
    //             This site uses Gravatar so if you want a profile image, use a
    //             Gravatar email
    //           </small> */}
    //           </div>
    //           <div classNameName="form-group">
    //             <input
    //               type="password"
    //               placeholder="Password"
    //               name="password"
    //               value={password}
    //               onChange={onChange}
    //               style={{
    //                 width: "100%",
    //                 borderRadius: "5px",
    //                 border: "2px solid #fff",
    //                 backgroundColor: "#004100",
    //                 color: "#fff",
    //                 padding: "8px 10px",
    //                 margin: "8px 0",
    //               }}
    //             />
    //           </div>
    //           <div classNameName="form-group">
    //             <input
    //               type="password"
    //               placeholder="Confirm Password"
    //               name="password2"
    //               value={password2}
    //               onChange={onChange}
    //               style={{
    //                 width: "100%",
    //                 borderRadius: "5px",
    //                 border: "2px solid #fff",
    //                 backgroundColor: "#004100",
    //                 color: "#fff",
    //                 padding: "8px 10px",
    //                 margin: "8px 0",
    //               }}
    //             />
    //           </div>
    //           <input
    //             type="submit"
    //             classNameName="btn btn-primary"
    //             value="Register"
    //             style={{
    //               backgroundColor: "#004100",
    //               border: "none",
    //               color: "#fff",
    //               padding: "16px 32px",
    //               textDecoration: "none",
    //               margin: "4px 2px",
    //               cursor: "pointer",
    //             }}
    //           />
    //         </form>
    //         <p
    //           classNameName="my-1"
    //           style={{ color: "#004100", paddingTop: "10px" }}
    //         >
    //           Already have an account? <Link to="/login">Sign In</Link>
    //         </p>
    //       </Fragment>
    //     </div>
    //   </div>
    // </div>

    <div className="login-wrapper">
        <div className="left-side">
            <h1>Create Account,</h1>
            <h2>Join thousands sending and recieving crypto </h2>
            <h2>with e-blaze wallet </h2>
            <img src={img} alt="Banner" />
        </div>
        <div className="right-side">
            <form onSubmit={onSubmit}>
                <h1 className="title">Create Account!</h1>
                <label htmlFor="name">Name</label>
                <div className="input-group">
                    <input 
                      placeholder="John Doe"
                      name='name'
                      value={state.name} 
                      onChange={onChange}
                      type="text" />
                    <i className="fa fa-user"></i>
                </div>
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
                      
                      className={`fa ${state.showPassword ? 'fa-eye-slash' : 'fa-eye'}`} ></i>
                    
                </div>
                <label htmlFor="password">Password Confirmation</label>
                <div className="input-group">
                    <input 
                      type={state.showPassword ? 'text' : 'password'}
                      name='password2'
                      value={state.password2}
                      onChange={onChange}  
                      placeholder="somepassword"/>
                    <i
                      onClick={handleTogglePassword} 
                      className={`fa ${state.showPassword ? 'fa-eye-slash' : 'fa-eye'}`} ></i>
                    
                </div>
                <button type='submit' className="login primary">Register <i className="fa fa-chevron-right"></i></button>
                <p>Already registered? <Link to="/login" className="form-link">Login</Link></p>
            </form>
        </div>
    </div>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
