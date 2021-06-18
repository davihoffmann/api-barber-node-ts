import { startOfHour } from 'date-fns';
import { inject, injectable } from 'tsyringe';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppError from '@shared/errors/AppError';

// SOLID
// Single Responsability Principle
// Open Closed Principle
// Liskov Substitution Principle
// Interface Segregation Principle
// Dependency Invertion Principle

interface IRequest {
  date: Date;
  user_id: string;
  provider_id: string;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    date,
    user_id,
    provider_id,
  }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate =
      await this.appointmentRepository.findByDate(appointmentDate);

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is alredy booked');
    }

    const appointment = await this.appointmentRepository.create({
      provider_id,
      user_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
