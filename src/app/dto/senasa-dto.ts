import { ProductDTO } from './procuct-dto';

export interface SenasaDTO{
    denomination: string,
    businessName: string,
    country: string,
    certification: boolean,
    expirationDate: Date
    product: ProductDTO
}