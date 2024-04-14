import { useState } from 'react';
import './Login.scss';
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../../services/apiService'
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux'
import { doLogin } from '../../redux/action/userAction';
import { FaSpinner } from "react-icons/fa";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async () => {
        // Validate
        // setIsLoading(true);
        // Api
        let res = await postLogin(email, password);
        if (res && res.EC === 0) {
            dispatch(doLogin(res));
            toast.success(res.EM);
            setIsLoading(false);
            if (res.DT.role === "ADMIN")
                navigate('/admin');
            else navigate('/');
        }
        if (res && res.EC !== 0) {
            toast.error(res.EM);
            setIsLoading(false);
        }
    }

    return (
        <div className='login-container'>
            <div className='header'>
                <span>Don't have an account yet?</span>
                <button onClick={() => navigate('/register')}>Sign up</button >
            </div>
            <div className='title col-4 mx-auto'>
                Login
            </div>
            <div className='welcome col-4 mx-auto'>
                Hello, who's this
            </div>
            <div className='content-form col-4 mx-auto'>
                <div className='form-group'>
                    <label>Email</label>
                    <input type={"email"} className="form-control"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        onKeyDown={(event) => {
                            if (event && event.key === 'Enter') { handleLogin(); }
                        }}
                    />
                </div>
                <div className='form-group'>
                    <label>Password</label>
                    <input type={"password"} className="form-control"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        onKeyDown={(event) => {
                            if (event && event.key === 'Enter') { handleLogin(); }
                        }}
                    />
                </div>
                <span>Forgot password?</span>
                <div>
                    <button onClick={() => handleLogin()} disabled={isLoading}>
                        {isLoading === true && <FaSpinner className='loader-icon' />}
                        <span>Login</span></button>
                </div>
                <div>
                    <span className='back'
                        onClick={() => navigate('/')}>&#60;&#60; Back to Homepage</span>
                </div>
            </div>
        </div>
    )
}

export default Login;