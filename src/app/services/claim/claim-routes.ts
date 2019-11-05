import { environment } from "src/environments/environment.prod";
const apiUrl = `${environment.apiUrl}/claims`;

export const ClaimApi = {
    get: {
        findAll: () => `${apiUrl}`,
        findOne: (id: number) => `${apiUrl}/${id}`
    },
    post: {
        create: () => `${apiUrl}`
    },
    delete: {
        delete: (id: number) => `${apiUrl}/${id}`
    }
}