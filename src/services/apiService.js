import axios from '../utils/axiosCuztomize';

// User Api
const postCreateNewUser = (email, password, username, phone, address, role) => {
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('username', username);
    data.append('phone', phone);
    data.append('address', address);
    data.append('role', role);
    return axios.post('api/user', data);
}

const getAllUsers = () => {
    return axios.get('api/users');
}

const putUpdateUser = (id, username, phone, address, role) => {
    const data = new FormData();
    data.append('id', id);
    data.append('username', username);
    data.append('phone', phone);
    data.append('address', address);
    data.append('role', role);
    return axios.put('api/update-user', data);
}

const delelteUser = (userId) => {
    return axios.delete('api/delete-user', { data: { id: userId } });
}

const getUsersPaginate = (page, limit) => {
    return axios.get(`api/users?page=${page}&limit=${limit}`);
}

// Auth api
const postLogin = (email, password) => {
    return axios.post(`api/login`,
        { email, password } // = {email:email, password: password}
    );
}

const postRegister = (email, password, username) => {
    return axios.post(`api/register`,
        { email, password, username }
    );
}

// Category api
const postCreateNewCategory = (name, status) => {
    const data = new FormData();
    data.append('name', name);
    data.append('status', status);
    return axios.post('api/category', data);
}

const getAllCategories = (page, limit) => {
    return axios.get(`api/categories?page=${page}&limit=${limit}`);
}

const getallCategories = () => {
    return axios.get(`api/categories`);
}

const putUpdateCategory = (id, name, status) => {
    const data = new FormData();
    data.append('id', id);
    data.append('name', name);
    data.append('status', status);
    return axios.put('api/update-category', data);
}

const delelteCategory = (categoryId) => {
    return axios.delete('api/delete-category', { data: { id: categoryId } });
}

// Product Api
const postCreateNewProduct = (name, price, desc, author, nxb, status, category, image) => {
    const data = new FormData();
    data.append('name', name);
    data.append('price', price);
    data.append('desc', desc);
    data.append('author', author);
    data.append('nxb', nxb);
    data.append('status', status);
    data.append('category', category);
    data.append('image', image);
    return axios.post('api/product', data);
}

const putUpdateProduct = (id, name, price, desc, author, nxb, status, category, image) => {
    const data = new FormData();
    data.append('id', id);
    data.append('name', name);
    data.append('price', price);
    data.append('desc', desc);
    data.append('author', author);
    data.append('nxb', nxb);
    data.append('status', status);
    data.append('category', category);
    data.append('image', image);
    return axios.put('api/update-product', data);
}

const getProductsPaginate = (page, limit) => {
    return axios.get(`api/products?page=${page}&limit=${limit}`);
}

const getProductsNew = () => {
    return axios.get(`api/products-new`);
}

const getProductsBuy = () => {
    return axios.get(`api/products-buy`);
}

const delelteProduct = (id) => {
    return axios.delete('api/delete-product', { data: { id: id } });
}

const getProductsByCat = (category, index) => {
    return axios.get(`api/products-by-category`, {
        params: {
            category: category,
            index: index,
        }
    });
}

// Cart Api
const postCart = (productName, image, userId, quantity, price) => {
    const data = new FormData();
    data.append('productName', productName);
    data.append('image', image);
    data.append('userId', userId);
    data.append('quantity', quantity);
    data.append('price', price);
    return axios.post('api/cart', data);
}

const plusProduct = (productName, userId, quantity) => {
    const data = new FormData();
    data.append('productName', productName);
    data.append('image', "");
    data.append('userId', userId);
    data.append('quantity', quantity);
    data.append('price', "");
    return axios.post('api/cart', data);
}

const getuserCart = (id) => {
    return axios.get('api/user-cart', {
        params: {
            id: id,
        }
    });
}

const deleteCart = (id) => {
    return axios.delete('api/delete-cart', {
        params: {
            id: id,
        }
    });
}

// Admin Board Api
const getAdminBoard = () => {
    return axios.get(`api/admin-board`);
}

export {
    postCreateNewUser, getAllUsers,
    putUpdateUser, delelteUser,
    getUsersPaginate, postLogin,
    postRegister, postCreateNewCategory,
    getAllCategories, putUpdateCategory,
    delelteCategory, getallCategories,
    postCreateNewProduct, getProductsPaginate,
    putUpdateProduct, delelteProduct,
    getProductsNew, getProductsBuy,
    getProductsByCat, postCart,
    getuserCart, plusProduct,
    deleteCart, getAdminBoard
};