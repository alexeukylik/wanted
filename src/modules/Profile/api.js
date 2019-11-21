import axios from 'axios';

class Service {
    constructor(url) {
        this.url = url;
        this.create = 'create';
        this.getById = 'getById';
        this.getList = 'getList';
        this.update = 'update';
        this.delete = 'delete';
        this.restore = 'restore';
    }

    getListDocument = () => {
        return axios.get(`${this.url}${this.getList}`);
    };

    getCurrentDocument = (id) => {
        return axios.get(`${this.url}${this.getById}`);
    };

    createDocumentService = (document) => {
        return axios.post(`${this.url}${this.create}?extra[title]=${document.title}&category_id=${document.category_id}&description=${document.description}&id=${document.id}&owner=${document.owner ? document.owner : 'null'}&extra[number]=${document.extra_number !== 'null' ? document.extra_number : ''}&extra[organization]=${document.extra_organization !== 'null' ? document.extra_organization : ''}&extra[data]=${document.extra_data !== 'null' ? document.extra_data : ''}&extra[validity]=${document.extra_validity !== 'null' ? document.extra_validity : ''}`);
    };

    updateDocumentService = (document) => {
        return axios.put(`${this.url}${this.update}?extra[title]=${document.title}&category_id=${document.category_id}&description=${document.description}&id=${document.id}&owner=${document.owner ? document.owner : 'null'}&extra[number]=${document.extra_number !== 'null' ? document.extra_number : ''}&extra[organization]=${document.extra_organization !== 'null' ? document.extra_organization : ''}&extra[data]=${document.extra_data !== 'null' ? document.extra_data : ''}&extra[validity]=${document.extra_validity !== 'null' ? document.extra_validity : ''}`);
    };

    deleteDocumentService = (id) => {
        return axios.delete(`${this.url}${this.delete}?id=${id}`);
    };

    restoreDocumentService = (id) => {
        return axios.put(`${this.url}${this.restore}?id=${id}`);
    };
}

export default new Service('http://api.wanted.im/v1/thing.');