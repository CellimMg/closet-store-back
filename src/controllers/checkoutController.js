import db from "../databases/database.js";
import dayjs from "dayjs";
import { ObjectId } from "mongodb";

export async function checkout(req, res) {
  try {
    const userData = res.locals.userData;
    const checkoutData = res.locals.checkoutData
    const date = dayjs().locale("pt-br").format("DD/MM");

    const testeIdsListaDeCompras = []

    const adress = `CEP: ${checkoutData.CEP}, complemento: ${checkoutData.complement}`

    console.log(checkoutData)

    await db.collection('purchases').insertOne({
      adress,
      total: 50,
      date,
      itemsList: [{ id: 2, qtde: 1, price: 250 }, { id: 3, qtde: 1, price: 250 }],
      userId: userData._id.toString()
    });


    await db.collection("users").updateOne(
      { _id: userData._id }, {
      $unset: { cart: ""}
    })

    res.status(201).send({ message: "tudo ok" });

  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
};
