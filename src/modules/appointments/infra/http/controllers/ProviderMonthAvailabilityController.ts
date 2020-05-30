import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderMonthAvailabilityServices from '@modules/appointments/services/ListProviderMonthAvailabilityService';

export default class ProviderMontAvailabilityController {
  public async index(req: Request, res: Response): Promise<Response> {
    const provider_id = req.params.provider_id;
    const { month, year } = req.body;

    const listProviderMonthAvailability = container.resolve(ListProviderMonthAvailabilityServices);

    const availability = await listProviderMonthAvailability.execute({
      provider_id,
      month,
      year,
    });

    return res.json(availability);
  }
}
