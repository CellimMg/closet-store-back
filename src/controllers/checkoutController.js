import db from "../databases/database.js";
import dayjs from "dayjs";

export async function checkout(req, res) {
  try {
    const userData = res.locals.userData;
    const checkoutData = res.locals.checkoutData
    const date = dayjs().locale("pt-br").format("DD/MM");

    const testeIdsListaDeCompras = ["id1", "id2", "id3", "id4"]

    const adress = `CEP: ${checkoutData.CEP}, complemento: ${checkoutData.complement}`

    console.log(checkoutData)

    await db.collection('purchases').insertOne({
      adress,
      total: 50,
      date,
      itensList: [{idItem: 50, qtde: 10}],
      userId: userData._id.toString()
    });

    await db.collection('users').updateOne({
      _id: userData._id
    }, { $push: { shoppingList: testeIdsListaDeCompras }});

    const teste = await db.collection("users").findOne({name:"teste"})

    res.status(201).send({ message: "tudo ok", data: teste});

  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
};

/* compra:
endereço,
total,
data,
array[{idProduto: qtd:}]
userId = _id do user

*/