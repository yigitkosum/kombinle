import axios from 'axios';

const REST_API_BASE_URL = 'http://192.168.1.36:8080/api/users';

export const createUser = (user) => axios.post(REST_API_BASE_URL, user);