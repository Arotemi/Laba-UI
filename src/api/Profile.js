import { handleRequest } from '../utils/request';
import Base              from './Base';

class Profile extends Base {
    show = async () => {
        const data = await handleRequest(this.apiClient.get('profile'));

        return data;
    };

    listUsers = async () => {
        const data = await handleRequest(this.apiClient.get('customers'));

        return data;
    };

    listOnlineUsers = async () => {
        const data = await handleRequest(this.apiClient.get('customers/online'));

        return data;
    };
}

export default Profile;
