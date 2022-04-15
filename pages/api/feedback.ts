require('dotenv').config();
import {NextApiRequest, NextApiResponse} from "next";

interface Data {
  text: string;
  email?: string;
  rating?: string;
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

  const email = req.body?.email.substring(5000).trim();
  const message = req.body?.text.substring(5000).trim();

  const mailData = {
    from: 'yourmom@gmail.com',
    to: 'egorkra@gmail.com',
    subject: `Feedback from Find.Army`,
    text: `Email: ${email} \n\nMessage: ${message}t \n\nRating: ${req.body?.rating}`,
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