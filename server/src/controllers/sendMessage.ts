import InvoiceObj from "../controllers/typeInvoice";
import logger from "../library/logger";
import { config } from "../config/config";
import { upiqr } from "upiqr";
import MessagingResponse from "twilio/lib/twiml/MessagingResponse";

var sid = config.twilio.sid;
var auth_token = config.twilio.token;

var twilio = require("twilio")(sid, auth_token);

export function send_message(body: InvoiceObj): Number {
  let flag: Number = 0;
  const noofprod = body.cart.product.length;
  const date = `${body.date.getDate()}/${body.date.getMonth()}/${body.date.getFullYear()}`;
  let products: String = "Prod \t Rate \t QTY";
  for (let i = 0; i < noofprod; i++) {
    products =
      products +
      `\n ${body.cart.product[i]} \t ${body.cart.rate[i]} \t ${body.cart.qty[i]} \n`;
  }

  let paymentLink = "";
  upiqr({
    payeeVPA: config.upi.vpa,
    payeeName: config.upi.payee,
    amount: body.totalAmount,
  })
    .then((upi) => {
      paymentLink = String(upi.intent);
      logger.info("Payment Link created!");
      const response = new MessagingResponse();
      twilio.messages
        .create({
          from: "whatsapp:+14155238886",
          to: `whatsapp:+91${body.mobile_number}`,
          body: ` Hello ${body.customer_name}, \n Invoice No - ${body.invoice_num} \n Date: ${date} \n Products bought: \n ${products} \n Total Due: ${body.totalAmount} \n Pay on: ${paymentLink}`,
        })
        .then(function (res) {
          flag = 1;
          logger.info(
            `Sending message to ${body.customer_name} @ ${body.mobile_number}`
          );
          response.message("Message Sent!");
        })
        .catch(function (err) {
          logger.error(err);
          flag = 0;
        });
    })
    .catch((err) => {
      logger.error(err);
      flag = 0;
    });

  return flag;
}
