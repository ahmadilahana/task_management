import axios from "axios";

const API_URL = "http://127.0.0.1:8001/api/";

const register = (name, email, password) => {
    return axios.post(API_URL + 'register', {
        'name':name,
        'email':email,
        'password':password
    });
};


const login = (email, password) => {
    return axios.post(API_URL + 'login', {
        email,
        password
    }).then(response => {
        if (response.data.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data.data));
            localStorage.setItem('token', response.data.data.token);
        }
        return response.data;
    });
};

const logout = () => {

    const token = localStorage.getItem('token');
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };
    return axios.post(API_URL + 'logout', {}, {
        headers: headers
      }).then(response => {

        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return response.data;
    })
}; 


export default {
    register,
    login,
    logout,
};