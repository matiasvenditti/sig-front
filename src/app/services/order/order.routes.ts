import { environment } from 'src/environments/environment.prod'
const apiUrl = `${environment.apiUrl}/orders`;

export const OrderApi = {
    get: {
        findAll: () => `${apiUrl}`,
        findOne: (id: number) => `${apiUrl}/${id}`,
        findAllPlant: () => `${apiUrl}/plant`
    },
    post: {
        create: () => `${apiUrl}`,
        validateDocumentation: (id: number) => `${apiUrl}/${id}/validate`
    },
    put: {
        update: (id: number) => `${apiUrl}/${id}`
    },
    delete: {
        delete: (id: number) => `${apiUrl}/${id}`
    }
}