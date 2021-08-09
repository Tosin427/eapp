import Web3 from "web3";
import axios from "axios";
import { Transaction } from "@ethereumjs/tx";
// const Web3 = require("web3");
// const axios = require("axios");

// import EthereumTx from ("ethereumjs-tx").Transaction
// const EthereumTx = require("ethereumjs-tx").Transaction;

const ethNetwork =
  "https://mainnet.infura.io/v3/148e172c64b34cf28a16bc736ea6b08b";
const web3 = new Web3(new Web3.providers.HttpProvider(ethNetwork));

const transferFund = async (sendersData, recieverData, amountToSend) => {
  return new Promise(async (resolve, reject) => {
    var nonce = await web3.eth.getTransactionCount(sendersData.address);
    web3.eth.getBalance(sendersData.address, async (err, result) => {
      if (err) {
        return reject();
      }
      let balance = web3.utils.fromWei(result, "ether");
      //   console.log(balance + " ETH");
      if (balance < amountToSend) {
        // console.log("insufficient funds");
        document.getElementById("error").innerHTML = "insufficient funds";
        setTimeout(function () {
          document.getElementById("error").innerHTML = "";
        }, 2000);
        return reject();
      }

      let gasPrices = await getCurrentGasPrices();
      let details = {
        to: recieverData.address,
        value: web3.utils.toHex(
          web3.utils.toWei(amountToSend.toString(), "ether")
        ),
        gas: 21000,
        gasPrice: gasPrices.low * 1000000000,
        nonce: nonce,
        chainId: 4, // EIP 155 chainId - mainnet: 1, rinkeby: 4
      };

      const transaction = Transaction.fromTxData(details, { chain: "mainnet" });
      let privateKey = sendersData.privateKey.split("0x");
      let privKey = Buffer.from(privateKey[1], "hex");
      transaction.sign(privKey);

      const serializedTransaction = transaction.serialize();

      web3.eth.sendSignedTransaction(
        "0x" + serializedTransaction.toString("hex"),
        (err, id) => {
          if (err) {
            console.log(err);
            return reject();
          }
          const url = `https://rinkeby.etherscan.io/tx/${id}`;
          console.log(url);
          resolve({ id: id, link: url });
        }
      );
    });
  });
};

const getCurrentGasPrices = async () => {
  let response = await axios.get(
    "https://ethgasstation.info/json/ethgasAPI.json"
  );
  let prices = {
    low: response.data.safeLow / 10,
    medium: response.data.average / 10,
    high: response.data.fast / 10,
  };
  return prices;
};

// const getBalance = async (sendersData) => {
//   return new Promise((resolve, reject) => {
//     web3.eth.getBalance(sendersData.address, async (err, result) => {
//       if (err) {
//         return reject(err);
//       }
//       resolve(web3.utils.fromWei(result, "ether"));
//     });
//   });
// };

// module.exports = transferFund;
export default transferFund;
// module.exports = getBalance;
