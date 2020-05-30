import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderDayAvailabilityServices from '@modules/appointments/services/ListProviderDayAvailabilityService';

export default class ProviderDayAvailabilityController {
  public async index(req: Request, res: Response): Promise<Response> {
    const provider_id = req.params.provider_id;
    const { day, month, year } = req.body;

    const listProviderDayAvailability = container.resolve(ListProviderDayAvailabilityServices);

    const availability = await listProviderDayAvailability.execute({
      provider_id,
      day,
      month,
      year,
    });

    return res.json(availability);
  }
}
