import { ProductDTO } from './procuct-dto';
import { SupplierDTO } from './suppliet-dto';
import { ProductItemDTO } from './product-item-dto';

export interface OrderDTO {
    id: number,
    createdDate: Date,
    price: number,
    items: ProductItemDTO[],
    supplier: SupplierDTO,
    state: string
}