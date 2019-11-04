import Subscription from '../models/Subscription';

class SubscriptionController {
  async index(req, res) {
    return res.json({ message: ' ok' });
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
