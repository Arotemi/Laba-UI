import { convertToQueryParam } from '../utils/helpers';
import { handleRequest } from '../utils/request';
import Base              from './Base';

class Contacts extends Base {
    list = async (params) => {
        const response = await handleRequest(this.apiClient.get(`users?${convertToQueryParam(params)}`));

        return response;
    };

    listShared = async (params) => {
        const response = await handleRequest(this.apiClient.get(`users/shared?${convertToQueryParam(params)}`));

        return response;
    };

    share = async (id, data) => {
        return handleRequest(this.apiClient.post(`users/${id}/share`, data));
    };

    update = async (id, data) => {
        const response = await handleRequest(this.apiClient.patch(`users/${id}`, data));

        return response;
    };

    delete = async (id) => {
        const response = await handleRequest(this.apiClient.delete(`users/${id}`));

        return response;
    };

    create = async (data) => {
        return handleRequest(this.apiClient.post('users', data));
    };
}

export default Contacts;
