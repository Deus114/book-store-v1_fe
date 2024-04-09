import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = (props) => {
    const isAuth = useSelector(state => state.user.isAuthenticated);
    const account = useSelector(state => state.user.account);

    if (!isAuth || account.role !== "ADMIN") {
        return <Navigate to="/login"></Navigate>
    }
    return (
        <>
            {props.children}
        </>
    )
}

export default PrivateRoute;
