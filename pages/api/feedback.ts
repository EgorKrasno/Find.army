require('dotenv').config();
import {NextApiRequest, NextApiResponse} from "next";

interface Data {
  text: string;
  email: string;
  rating: string;
}

const PASSWORD = process.env.password;

export default (req: NextApiRequest, res: NextApiResponse<Data>) => {
  let nodemailer = require('nodemailer')

  const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
      user: 'egorkra@gmail.com',
      pass: PASSWORD
    },
    secure: true,
  })

  const mailData = {
    from: 'egorkra@gmail.com',
    to: 'egorkra@gmail.com',
    subject: `Message From Find.Army`,
    text: `Email: ${req.body.email} \n\n Message: ${req.body.text}t \n\n Rating: ${req.body.rating}`,
  }

  transporter.sendMail(mailData, function (err: any, info: any) {
    if (err) {
      console.log(err)
      res.status(500).end();
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).end();
    }
  });

}