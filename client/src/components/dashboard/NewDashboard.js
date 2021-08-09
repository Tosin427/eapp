import React from "react";
import { Divider } from "antd";

function NewDashboard() {
  return (
    <div>
      <Divider orientation="left">Wallets</Divider>
      <div style={{ margin: "auto", width: "50%", padding: "10px" }}>
        <h1
          style={{
            color: "#004100",
            fontSize: "50px",
            textAlign: "center",
            paddingTop: "100px",
          }}
        >
          Welcome Back
        </h1>
        <p style={{ color: "#004100", textAlign: "center" }}>
          Click on Wallet Tab!!!
        </p>
        {/* <img style={{ width: '50%' }} src={logo} alt="" /> */}
      </div>
    </div>
  );
}

export default NewDashboard;
