import axios from 'axios';
class Service {
    constructor(url) {
        this.url = url;
        this.search = 'thing.search';
        this.findOwner = 'find.create';
    }

    getFoundListFromService = (document) => {
        return axios.post(`${this.url}${this.search}?title=${document.title}&category_id=${document.category_id}&description=${document.description}${document.owner && '&owner='+encodeURI(document.owner)}&extra[number]=${document.extra_number}&extra[organization]=${document.extra_organization}&extra[data]=${document.extra_data}&extra[validity]=${document.extra_validity}`);

    };

    findOwnerDocument = (id) => {
        return axios.post(`${this.url}${this.findOwner}?thing_id=${id}`);
    }

}

export default new Service(`http://api.wanted.im/v1/`);