import { ProductDTO } from './procuct-dto';
import { SupplierDTO } from './suppliet-dto';
import { ProductItemDTO } from './product-item-dto';

export interface OrderDTO {
    id: number,
    createdDate: Date,
    amount: number,
    price: number,
    product: ProductItemDTO[],
    verified: boolean,
    supplier: SupplierDTO
}