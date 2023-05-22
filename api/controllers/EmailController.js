const nodemailer = require("nodemailer");
require('dotenv').config({path:'vars.env'});

const transporter = nodemailer.createTransport({
    host: `${process.env.EMAIL_HOST}`,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: `${process.env.EMAIL_NAME}`,
      pass: `${process.env.EMAIL_PASSWORD}`,
    },
    tls: {
        rejectUnauthorized: false,
      },
  });
  
module.exports = {
    sendConfirmationEmail: async (req, res) => {
        const mailOptions = {
          from: `${process.env.EMAIL_NAME}`,
          to: req.body.email,
          subject: "Confirmação de Registro",
          text: `Obrigado por se registrar, ${req.body.name}. Sua conta foi criada com sucesso!`,
        };
      
        try {
          await transporter.sendMail(mailOptions);
          res.status(201).json();
        } catch (error) {
          res.status(500).json(error);
        }
    },

    sendCode: async (req, res) => {
        console.log(req.body)
        const mailOptions = {
          from: `${process.env.EMAIL_NAME}`,
          to: req.body.email,
          subject: "Confirmação de Registro",
          text: `Código de verificação: ${req.body.code}. Use este código para se registrar no site!`,
        };
      
        try {
          await transporter.sendMail(mailOptions);
          res.status(201).json();
        } catch (error) {
          console.error(error);
          res.status(500).json(error);
        }
      }

}


