import { environment } from 'src/environments/environment.prod'
const apiUrl = `${environment.apiUrl}/items`;

export const OrderItemApi = {
    get: {
        findAll: () => `${apiUrl}`,
        findValid: () => `${apiUrl}/valid`,
        findQuality: () => `${apiUrl}/quality`,
        findStock: () => `${apiUrl}/stock`,
        findNonConformity: () => `${apiUrl}/non-conformity`
    },
    post: {
        create: () => `${apiUrl}`,
        distribute: () => `${apiUrl}/rack`
    },
    put: {
        update: (id: number) => `${apiUrl}/${id}`
    },
    delete: {
        delete: (id: number) => `${apiUrl}/${id}`
    }
}
