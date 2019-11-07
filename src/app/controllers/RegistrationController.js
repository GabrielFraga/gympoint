import * as Yup from 'yup';
import { addMonths, parseISO } from 'date-fns';
import Registration from '../models/Registration';
import Plan from '../models/Plan';
import Student from '../models/Student';

class RegistrationController {
  async index(req, res) {
    const registrations = Registration.findAll();
    return res.json(registrations);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(40).json({ error: 'validation fails' });
    }

    const { student_id, plan_id, start_date } = req.body;

    const plan = await Plan.findByPk(plan_id);

    if (!plan) {
      return res.status(400).json({ error: 'plan does not exists' });
    }

    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(400).json({ error: 'student does not exists' });
    }
    const startDate = parseISO(start_date);
    const end_date = addMonths(startDate, plan.duration);
    const price = plan.duration * plan.price;

    const registration = await Registration.create({
      student_id,
      plan_id,
      start_date: startDate,
      end_date,
      price,
    });

    return res.json(registration);
  }

  async update(req, res) {}

  async delete(req, res) {}
}
export default new RegistrationController();
