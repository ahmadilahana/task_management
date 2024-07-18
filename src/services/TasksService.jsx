import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/tasks";


const getList = (token, sortBy, sortDir, searchStatus, searchTitle) => {
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };
    return axios.get(API_URL + `?sortBy=${sortBy}&dir=${sortDir}&status=${searchStatus}&title=${searchTitle}`,{
        headers: headers
      }).then(response => {
        return response.data;
    });
};

const getDetail = (token, id) => {
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };
    return axios.get(API_URL + "/" + id,{
        headers: headers
      }).then(response => {
        return response.data;
    });
};

const createTasks = (token, data) => {
    console.log(data)
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };
    return axios.post(API_URL, data, {
        headers: headers
      }).then(response => {
        return response.data;
    });
};



const deleteTasks = (token, id) => {
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };
    return axios.delete(API_URL + "/" + id,{
        headers: headers
      }).then(response => {
        return response.data;
    });
};

const updateTasks = (token, id, data) => {
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };
    return axios.put(API_URL + "/" + id, data, {
        headers: headers
      }).then(response => {
        return response.data;
    });
};

export default {
    getList,
    getDetail,
    createTasks,
    deleteTasks,
    updateTasks
}