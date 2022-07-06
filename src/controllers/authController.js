import db from "../databases/database.js";
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

export async function signup (req, res){
  try {
    const signUpData = res.locals.signUpData;

    const encryptedPassword = bcrypt.hashSync(signUpData.password, 10);

    await db.collection('users').insertOne({ ...signUpData, password: encryptedPassword });
    res.status(201).send({ message: 'Usuário criado com sucesso' });

  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
}