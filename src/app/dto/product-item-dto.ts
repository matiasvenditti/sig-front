import { ProductDTO } from './procuct-dto';
import {StandDTO} from './stand-dto';

export interface ProductItemDTO{

    id: number,
    product: ProductDTO,
    quantity: number,
    state: string,
    stand: StandDTO

}
