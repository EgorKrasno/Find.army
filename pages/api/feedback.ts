require('dotenv').config();
import {NextApiRequest, NextApiResponse} from "next";

interface Data {
  text: string;
  email?: string;
  rating?: string;
}

const PASSWORD = process.env.password;
const EMAIL = process.env.email;
const HOST = process.env.host;

export default (req: NextApiRequest, res: NextApiResponse<Data>) => {
  let nodemailer = require('nodemailer')

  const transporter = nodemailer.createTransport({
    port: 465,
    host: HOST,
    auth: {
      user: EMAIL,
      pass: PASSWORD
    },
    secure: true,
  })

  const email = req.body?.email;
  const message = req.body?.text;

  const mailData = {
    from: 'find.army@gmail.com',
    to: EMAIL,
    subject: `Feedback from Find.Army`,
    text: `Email: ${email} \n\nMessage: ${message} \n\nRating: ${req.body?.rating}`,
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