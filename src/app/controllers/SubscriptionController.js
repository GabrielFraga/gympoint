import Subscription from '../models/Subscription';

class SubscriptionController {
  async index(req, res) {
    const subscrition = await Subscription.findAll();

    return res.json(subscrition);
  }

  async store(req, res) {
    return res.json({ message: 'ok' });
  }

  async update(req, res) {
    return res.json({ message: 'ok' });
  }

  async delete(req, res) {
    return res.json({ message: 'ok' });
  }
}

export default new SubscriptionController();
