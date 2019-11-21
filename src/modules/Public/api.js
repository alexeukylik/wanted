import axios from 'axios';
import formatPhone from '../../helpers/formatPhone';
class Service {
    constructor(url) {
        this.url = url;
        this.preparation = 'preparation';
        this.login = 'login';
        this.logout = 'logout';
    }

    getPhoneFromService = (numberPhone) => {
        const phone = formatPhone(numberPhone);
        return axios.post(`${this.url}${this.preparation}?phone=${phone}`);
    };

    setAuth = (data) => {
        return axios.post(`${this.url}${this.login}?phone=${data.phone}&password=${data.password}`);
    };

    logoutProfile = () => {
        return axios.post(`${this.url}${this.logout}`);
    };
}

export default new Service('http://api.wanted.im/v1/auth.');