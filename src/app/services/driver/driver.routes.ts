import { environment } from "src/environments/environment";

const apiUrl = `${environment}/drivers`;

export const driverApi = {
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