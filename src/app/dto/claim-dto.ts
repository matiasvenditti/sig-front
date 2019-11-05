import {OrderDTO} from './order-dto';

export interface ClaimDTO {

    id: number,
    title: string,
    message: string,
    type: string,
    order: OrderDTO

}