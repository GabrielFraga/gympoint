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
    const schema = Yup.object().shape({
      title: Yup.string(),
      duration: Yup.number(),
      price: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'validation fails' });
    }

    const subscription = await Subscription.findByPk(req.params.id);

    if (!subscription) {
      return res.status(401).json({ error: 'subscription does not exists' });
    }
    const sub = await subscription.update(req.body);
    return res.json(sub);
  }

  async delete(req, res) {
    const subscription = await Subscription.findByPk(req.params.id);

    if (!subscription) {
      return res.status(401).json({ error: 'subscription does not exists' });
    }

    await subscription.destroy();
    const subs = await Subscription.findAll();

    return res.json(subs);
  }
}

export default new SubscriptionController();
