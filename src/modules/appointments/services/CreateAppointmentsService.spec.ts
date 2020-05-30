import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/fakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentSevice';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

  });

  it('should be able to crate a new appointment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(),
      user_id: '123456',
      provider_id: '123123',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123123');
  });

  it('shoukd not be to crate two appointments on the same time', async () => {
     const appointmentDate = new Date();

    await createAppointment.execute({
      date: appointmentDate,
      user_id: '123456',
      provider_id: '123123',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        user_id: '123456',
        provider_id: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
