import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderServices from '@modules/appointments/services/ListProviderService';

export default class ProvidersController {
  public async index(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;

    const listProviders = container.resolve(ListProviderServices);

    const providers = await listProviders.execute({
      user_id
    });

    return res.json(providers);
  }
}
