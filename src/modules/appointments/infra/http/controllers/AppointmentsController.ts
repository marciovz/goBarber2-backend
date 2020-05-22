import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAppointmentSevice from '@modules/appointments/services/CreateAppointmentSevice';

export default class AppointmentsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { provider_id, date } = req.body;

    const parsedDate = parseISO(date);

    const createAppointment = container.resolve(CreateAppointmentSevice);

    const appointment = await createAppointment.execute({
      provider_id,
      date: parsedDate,
    });

    return res.json(appointment);
  }
}
