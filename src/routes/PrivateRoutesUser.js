import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRouteUser = (props) => {
    const isAuth = useSelector(state => state.user.isAuthenticated);

    if (!isAuth) {
        return <Navigate to="/login"></Navigate>
    }
    return (
        <>
            {props.children}
        </>
    )
}

export default PrivateRouteUser;