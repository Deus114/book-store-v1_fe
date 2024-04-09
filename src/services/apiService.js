import axios from '../utils/axiosCuztomize';

const postCreateNewUser = (email, password, username, phone, address, role, image) => {
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('username', username);
    data.append('phone', phone);
    data.append('address', address);
    data.append('role', role);
    data.append('image', image);
    return axios.post('api/user', data);
}

const getAllUsers = () => {
    return axios.get('api/users');
}

const putUpdateUser = (id, username, phone, address, role, image) => {
    const data = new FormData();
    data.append('id', id);
    data.append('username', username);
    data.append('phone', phone);
    data.append('address', address);
    data.append('role', role);
    data.append('image', image);
    return axios.put('api/update-user', data);
}

const delelteUser = (userId) => {
    return axios.delete('api/delete-user', { data: { id: userId } });
}

const getUsersPaginate = (page, limit) => {
    return axios.get(`api/users?page=${page}&limit=${limit}`);
}

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

const delelteProduct = (id) => {
    return axios.delete('api/delete-product', { data: { id: id } });
}


export {
    postCreateNewUser, getAllUsers,
    putUpdateUser, delelteUser,
    getUsersPaginate, postLogin,
    postRegister, postCreateNewCategory,
    getAllCategories, putUpdateCategory,
    delelteCategory, getallCategories,
    postCreateNewProduct, getProductsPaginate,
    putUpdateProduct, delelteProduct
};