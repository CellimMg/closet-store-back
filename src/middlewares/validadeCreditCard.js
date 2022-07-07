import joi from "joi";

export async function validadeCreditCard(req, res, next) {
  const { holderName, creditCardNumber, CVV, expirationDate } = res.locals.checkoutData;

  const creditCardSchema = joi.object({
    holderName: joi.string().required(),
    creditCardNumber: joi.string().max(16).required(),
    CVV: joi.string().max(3).required(),
    expirationDate: joi.string().pattern(/^[0-9]{2}\/[0-9]{2}$/).required()
  });

  const { error } = creditCardSchema.validate({ holderName, creditCardNumber, CVV, expirationDate });

  if (error) {
    return res.status(422).send({ message: "falhou no cartão" });
  }

  const checkoutData = res.locals.checkoutData

  next();
};