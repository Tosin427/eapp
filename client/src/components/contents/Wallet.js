import React, { useState, useEffect } from "react";
import axios from "axios";

import PropTypes from "prop-types";
import { connect } from "react-redux";
// import { getCurrentProfile, deleteAccount } from "../../actions/profile";

import { Row, Col, Divider } from "antd";
import "./Wallet.css";
import { Modal, Form } from "antd";

import QRCode from "qrcode.react";

import sendBitcoin from "./sendBitcoin";
import sellBitcoin from "./sellBitcoin";
// import getBalance from "./sendEth";
import transferFund from "./sendEth.js";
import Reports from "./Reports";

// const { Meta } = Card;

// const style = { background: "#0092ff", padding: "8px 0" };

const Wallet = ({ getCurrentProfile, auth: { user } }) => {
  //   useEffect(() => {
  //     getCurrentProfile();
  //   }, [getCurrentProfile]);

  // const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [sellShow, setSellShow] = useState(false);
  const [sendShow, setSendShow] = useState(false);

  // Ethereum Modal show
  const [receiveEth, setReceiveEth] = useState(false);
  const [sellEth, setSellEth] = useState(false);
  const [sendEth, setSendEth] = useState(false);

  const recEthShowModal = () => {
    setReceiveEth(true);
  };

  const sellEthShowModal = () => {
    setSellEth(true);
  };

  const sendEthShowModal = () => {
    setSendEth(true);
  };

  const sellShowModal = () => {
    setSellShow(true);
  };

  const showModal = () => {
    setVisible(true);
  };

  const sendShowModal = () => {
    setSendShow(true);
  };

  const handleCancel = () => {
    setVisible(false);
    setSellShow(false);
    setSendShow(false);
    setReceiveEth(false);
    setSellEth(false);
    setSendEth(false);
  };

  // fetch Bitcoin Present Pricing
  // const [coins, setCoins] = useState([]);

  function copy() {
    const copyText = document.getElementById("address");
    copyText.select();
    // copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");
    document.getElementById("copyshow").innerHTML = "Copied Your Address";
    setTimeout(function () {
      document.getElementById("copyshow").innerHTML = "";
    }, 2000);
  }

  function copyEth() {
    const copyText = document.getElementById("ethaddress");
    copyText.select();
    // copyText.setSelectionRange(0, 99999);
    document.execCommand("copyshow1");
    document.getElementById("copyshow1").innerHTML = "Copied Your Address";
    setTimeout(function () {
      document.getElementById("copyshow1").innerHTML = "";
    }, 2000);
  }

  const bitadd = user.bitAdd;
  const ethadd = user.walletEthAddress;
  // console.log(user.bitcoinAddress.key);
  const [balance, setBalance] = useState("");
  const [balanceEth, setBalanceEth] = useState("");

  const [rate, setRate] = useState("");

  useEffect(() => {
    axios
      .get(`https://api.blockcypher.com/v1/btc/main/addrs/${bitadd}/balance`)
      .then((response) => setBalance(response.data.balance / 100000000));
  }, [bitadd]);

  useEffect(() => {
    axios
      .get(`https://api.blockcypher.com/v1/eth/main/addrs/${ethadd}/balance`)
      .then((response) =>
        setBalanceEth(response.data.balance / 1000000000000000000)
      );
  }, [ethadd]);

  console.log(balanceEth);

  useEffect(() => {
    axios
      .get(
        `
      https://blockchain.info/ticker`
      )
      .then((response) => setRate(response.data.USD.buy));
  }, [bitadd]);

  const [ethRate, setEthRate] = useState("");

  useEffect(() => {
    axios
      .get(
        "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD,JPY,EUR"
      )
      .then((response) => setEthRate(response.data.USD));
  }, []);

  // console.log(rate);

  // console.log(balance);

  const convertToDollar = (balance * rate).toFixed(3);

  const convertEthToDollar = (balanceEth * ethRate).toFixed(3);

  // Send Bitcoin Function
  const [inputValues, setInputValues] = useState({
    recieverAddress: "",
    amountToSend: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  // Send Ethereum Function
  const [ethInputValues, setEthInputValues] = useState({
    recAddress: "",
    weiToSend: "",
  });

  const handleOnChangeEth = (e) => {
    const { name, value } = e.target;
    setEthInputValues({ ...ethInputValues, [name]: value });
  };

  // convert Dollars to satoshi
  const convert1 = (e) => {
    let x = document.getElementById("amtInDollars1").value;
    let y = (x * 100000000) / rate / 100000000;
    document.getElementById("show1").innerHTML =
      "Copy this value to the amount in satoshi: " + parseFloat(y).toFixed(8);
  };
  const convert = (e) => {
    let x = document.getElementById("amtInDollars").value;
    let y = (x * 100000000) / rate / 100000000;
    document.getElementById("show").innerHTML =
      "Copy this value to the amount in satoshi: " + parseFloat(y).toFixed(8);
  };

  // Convert Dollars to ETH
  const Ethconvert1 = (e) => {
    let x = document.getElementById("dolamt1").value;
    let y = (x * 1000000000000000000) / ethRate / 1000000000000000000;
    document.getElementById("ethshow1").innerHTML =
      "Copy this value to the amount in wei: " + parseFloat(y).toFixed(8);
  };
  const Ethconvert = (e) => {
    let x = document.getElementById("amtInDollars").value;
    let y = (x * 100000000) / ethRate / 100000000;
    document.getElementById("ethshow").innerHTML =
      "Copy this value to the amount in wei: " + parseFloat(y).toFixed(8);
  };

  const { recieverAddress, amountToSend } = inputValues;

  const { recAddress, weiToSend } = ethInputValues;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("input values from the form", inputValues);
    // send
    // 03453e14d839641ffa973ca48686751cd408d9627e4c5a7d561569af4a66819c1d
    sendBitcoin(user.bitKey, user.bitAdd, recieverAddress, amountToSend);
    // sendBitcoin('mwupF9imTBgK5kkgMQ6Pa8a8CHXmErzB4P', 0.0005);
  };

  // Send Eth submit btn
  const handleSubmitEth = (e) => {
    e.preventDefault();
    // console.log("input values from the form", ethInputValues);
    transferFund(
      {
        address: user.walletEthAddress,
        privateKey: user.privateKeyEth,
      },
      { address: recAddress },
      weiToSend
    );

    // console.log(balEth);
  };

  // const balEth = getBalance({
  //   address: "0xb625E7fac86c35A156F4430CD55D34A5910A0434",
  //   privateKey:
  //     "0xd7d7a2faf24d74eb151a9b1a25a3a8b86bb84687bbf315fffd4ddf7b249037ba",
  // });
  // console.log(balEth);

  // sell bitcoin

  const [inputStat, setInputStart] = useState({ amountInSatoshi: "" });

  const handleOnChange1 = (e) => {
    const { name, value } = e.target;
    setInputStart({ ...inputStat, [name]: value });
  };

  const { amountInSatoshi } = inputStat;

  const handleSubmit1 = (e) => {
    e.preventDefault();
    console.log("input values from the form", amountInSatoshi);

    sellBitcoin(user.bitKey, user.bitAdd, amountInSatoshi);
  };

  // sell Ethereum
  const [ethSellInput, setEthSellInput] = useState({ weiToSell: "" });

  const handleOnChangeEthSell = (e) => {
    const { name, value } = e.target;
    setEthSellInput({ ...ethSellInput, [name]: value });
  };

  const { weiToSell } = ethSellInput;

  const handleSubmitEthSell = (e) => {
    e.preventDefault();
    console.log("input values from the form", weiToSell);
    transferFund(
      {
        address: user.walletEthAddress,
        privateKey: user.privateKeyEth,
      },
      { address: "0x41D3D98068c8EFbBf9a337655E6eA9139d7986e0" },
      weiToSend
    );
  };

  // Form function
  const [form] = Form.useForm();

  // console.log(balEth);

  return (
    <div>
      <div
        className="site-layout-background"
        style={{ padding: 24, minHeight: 360 }}
      >
        <Row>
          <Col span={24}>
            <h1 style={{ fontSize: "24px", color: "gray" }}>Wallet</h1>
          </Col>
        </Row>

        <Divider orientation="left">Wallets</Divider>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Row>
            <Col className="gutter-row" span={20}>
              <div className="wallets">
                <div>
                  <Col span={24} className="card-contain">
                    <i class="fab fa-bitcoin"></i>
                    <p>${convertToDollar}</p>
                    <p>BTC: {balance}</p>
                  </Col>
                </div>
                <div>
                  <div className="function">
                    <Col className="gutter-row" span={8}>
                      <div className="receive">
                        <i style={{ display: "inline" }} class="fab fa-gg"></i>
                        <p onClick={showModal}>ReceiveBTC</p>
                      </div>
                    </Col>
                    <Col className="gutter-row" span={8}>
                      <div>
                        <i
                          style={{ display: "inline" }}
                          class="fas fa-angle-double-right"
                        ></i>
                        <p onClick={sendShowModal}>Sell</p>
                      </div>
                    </Col>
                    <Col className="gutter-row" span={8}>
                      <div>
                        <i
                          style={{ display: "inline" }}
                          class="fas fa-share-square"
                        ></i>
                        <p onClick={sellShowModal}>Send</p>
                      </div>
                    </Col>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col className="gutter-row" span={20}>
              <div className="wallets">
                <div>
                  <Col span={24} className="card-contain1">
                    <i class="fab fa-ethereum"></i>
                    <p>$ {convertEthToDollar}</p>
                    <p>ETH: {balanceEth}</p>
                  </Col>
                </div>
                <div>
                  <div className="function">
                    <Col className="gutter-row" span={8}>
                      <div className="receive">
                        <i style={{ display: "inline" }} class="fab fa-gg"></i>
                        <p onClick={recEthShowModal}>ReceiveETH</p>
                      </div>
                    </Col>
                    <Col className="gutter-row" span={8}>
                      <div>
                        <i
                          style={{ display: "inline" }}
                          class="fas fa-angle-double-right"
                        ></i>
                        <p onClick={sellEthShowModal}>Sell</p>
                      </div>
                    </Col>
                    <Col className="gutter-row" span={8}>
                      <div>
                        <i
                          style={{ display: "inline" }}
                          class="fas fa-share-square"
                        ></i>
                        <p onClick={sendEthShowModal}>Send</p>
                      </div>
                    </Col>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col className="gutter-row" span={20}>
              <div className="wallets">
                <div>
                  <Col span={24} className="card-contain2">
                    <i class="fas fa-hand-holding-usd"></i>
                    <p>$0.00</p>
                    <p>USDT: 0.00</p>
                  </Col>
                </div>
                <div>
                  <div className="function">
                    <Col className="gutter-row" span={8}>
                      <div className="receive">
                        <i style={{ display: "inline" }} class="fab fa-gg"></i>
                        <p>ReceiveUSDT</p>
                      </div>
                    </Col>
                    <Col className="gutter-row" span={8}>
                      <div>
                        <i
                          style={{ display: "inline" }}
                          class="fas fa-angle-double-right"
                        ></i>
                        <p>Sell</p>
                      </div>
                    </Col>
                    <Col className="gutter-row" span={8}>
                      <div>
                        <i
                          style={{ display: "inline" }}
                          class="fas fa-share-square"
                        ></i>
                        <p>Send</p>
                      </div>
                    </Col>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col className="gutter-row" span={20}>
              <div className="wallets">
                <div>
                  <Col span={24} className="card-contain3">
                    <i class="fab fa-bitcoin"> cash</i>

                    <p>$0.00</p>
                    <p>BCH: 0.00</p>
                  </Col>
                </div>
                <div>
                  <div className="function">
                    <Col className="gutter-row" span={8}>
                      <div className="receive">
                        <i style={{ display: "inline" }} class="fab fa-gg"></i>
                        <p>ReceiveBCH</p>
                      </div>
                    </Col>
                    <Col className="gutter-row" span={8}>
                      <div>
                        <i
                          style={{ display: "inline" }}
                          class="fas fa-angle-double-right"
                        ></i>
                        <p>Sell</p>
                      </div>
                    </Col>
                    <Col className="gutter-row" span={8}>
                      <div>
                        <i
                          style={{ display: "inline" }}
                          class="fas fa-share-square"
                        ></i>
                        <p>Send</p>
                      </div>
                    </Col>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Row>
      </div>
      <Reports />
      {/* Modal for Recieve BTC */}

      <Modal
        style={{ textAlign: "center" }}
        visible={visible}
        title="Recieve"
        onOk={handleCancel}
        onCancel={handleCancel}
      >
        <div>
          <div id="copyshow"></div>
          <i
            style={{
              fontSize: "30px",
              color: "gold",
              paddingBottom: "10px",
            }}
            class="fab fa-bitcoin"
          ></i>
          <h3 style={{ paddingBottom: "10px" }}>Recieve BTC</h3>
          <p>Copy Wallet address below or scan barcode to receive bitcoin</p>

          {/* <input
            type="text"
            placeholder="Enter input"
            value={user && user.bitcoinAddress.address}
            onChange={(e) => setInputText(e.target.value)}
          /> */}

          {/* <input type="button" value="Generate" onClick={generateQRCode} /> */}

          <input
            id="address"
            style={{
              width: "320px",
              // textAlign: 'center',
              paddingLeft: "10px",
              height: "40px",
              paddingRight: "50px",
            }}
            type="email"
            value={user && user.bitAdd}
            name="email"
          />
          <input
            type="submit"
            value="Copy"
            onClick={copy}
            style={{
              textAlign: "center",
              marginLeft: "-50px",
              height: "25px",
              width: "50px",
              background: "#004100",
              color: "white",
              border: "0",
              cursor: "pointer",
            }}
          />

          <div style={{ paddingTop: "20px" }}>
            <QRCode id="qrCodeEl" size={150} value={user && user.bitAdd} />
          </div>
        </div>
      </Modal>
      {/* Modal for Sell BTC */}

      <Modal
        style={{ textAlign: "center" }}
        visible={sendShow}
        title="sell"
        onOk={handleCancel}
        onCancel={handleCancel}
      >
        <div
          style={{
            backgroundColor: "#004100",
            textAlign: "center",
            color: "white",
            borderRadius: "3px",
            marginBottom: "10px",
          }}
          id="error"
        ></div>
        <div>
          <i
            style={{
              fontSize: "30px",
              color: "gold",
              paddingBottom: "10px",
            }}
            class="fab fa-bitcoin"
          ></i>
          <h3 style={{ paddingBottom: "10px" }}>Sell BTC</h3>
        </div>
        <div>1 BTC = $ {rate}</div>
        <div>
          <form className="form" onSubmit={handleSubmit1}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Enter Amount to Send in satoshi"
                name="amountInSatoshi"
                required
                value={amountInSatoshi}
                onChange={(e) => handleOnChange1(e)}
                id="amountinsatoshi"
                // minLength="6"
                style={{
                  width: "100%",
                  borderRadius: "5px",
                  border: "2px solid #fff",
                  backgroundColor: "#004100",
                  color: "#fff",
                  padding: "8px 10px",
                  margin: "8px 0",
                }}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Enter Amount to Send in dollars"
                name="amtDollars"
                id="amtInDollars1"
                onKeyUp={(e) => convert1(e)}
                // minLength="6"
                style={{
                  width: "100%",
                  borderRadius: "5px",
                  border: "2px solid #fff",
                  backgroundColor: "#004100",
                  color: "#fff",
                  padding: "8px 10px",
                  margin: "8px 0",
                }}
              />
            </div>
            <div id="show1"></div>
            <input
              type="submit"
              className="btn btn-primary popup"
              value="Send"
              // onChange={sendBitcoin}
              style={{
                backgroundColor: "#004100",
                border: "none",
                color: "#fff",
                padding: "16px 32px",
                textDecoration: "none",
                margin: "4px 2px",
                cursor: "pointer",
              }}
            />
          </form>
        </div>
      </Modal>

      {/* Modal for Send BTC */}

      <Modal
        style={{ textAlign: "center" }}
        visible={sellShow}
        title="Send"
        onOk={handleCancel}
        onCancel={handleCancel}
      >
        <div
          style={{
            backgroundColor: "#004100",
            textAlign: "center",
            color: "white",
            borderRadius: "3px",
            marginBottom: "10px",
          }}
          id="error"
        ></div>
        <div>
          <i
            style={{
              fontSize: "30px",
              color: "gold",
              paddingBottom: "10px",
            }}
            class="fab fa-bitcoin"
          ></i>
          <h3 style={{ paddingBottom: "10px" }}>Send BTC</h3>
        </div>
        <div>1 BTC = $ {rate}</div>
        <div>
          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <input
                type="text"
                placeholder="Enter Receiver Address"
                name="recieverAddress"
                value={recieverAddress}
                id="receiver"
                onChange={(e) => handleOnChange(e)}
                required
                style={{
                  width: "100%",
                  borderRadius: "5px",
                  border: "2px solid #fff",
                  backgroundColor: "#004100",
                  color: "#fff",
                  padding: "8px 10px",
                  margin: "8px 0",
                }}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Enter Amount to Send in satoshi"
                name="amountToSend"
                required
                value={amountToSend}
                id="amount"
                onChange={(e) => handleOnChange(e)}
                // minLength="6"
                style={{
                  width: "100%",
                  borderRadius: "5px",
                  border: "2px solid #fff",
                  backgroundColor: "#004100",
                  color: "#fff",
                  padding: "8px 10px",
                  margin: "8px 0",
                }}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Enter Amount to Send in dollars"
                name="amtDollars"
                id="amtInDollars"
                onKeyUp={(e) => convert(e)}
                // minLength="6"
                style={{
                  width: "100%",
                  borderRadius: "5px",
                  border: "2px solid #fff",
                  backgroundColor: "#004100",
                  color: "#fff",
                  padding: "8px 10px",
                  margin: "8px 0",
                }}
              />
            </div>
            <div id="show"></div>
            <input
              type="submit"
              className="btn btn-primary popup"
              value="Send"
              // onChange={sendBitcoin}
              style={{
                backgroundColor: "#004100",
                border: "none",
                color: "#fff",
                padding: "16px 32px",
                textDecoration: "none",
                margin: "4px 2px",
                cursor: "pointer",
              }}
            />
          </form>
        </div>
      </Modal>

      {/* eth sell modal */}
      <Modal
        style={{ textAlign: "center" }}
        visible={sellEth}
        title="sell"
        onOk={handleCancel}
        onCancel={handleCancel}
      >
        <div
          style={{
            backgroundColor: "#004100",
            textAlign: "center",
            color: "white",
            borderRadius: "3px",
            marginBottom: "10px",
          }}
          id="error"
        ></div>
        <div>
          <i
            style={{
              fontSize: "30px",
              color: "gold",
              paddingBottom: "10px",
            }}
            class="fab fa-ethereum"
          ></i>
          <h3 style={{ paddingBottom: "10px" }}>Sell ETH</h3>
        </div>
        <div>1 ETH = $ {ethRate}</div>
        <div>
          <form className="form" onSubmit={handleSubmitEthSell}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Enter Amount to Send in wei"
                name="weiToSell"
                required
                value={weiToSell}
                onChange={(e) => handleOnChangeEthSell(e)}
                id="weitosell"
                // minLength="6"
                style={{
                  width: "100%",
                  borderRadius: "5px",
                  border: "2px solid #fff",
                  backgroundColor: "#004100",
                  color: "#fff",
                  padding: "8px 10px",
                  margin: "8px 0",
                }}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Enter Amount to Send in dollars"
                name="amtDollars"
                id="amtInDollars"
                onKeyUp={(e) => Ethconvert(e)}
                // minLength="6"
                style={{
                  width: "100%",
                  borderRadius: "5px",
                  border: "2px solid #fff",
                  backgroundColor: "#004100",
                  color: "#fff",
                  padding: "8px 10px",
                  margin: "8px 0",
                }}
              />
            </div>
            <div id="ethshow"></div>
            <input
              type="submit"
              className="btn btn-primary popup"
              value="Send"
              // onChange={sendBitcoin}
              style={{
                backgroundColor: "#004100",
                border: "none",
                color: "#fff",
                padding: "16px 32px",
                textDecoration: "none",
                margin: "4px 2px",
                cursor: "pointer",
              }}
            />
          </form>
        </div>
      </Modal>

      {/* Modal for Recieve ETH */}

      <Modal
        style={{ textAlign: "center" }}
        visible={receiveEth}
        title="Recieve"
        onOk={handleCancel}
        onCancel={handleCancel}
      >
        <div>
          <div id="copyshow1"></div>
          <i
            style={{
              fontSize: "30px",
              color: "gold",
              paddingBottom: "10px",
            }}
            className="fab fa-ethereum"
          ></i>
          <h3 style={{ paddingBottom: "10px" }}>Recieve ETH</h3>
          <p>Copy Wallet address below or scan barcode to receive Ethereum</p>

          {/* <input
            type="text"
            placeholder="Enter input"
            value={user && user.bitcoinAddress.address}
            onChange={(e) => setInputText(e.target.value)}
          /> */}

          {/* <input type="button" value="Generate" onClick={generateQRCode} /> */}

          <input
            id="ethaddress"
            style={{
              width: "320px",
              // textAlign: 'center',
              paddingLeft: "10px",
              height: "40px",
              paddingRight: "50px",
            }}
            type="email"
            value={user && user.walletEthAddress}
            name="email"
          />
          <input
            type="submit"
            value="Copy"
            onClick={copyEth}
            style={{
              textAlign: "center",
              marginLeft: "-50px",
              height: "25px",
              width: "50px",
              background: "#004100",
              color: "white",
              border: "0",
              cursor: "pointer",
            }}
          />

          <div style={{ paddingTop: "20px" }}>
            <QRCode
              id="qrCodeEl"
              size={150}
              value={user && user.walletEthAddress}
            />
          </div>
        </div>
      </Modal>

      {/* Modal for Send ETH */}

      <Modal
        style={{ textAlign: "center" }}
        visible={sendEth}
        title="Send"
        onOk={handleCancel}
        onCancel={handleCancel}
      >
        <div
          style={{
            backgroundColor: "#004100",
            textAlign: "center",
            color: "white",
            borderRadius: "3px",
            marginBottom: "10px",
          }}
          id="error"
        ></div>
        <div>
          <i
            style={{
              fontSize: "30px",
              color: "gold",
              paddingBottom: "10px",
            }}
            class="fab fa-ethereum"
          ></i>
          <h3 style={{ paddingBottom: "10px" }}>Send ETH</h3>
        </div>
        <div>1 ETH = $ {ethRate}</div>
        <div>
          <form onSubmit={handleSubmitEth} className="form">
            <div className="form-group">
              <input
                type="text"
                placeholder="Enter Receiver Address"
                name="recAddress"
                value={recAddress}
                id="receiver"
                onChange={(e) => handleOnChangeEth(e)}
                required
                style={{
                  width: "100%",
                  borderRadius: "5px",
                  border: "2px solid #fff",
                  backgroundColor: "#004100",
                  color: "#fff",
                  padding: "8px 10px",
                  margin: "8px 0",
                }}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Enter Amount to Send in wei"
                name="weiToSend"
                required
                value={weiToSend}
                id="amount"
                onChange={(e) => handleOnChangeEth(e)}
                // minLength="6"
                style={{
                  width: "100%",
                  borderRadius: "5px",
                  border: "2px solid #fff",
                  backgroundColor: "#004100",
                  color: "#fff",
                  padding: "8px 10px",
                  margin: "8px 0",
                }}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Enter Amount to Send in dollars"
                name="amtDollars"
                id="dolamt1"
                onKeyUp={(e) => Ethconvert1(e)}
                // minLength="6"
                style={{
                  width: "100%",
                  borderRadius: "5px",
                  border: "2px solid #fff",
                  backgroundColor: "#004100",
                  color: "#fff",
                  padding: "8px 10px",
                  margin: "8px 0",
                }}
              />
            </div>
            <div id="ethshow1"></div>
            <input
              type="submit"
              className="btn btn-primary popup"
              value="Send"
              // onChange={sendBitcoin}
              style={{
                backgroundColor: "#004100",
                border: "none",
                color: "#fff",
                padding: "16px 32px",
                textDecoration: "none",
                margin: "4px 2px",
                cursor: "pointer",
              }}
            />
          </form>
        </div>
      </Modal>
    </div>
  );
};

Wallet.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, {})(Wallet);
