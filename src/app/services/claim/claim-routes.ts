import { environment } from "src/environments/environment.prod";
const apiUrl = `${environment.apiUrl}/claims`;

export const ClaimApi = {
    get: {
        findAll: () => `${apiUrl}`,
        findOne: (id: number) => `${apiUrl}/${id}`
    },
    post: {
        create: () => `${apiUrl}`,
        resolve: () => `${apiUrl}/resolve`
    },
    delete: {
        delete: (id: number) => `${apiUrl}/${id}`
    }
}
