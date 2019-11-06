import * as Yup from 'yup';
import Plan from '../models/Plan';

class PlanController {
  async index(req, res) {
    const plan = await Plan.findAll();

    return res.json(plan);
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
    const planExists = await Plan.findOne({
      where: {
        title: req.body.title,
      },
    });

    if (planExists) {
      return res.status(401).json({ error: `plan already exists` });
    }

    const plan = await Plan.create(req.body);

    return res.json(plan);
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

    const plan = await Plan.findByPk(req.params.id);

    if (!plan) {
      return res.status(401).json({ error: 'plan does not exists' });
    }
    const sub = await plan.update(req.body);
    return res.json(sub);
  }

  async delete(req, res) {
    const plan = await Plan.findByPk(req.params.id);

    if (!plan) {
      return res.status(401).json({ error: 'plan does not exists' });
    }

    await plan.destroy();
    const plans = await Plan.findAll();

    return res.json(plans);
  }
}

export default new PlanController();
