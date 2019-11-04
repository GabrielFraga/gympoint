import * as Yup from 'yup';
import Subscription from '../models/Subscription';

class SubscriptionController {
  async index(req, res) {
    const subscrition = await Subscription.findAll();

    return res.json(subscrition);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number().required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'validation fails' });
    }
    const subscritionExists = await Subscription.findOne({
      where: {
        title: req.body.title,
      },
    });

    if (subscritionExists) {
      return res.status(401).json({ error: `subscription already exists` });
    }

    const subscription = await Subscription.create(req.body);

    return res.json(subscription);
  }

  async update(req, res) {
    return res.json({ message: 'ok' });
  }

  async delete(req, res) {
    return res.json({ message: 'ok' });
  }
}

export default new SubscriptionController();
