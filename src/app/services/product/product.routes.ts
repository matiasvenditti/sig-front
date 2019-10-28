import { environment } from 'src/environments/environment.prod'
const apiUrl = `${environment.apiUrl}/products`;

export const ProductApi = {
    get: {
        findAll: () => `${apiUrl}`,
        findOne: (id: number) => `${apiUrl}/${id}`
    },
    post: {
        create: () => `${apiUrl}`
    },
    put: {

    },
    delete: {
        delete: (id: number) => `${apiUrl}/${id}`
    }
}