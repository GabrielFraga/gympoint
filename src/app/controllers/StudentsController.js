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
}
export default new StudentController();
