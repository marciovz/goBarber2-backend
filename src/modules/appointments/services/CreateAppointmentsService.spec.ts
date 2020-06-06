import AppError from '@shared/errors/AppError';

import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import FakeAppointmentsRepository from '../repositories/fakes/fakeAppointmentsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import CreateAppointmentService from './CreateAppointmentSevice';

let fakeNotificationsRepository: FakeNotificationsRepository;
let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeCacheProvider: FakeCacheProvider;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();
    fakeCacheProvider = new FakeCacheProvider();

    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository,
      fakeCacheProvider,
    );

  });

  it('should be able to crate a new appointment', async () => {
    const appointment = await createAppointment.execute({

      date: new Date(2020, 5, 10, 13),
      user_id: 'user1',
      provider_id: 'user2',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('user2');
  });

  it('should not be to create two appointments on the same time', async () => {

    const appointmentDate = new Date(2020, 5, 10, 13);

    await createAppointment.execute({
      date: appointmentDate,
      user_id: 'user1',
      provider_id: 'user2',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        user_id: 'user1',
        provider_id: 'user2',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointments on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 5, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 5, 10, 11),
        user_id: '123456',
        provider_id: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 5, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 5, 10, 14),
        user_id: 'mesmo-user',
        provider_id: 'mesmo-user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment before 8am and after 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 5, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 5, 11, 7),
        user_id: 'user1',
        provider_id: 'user2',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute({
        date: new Date(2020, 5, 11, 18),
        user_id: 'user1',
        provider_id: 'user2',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
