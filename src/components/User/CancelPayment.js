import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoCheckmarkCircle } from "react-icons/io5";
import { useEffect } from "react";
import { doResetOrder } from "../../redux/action/orderAction";

const Cancel = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(doResetOrder());
    }, [])

    return (
        <>
            <div>
                <span className='back'
                    onClick={() => navigate('/order')}>&#60;&#60; Trở lại đơn hàng</span>
            </div> <br></br>
            <div>
                <span className='success'><IoCheckmarkCircle /> Hủy giao dịch thành công !</span>
            </div>
        </>
    )
}

export default Cancel;