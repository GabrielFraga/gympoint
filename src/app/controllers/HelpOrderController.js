import * as Yup from 'yup';
import { parseISO } from 'date-fns';
import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

class HelpOrderController {
  async index(req, res) {
    const order = await HelpOrder.findAll({
      where: { answer: null },
    });

    return res.json(order);
  }

  async studentHelpOrders(req, res) {
    const student = await Student.findByPk(req.params.id);
    if (!student) {
      res.status(401).json({ error: 'student does not exists' });
    }

    const order = await HelpOrder.findAll({
      where: { student_id: req.params.id },
    });

    return res.json(order);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      question: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'question not provided' });
    }

    const studentExists = await Student.findByPk(req.params.id);

    if (!studentExists) {
      return res.status(401).json({ error: 'student not found' });
    }

    const help_order = await HelpOrder.create({
      question: req.body.question,
      student_id: req.params.id,
    });
    return res.json(help_order);
  }

  async answer(req, res) {
    const schema = Yup.object().shape({
      answer: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'answer not provided' });
    }

    const question = await HelpOrder.findByPk(req.params.id);

    if (!question) {
      return res.status(401).json({ error: 'question does not existss' });
    }

    const order = await question.update({
      answer: req.body.answer,
      answer_at: new Date(),
    });

    return res.json(order);
  }
}

export default new HelpOrderController();
