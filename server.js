const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();
let initialPath = path.join(__dirname, "public");
let app = express();

app.use(express.static(initialPath));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(initialPath, "index.html"));
});

app.post("/mail", (req, res) => {
  const { firstname, lastname, email, msg } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  })

  const mailOptions = {
    from: "enter sender email here",
    to: "enter reciever email here",
    subject: "Portfolio",
    text: `First name: ${firstname}, \nLast name: ${lastname}, 
      \nEmail: ${email}, \nMessage: ${msg}`
  }

  transporter.sendMail(mailOptions, (err, result) => {
    if (err) {
      console.log(err)
      res.json("opps! it looks like a error occurred. plz try again.")
    } else {
      res.json(
        "thanks for emailing me, I will reply to you as soon as possible"
      )
    }
  })
})

app.listen("3000", () => {
  console.log("listening.....");
});
