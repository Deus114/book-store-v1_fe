import Sidebar from "./Sidebar";
import './Admin.scss'
import { FaBars } from 'react-icons/fa';
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { doLogout } from "../../redux/action/userAction";
import { IoIosLogOut } from "react-icons/io";

const Admin = (props) => {
    const [collapsed, setCollapsed] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(doLogout());
        navigate('/login');
    }

    return (
        <div className="admin-container">
            <div className="admin-sidebar">
                <Sidebar collapsed={collapsed} />
            </div>
            <div className="admin-content">
                <div className="admin-header">
                    <FaBars className="side-toggle" onClick={() => setCollapsed(!collapsed)} />
                    <button className='btn-logout'
                        onClick={() => handleLogout()}
                    ><IoIosLogOut /> Log out</button>
                </div>
                <div className="admin-main">
                    <Outlet />
                </div>
            </div>
        </div>
    )
};

export default Admin;