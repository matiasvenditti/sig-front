import { environment } from 'src/environments/environment.prod'
const apiUrl = `${environment.apiUrl}/inal`;

export const InalApi = {
    get: {
        findAll: () => `${apiUrl}`,
        findOne: (id: number) => `${apiUrl}/${id}`
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