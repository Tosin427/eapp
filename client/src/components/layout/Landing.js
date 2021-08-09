import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import logo from "../../img/logo.png";
import { Button } from "antd";
import "./Landing.css";

// const style = { background: '#0092ff', padding: '8px 0' };

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="main">
      <div className="main-build">
        <div style={{ borderRight: "1px solid #fff" }}>
          <img src={logo} alt="" />
        </div>
        <div style={{ paddingRight: "100px", paddingLeft: "20px" }}>
          <p
            style={{
              color: "#fff",
              width: "auto",
              textAlign: "justify",
            }}
          >
            Sign Up and get your cryptocurrency wallets, make receving and
            sending of cryto currencies easy, fast and secure
          </p>

          <Link to="/register">
            <Button type="primary" style={{ marginRight: "10px" }}>
              Sign Up
            </Button>
          </Link>
          <Link to="/login">
            <Button>Log In</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
