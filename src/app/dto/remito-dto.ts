import { SupplierDTO } from './suppliet-dto';
import { ProductItemDTO } from './product-item-dto';

export interface RemitoDTO {
    createdDate: Date,
    items: ProductItemDTO[],
    supplier: SupplierDTO
}