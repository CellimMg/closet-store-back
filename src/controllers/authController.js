import db from "../databases/database.js";
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

export async function signup(_, res) {
  try {
    const signUpData = res.locals.signUpData;

    const encryptedPassword = bcrypt.hashSync(signUpData.password, 10);

    await db.collection('users').insertOne({ ...signUpData, password: encryptedPassword });
    res.status(201).send({ message: 'Usuário criado com sucesso' });

  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
};

export async function login(_, res) {
  try {
    const loginData = res.locals.loginData;
    const user = await db.collection('users').findOne({ email: loginData.email });

    if (user && bcrypt.compareSync(loginData.password, user.password)) {
      const token = uuid();

      console.log(user.name)

      await db.collection('users').updateOne({
        _id: user._id
      }, { $set: { session: token } });

      return res.status(201).send(
        {
          token,
          name: user.name,
          lastName: user.lastName,
          email: user.email,
          img: user.img,
          id: user._id
        });
    } else {
      return res.status(401).send('Senha ou email incorretos!');

    }
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
}