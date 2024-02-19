const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: "robinsihag22@gmail.com",
    pass: "wipo rdex porf oydo",
  },
});

module.exports = {
  transporter,
};
