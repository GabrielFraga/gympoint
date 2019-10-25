import jwt from 'jsonwebtoken';
import User from '../models/User';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'user does not exists!' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'password does not match' });
    }

    const { name } = user;

    return res.json({
      user: { name, email },
      token: jwt.sign({ name }, authConfig.secret),
      expiresIn: authConfig.expiresIn,
    });
  }
}
export default new SessionController();
