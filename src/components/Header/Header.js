import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { doLogout } from '../../redux/action/userAction';
import logo from '../../assets/logo-bookstore.png'
import { IoPersonOutline } from "react-icons/io5";
import { AiOutlineHome } from "react-icons/ai";
import { IoCart } from "react-icons/io5";
import { useEffect, useState } from 'react';
import { getuserCart } from '../../services/apiService';

const Header = () => {
    const navigate = useNavigate();
    const account = useSelector(state => state.user.account)
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const [cart, setCart] = useState(0);

    useEffect(() => {
        getCart();
    }, [window.location.href])

    const getCart = async () => {
        let res = await getuserCart(account?.id)
        if (res.EC === 0) {
            setCart(res.DT.length);
        }
    }

    const handleLogin = () => {
        navigate('/login');
    }

    const handleRegister = () => {
        navigate('/register');
    }

    const handleLogout = () => {
        dispatch(doLogout());
        navigate('/login');
    }

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <img className="nav-content logo" src={logo} alt="Book Store" width="6%" />
                <NavLink to="/" className='navbar-brand'>Book Store</NavLink>
                <form className="d-flex search">
                    <input className="form-control search" type="search" placeholder="Tìm kiếm" aria-label="Search" />
                </form>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mx-auto">
                        <NavLink to="/" className='nav-link home'><AiOutlineHome /> <span>Trang chủ</span> </NavLink>
                        <Nav className='nav-link'><a href='#footer'>Liên hệ</a></Nav>
                        <Nav className='nav-link'><a href='#footer'>Phương thức thanh toán</a></Nav>
                    </Nav>
                    <Nav>
                        {isAuthenticated === false ?
                            <>
                                <button className='btn-login' onClick={() => handleLogin()}>Log in</button>
                                <button className='btn-signup' onClick={() => handleRegister()}>Sign up</button>
                            </>
                            :
                            <>
                                <NavLink to="/cart" className='nav-link cart'><IoCart style={{ fontSize: '1.5rem' }}
                                /> Giỏ hàng
                                    {cart === 0 ? <></> : <span className="cart-nofi"><span>{cart}</span></span>}
                                </NavLink>
                                <NavLink to="/user" className='nav-link'><IoPersonOutline /> {
                                    account.user ? account.user : account.email
                                }
                                </NavLink>
                                <button className='btn-login logout' onClick={() => handleLogout()}>Log out</button>
                            </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;