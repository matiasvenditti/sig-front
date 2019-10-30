import { ProductDTO } from './procuct-dto';

export interface OrderDTO {
    id: number,
    createdDate: Date,
    amount: number,
    price: number,
    product: ProductDTO
}