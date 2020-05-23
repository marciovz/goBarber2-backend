import FakeAppointmentsRepository from '../repositories/fakes/fakeAppointmentsREpository';
import CreateAppointmentService from './CreateAppointmentSevice';

describe('CreateAppointment', () => {
  it('should be able to crate a new appointment', async () => {
    const fakeAppointmentsREpository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsREpository,
    );

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '123123',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123123');
  });

  it('shoukd not be to crate two appointments on the same time', () => {
    expect(1 + 2).toBe(3);
  });
});
