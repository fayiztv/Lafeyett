// import twilio from "twilio";

// const client = twilio(
//   process.env.TWILIO_SID,
//   process.env.TWILIO_AUTH
// );

// export const sendSMS = (to, body) => {
//   return client.messages.create({
//     body,
//     to,
//     from: process.env.TWILIO_PHONE,
//   });
// };

export const sendSMS = async (to, body) => {
  console.log(`(Mock SMS) Sending to ${to}: ${body}`);
};
