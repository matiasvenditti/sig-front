import { DriverDTO } from './driver-dto';

export interface TruckDTO {
    id: number,
    brand: string,
    enrollment: string,
    model: string,
    driver: DriverDTO
}