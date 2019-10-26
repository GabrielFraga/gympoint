import * as Yup from 'yup';
import Student from '../models/Student';

class StudentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      age: Yup.number().required(),
      weight: Yup.number().required(),
      height: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      res.status(400).json({ error: 'validation fails' });
    }

    const studentExists = await Student.findOne({
      where: { email: req.body.email },
    });

    if (studentExists) {
      res.status(400).json({ error: 'student already exists' });
    }

    const { id, name, email, weight, height } = await Student.create(req.body);

    res.json({
      id,
      name,
      email,
      weight,
      height,
    });
  }

  async getAll(req, res) {
    const students = await Student.findAll();
    res.json({ students });
  }

  async getOne(req, res) {
    const student = await Student.findByPk(req.params.id);
    res.json({ student });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string(),
      age: Yup.number(),
      weight: Yup.number(),
      height: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      res.status(400).json({ error: 'validation fails' });
    }

    const student = await Student.findByPk(req.params.id);

    if (!student) {
      res.status(401).json({ error: 'user does not exists' });
    }

    if (req.body.email && req.body.email !== student.email) {
      const emailInUse = await Student.findOne({
        where: { email: req.body.email },
      });

      if (emailInUse) {
        res.status(400).json({ error: 'email already in use by another user' });
      }
    }
    const { id, email, age, height, weight } = await student.update(req.body);

    res.json({
      id,
      email,
      age,
      height,
      weight,
    });
  }
}
export default new StudentController();
