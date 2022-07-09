import db from "../databases/database.js"
import joi from "joi";
import { ObjectId } from "mongodb";

const productSchema = joi.object({
    name: joi.string().required(),
    description: joi.string().required(),
    sale: joi.number().positive(),
    price: joi.number().positive().required(),
    image: joi.string().regex(new RegExp('(http)?s?:?(\/\/[^\"\']*\.(?:png|jpg|jpeg|gif|png|svg))')).required()
});

function isProduct(product) {
    const { error } = productSchema.validate(product);
    console.log(error);
    if (!error) return true;
    return false;
}

export async function createProduct(req, res) {
    try {

        const product = req.body;

        if (!isProduct(product)) return res.status(422).send({ "message": "Ops! Produto fora do padrão!" });

        await db.collection("products").insertOne(product);

        return res.status(201).send({ message: "sucesso" });
    } catch (error) {
        return res.status(400).send({ message: error });
    }
}

export async function readProduct(req, res) {
    try {
        const { id } = req.query;
        let search;

        if (id) {
            search = await db.collection("products").find({ _id: new ObjectId(id) }).toArray();
        } else {
            search = await db.collection("products").find().toArray()
        }

        return res.status(200).send({ products: search });
    } catch (error) {

        return res.status(400).send({ message: "Ops! Ocorreu um erro!" });

    }
}


