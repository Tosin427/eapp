import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";
import "./Register.css";

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

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    // <div className="main">
    //   <div className="contain1">
    //     <div>
    //       <Fragment>
    //         <h1
    //           className="large text-primary"
    //           style={{ color: "#004100", fontSize: "28px" }}
    //         >
    //           Sign Up
    //         </h1>
    //         <p className="lead" style={{ color: "#004100", fontSize: "16px" }}>
    //           <i className="fas fa-user" /> Create Your Account
    //         </p>
    //         <form className="form" onSubmit={onSubmit}>
    //           <div className="form-group">
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
    //           <div className="form-group">
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
    //             {/* <small className="form-text">
    //             This site uses Gravatar so if you want a profile image, use a
    //             Gravatar email
    //           </small> */}
    //           </div>
    //           <div className="form-group">
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
    //           <div className="form-group">
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
    //             className="btn btn-primary"
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
    //           className="my-1"
    //           style={{ color: "#004100", paddingTop: "10px" }}
    //         >
    //           Already have an account? <Link to="/login">Sign In</Link>
    //         </p>
    //       </Fragment>
    //     </div>
    //   </div>
    // </div>

    <div className="login-wrapper">
        <div className="login-form-wrapper">
            <h3><Link to='/'> <i className='fa fa-home'></i> </Link>Create account!</h3>
            <p>Join the thousands sending and recieving funds with e-blaze wallet</p>
            <form onSubmit={onSubmit}>
                <label htmlFor="name">Name</label>
                <input 
                  placeholder="John Doe" 
                  type="text" 
                  onChange={onChange}
                  disabled={state.isSigningUp}
                  name='name' 
                  value={state.name} />
                <label htmlFor="email">Email</label>
                <input 
                  type="email"
                  name='email'  
                  disabled={state.isSigningUp}
                  value={state.email}
                  onChange={onChange}
                  placeholder="mail@example.com"/>
                  <label htmlFor="email">Password</label>
                <input 
                  type="password"
                  name='password'  
                  disabled={state.isSigningUp}
                  value={state.password}
                  onChange={onChange}
                  placeholder="somesecurepassword"/>
                  <label htmlFor="email">Password Confirmation</label>
                <input 
                  type="password"
                  name='password2'  
                  disabled={state.isSigningUp}
                  value={state.password2}
                  onChange={onChange}
                  placeholder="reenter password"/>
                <button 
                  disabled={state.isSigningUp}
                  className="login primary">{!state.isSigningUp ? "Sign up" : "Please wait"} <i className="fa fa-chevron-right"></i></button>
                <Link to="/login" className="form-link">Sign-in here <i className="fa fa-arrow-right"></i></Link>
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
