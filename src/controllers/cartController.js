import db from "../databases/database.js";
import joi from "joi";
import { ObjectId } from "mongodb";


const itemCartSchema = joi.object({
    uid: joi.string().required(),
    productId: joi.string().min(1).required()
});

async function userExist(uid) {
    const user = await db.collection('users').findOne({ _id: new ObjectId(uid) });
    if (user) {
        return true;
    }
    return false;
}

async function productExist(idProduto) {
    const product = await db.collection('products').findOne({ _id: new ObjectId(idProduto) });

    if (product) { return true; }
    return false;
}

function isValid(data) {
    const { error } = itemCartSchema.validate(data);

    if (error) return false;
    else return true;
}

export async function createCart(req, res) {
    try {
        const { uid, productId } = req.body;

        if (!isValid({ uid, productId })) {
            return res.sendStatus(422);
        }
        const user = await userExist(uid);
        const product = await productExist(productId);

        if (!user || !product) {
            return res.sendStatus(404);
        }

        db.collection("users").updateOne({ _id: new ObjectId(uid) }, { $push: { cart: productId } });
        return res.status(200).send({ message: "sucesso" });
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: "erro" });
    }
}
