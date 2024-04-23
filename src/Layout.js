import App from './App';
import Admin from './components/Admin/Admin';
import User from './components/User/User';
import Homepage from './components/Home/homepage';
import ManageUser from './components/Admin/Content/ManageUser/ManageUser';
import ManageCategory from './components/Admin/Content/ManageCategory/Managecategory';
import Dashboard from './components/Admin/Content/Dashboard';
import Login from './components/Auth/Login';
import {
    Route,
    Routes
} from "react-router-dom";

import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Register from './components/Auth/Register';
import PrivateRoute from './routes/PrivateRoutes';
import ManageProduct from './components/Admin/Content/ManageProduct/ManageProduct';
import ShowProduct from './components/Home/showProduct';
import ProductDetail from './components/Home/productDetail';
import PrivateRouteUser from './routes/PrivateRoutesUser';
import Cart from './components/Cart/Cart';
import Order from './components/User/Order';
import Cancel from './components/User/CancelPayment';
import Success from './components/User/SuccessPayment';
import History from './components/User/History';

const Layout = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<App />} >
                    <Route index element={<Homepage />}></Route>
                    <Route path="show-product" element={<ShowProduct />} />
                    <Route path="product-detail" element={<ProductDetail />} />
                    <Route path="user" element={
                        <PrivateRouteUser>
                            <User />
                        </PrivateRouteUser>
                    } />
                    <Route path="cart" element={
                        <PrivateRouteUser>
                            <Cart />
                        </PrivateRouteUser>
                    } />
                    <Route path="order" element={
                        <PrivateRouteUser>
                            <Order />
                        </PrivateRouteUser>
                    } />
                    <Route path="cancel" element={
                        <PrivateRouteUser>
                            <Cancel />
                        </PrivateRouteUser>
                    } />
                    <Route path="success" element={
                        <PrivateRouteUser>
                            <Success />
                        </PrivateRouteUser>
                    } />
                    <Route path="history" element={
                        <PrivateRouteUser>
                            <History />
                        </PrivateRouteUser>
                    } />
                </Route>


                <Route path="/admin" element={
                    <PrivateRoute>
                        <Admin />
                    </PrivateRoute>
                }>
                    <Route index element={<Dashboard />}></Route>
                    <Route path="manage-user" element={<ManageUser />} />
                    <Route path="manage-category" element={<ManageCategory />} />
                    <Route path="manage-product" element={<ManageProduct />} />
                </Route>

                <Route path="/login" element={<Login />}></Route>
                <Route path="/register" element={<Register />}></Route>

            </Routes>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    )
}

export default Layout;