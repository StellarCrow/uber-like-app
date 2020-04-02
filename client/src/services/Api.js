import axios from "axios";
import serverUrl from '../utils/constants';

export default () => {
    return axios.create({
        baseURL: serverUrl
    });
};
