import { environment } from "src/environments/environment.prod";
const apiUrl = `${environment.apiUrl}/drivers`;

export const DriverApi = {
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