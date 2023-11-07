const API_URL = process.env.API_URL || 'http://localhost:3000/api';

export const getToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload.exp < Date.now() / 1000) {
            localStorage.setItem('token', null);
            return null;
        }
    }
    return token;
}

export const sendRequest = async (url, method = "GET", payload = null) => {
    const options = { method };
    if (payload) {
        options.headers = { "Content-Type": "application/json" };
        options.body = JSON.stringify(payload);
    }

    const token = getToken();
    if (token) {
        options.headers = options.headers || {};
        options.headers.authorization = `Bearer ${token}`;
    }

    try {
        const response = await fetch(url, options);
        if (response.ok) {
            return response.json();
        } else {
            return response;
        }
    } catch (error) {
        return error;
    }

}

export default {
    register(user) {
        return sendRequest(`${API_URL}/users`, "POST", user);
    },
    login(credentials) {
        return sendRequest(`${API_URL}/users/login`, "POST", credentials);
    },
    listTasks() {
        return sendRequest(`${API_URL}/tasks`);
    },
    createTask(task) {
        return sendRequest(`${API_URL}/tasks`, "POST", task);
    },
    updateTask(id, task) {
        return sendRequest(`${API_URL}/tasks/${id}`, "PUT", task);
    },
    deleteTask(id) {
        return sendRequest(`${API_URL}/tasks/${id}`, "DELETE");
    }
}