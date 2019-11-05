import { ProductDTO } from './procuct-dto';

export interface SenasaDTO{
    id: number,
    reviewRequired: boolean,
    businessName: string,
    country: string,
    certification: boolean,
    createdDate: Date
    product: ProductDTO
}