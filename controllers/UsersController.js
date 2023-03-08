import dbClient from '../utils/db';
class UsersController {
  static async postNew (request, response) {
    response.set('Content-Type', 'application/json');

    const { email, password } = request.body;
    if (!email || !password) {
      response.status(400).json({ error: `Missing ${email ? 'password' : 'email'}` }).end();
    } else {
      if (await dbClient.chekEmail(email)) {
        response.status(400).json({ error: 'Already exist' }).end();
      } else {
        const ins = await dbClient.createNewUser(email, password);
        const newUser = {
          id: ins.ops[0]._id,
          email: ins.ops[0].email
        };
        response.status(201).json(newUser).end();
      }
    }
  }

  static async getMe (request, response) {
    const { usr } = request;
    delete usr.password;
    usr.id = usr._id;
    delete usr._id;
    response.status(200).json(usr).end();
  }
}

export default UsersController;
