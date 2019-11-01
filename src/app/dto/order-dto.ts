import { ProductDTO } from './procuct-dto';
import { SupplierDTO } from './suppliet-dto';

export interface OrderDTO {
    id: number,
    createdDate: Date,
    amount: number,
    price: number,
    product: ProductDTO,
    verified: boolean,
    supplier: SupplierDTO
}