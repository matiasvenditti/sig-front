import { environment } from 'src/environments/environment.prod'
const apiUrl = `${environment.apiUrl}/senasa`;

export const SenasaApi = {
    get: {
        findAll: () => `${apiUrl}`,
        findOne: (id: number) => `${apiUrl}/${id}`,
        findByProduct: (id: number) => `${apiUrl}/products?productId=${id}`
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