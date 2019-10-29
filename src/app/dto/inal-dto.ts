import { ProductDTO } from './procuct-dto';

export interface InalDTO {
    id: number,
    denomination: string,
    rnpa: number,
    batch: number,
    businessName: string,
    expirationDate: Date,
    product: ProductDTO
}