import { environment } from 'src/environments/environment.prod'
const apiUrl = `${environment.apiUrl}/items`;

export const OrderItemApi = {
    get: {
        findAll: () => `${apiUrl}`,
        findValid: () => `${apiUrl}/valid`
    },
    post: {
        create: () => `${apiUrl}`
    },
    put: {
        update: (id: number) => `${apiUrl}/${id}`
    },
    delete: {
        delete: (id: number) => `${apiUrl}/${id}`
    }
}