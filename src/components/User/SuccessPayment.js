import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoCheckmarkCircle } from "react-icons/io5";
import { useEffect } from "react";
import { doResetOrder } from "../../redux/action/orderAction";
import { deleteAllCart, postOrder } from "../../services/apiService";

const Success = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const order = useSelector(state => state.order.order)
    const account = useSelector(state => state.user.account)

    useEffect(() => {
        handleSuccess();
    }, [])

    const handleSuccess = async () => {
        let status = "Đã thanh toán";
        let payment = "Thanh toán online bằng QR";
        let userId = account.id;
        // call API
        const queryParams = new URLSearchParams(window.location.search);
        const paramValue = queryParams.get('status');
        if (paramValue === "PAID") {
            let res = await postOrder(order.content, order.totalQuantity, order.totalPrice, order.name, order.email,
                order.phone, order.address, payment, status, userId);
            if (res && res.EC === 0) {
                await deleteAllCart(account.id);
            }
            dispatch(doResetOrder());
        }
    };

    return (
        <>
            <div>
                <span className='back'
                    onClick={() => navigate('/')}>&#60;&#60; Trở lại trang chủ</span>
            </div> <br></br>
            <div>
                <span className='success'><IoCheckmarkCircle /> Thanh toán thành công !</span>
            </div>
        </>
    )
}

export default Success;