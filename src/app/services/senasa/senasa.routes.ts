import { environment } from 'src/environments/environment.prod'
const apiUrl = `${environment.apiUrl}/senasa`;

export const SenasaApi = {
    get: {
        findAll: () => `${apiUrl}`,
        findOne: (id: number) => `${apiUrl}/${id}`
    },
    post: {
        create: () => `${apiUrl}`
    },
    put: {

    }
}