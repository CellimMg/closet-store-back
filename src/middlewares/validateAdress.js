import joi from "joi";

export async function validateAdress(req, res, next) {
  const {CEP, complement} = req.body;

  const adressSchema = joi.object({
    CEP: joi.string().pattern(/^[0-9]{5}\-[0-9]{3}$/).required(),
    complement: joi.string().max(3).required()
  });

  const { error } = adressSchema.validate({CEP, complement});

  if (error) {
    return res.status(422).send({message: "falhou no endereço", erromsg: error});
  }

  res.locals.checkoutData = req.body;

  next();
};