import { ProductDTO } from './procuct-dto';

export interface ProductItemDTO{

    id: number,
    product: ProductDTO,
    quantity: number,
    state: string

}