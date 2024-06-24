'use server';
import { Rating } from '@/components/nav/feedback-button';
import { createTransport } from 'nodemailer';
import { z } from 'zod';

const PASSWORD = process.env.password;
const EMAIL = process.env.email;
const HOST = process.env.host;

const FeedbackSchema = z.object({
  email: z
    .string()
    .email()
    .optional()
    .refine(async email => email && email.length > 1),
  feedback: z.string().min(1).max(5000),
  rating: z.nativeEnum(Rating).optional(),
});

export async function postFeedback(formData: z.infer<typeof FeedbackSchema>) {
  const feedback = FeedbackSchema.parse({
    email: formData.email,
    feedback: formData.feedback,
    rating: formData.rating,
  });

  const transporter = createTransport({
    port: 465,
    host: HOST,
    auth: {
      user: EMAIL,
      pass: PASSWORD,
    },
    secure: true,
  });

  const mailData = {
    from: 'find.army@gmail.com',
    to: EMAIL,
    subject: 'Feedback from Find.Army',
    text: `Email: ${feedback.email ?? 'No email'} \n\nMessage: ${feedback.feedback} \n\nRating: ${feedback.rating ?? 'No rating'}`,
  };

  return new Promise<void>((resolve, reject) => {
    transporter.sendMail(mailData, function (err: any, info: any) {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        console.log('Email sent: ' + info.response);
        resolve();
      }
    });
  });
}
