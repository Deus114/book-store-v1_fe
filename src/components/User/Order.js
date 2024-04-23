import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { deleteAllCart, getuserCart, postOrder, postQrPayment } from '../../services/apiService';
import { doOrder } from '../../redux/action/orderAction';

const Order = () => {
    const [listCart, setlistCart] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let totalPrice = 0;
    let totalQuantity = 0;
    let content = "";
    const account = useSelector(state => state.user.account)
    const [name, setName] = useState("");
    const [email, setEmail] = useState(account.email);
    const [phone, setPhone] = useState(account.phone);
    const [address, setAddress] = useState(account.address);
    const [payment, setPayment] = useState("");

    useEffect(() => {
        getlist();
    }, [])

    const getlist = async () => {
        let res = await getuserCart(account?.id)
        if (res.EC === 0) {
            setlistCart(res.DT);
        }
    }

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleOrder = async () => {
        let isValidEmail = validateEmail(email);
        if (!isValidEmail) {
            toast.error('Invalid Email');
            return;
        }
        if (name === "" || phone === "" || address === "" || payment === "") {
            toast.error('Please fill all informations');
            return;
        }

        if (payment === "Thanh toán khi nhận hàng") {
            let status = "Chưa thanh toán";
            let userId = account.id;
            // call API
            let res = await postOrder(content, totalQuantity, totalPrice, name, email, phone, address, payment, status, userId);
            if (res && res.EC === 0) {
                await deleteAllCart(account.id);
                toast.success(res.EM);
                navigate('/cart');
            }
            if (res && res.EC !== 0) {
                toast.error(res.EM);
            }
        }
        else if (payment === "Thanh toán online bằng QR") {
            let res = await postQrPayment();
            let data = {
                content, totalQuantity, totalPrice, name, email, phone, address
            };
            dispatch(doOrder(data));
            window.location.href = res.DT;
        }
    }

    return (
        <>
            <div>
                <span className='back'
                    onClick={() => navigate('/cart')}>&#60;&#60; Giỏ hàng</span>
            </div> <br></br>
            <div className="row">
                <div className="col">
                    <h2>Đơn hàng của bạn</h2>
                    <hr />
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">STT</th>
                                <th scope="col">Tên sản phẩm</th>
                                <th scope="col">Hình ảnh</th>
                                <th scope="col">Giá</th>
                                <th scope="col">Số lượng</th>
                                <th scope="col">Thành tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listCart.map((item, index) => {
                                let src = `data:image/jpeg;base64,${item.image}`;
                                totalPrice += ((+item.price) * (+item.quantity));
                                totalQuantity += (+item.quantity);
                                content += index === 0 ?
                                    (item.productName + " * " + item.quantity)
                                    :
                                    ("; " + item.productName + " * " + item.quantity);
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.productName}</td>
                                        <td><img src={src} alt={item.productName} width="60" /></td>
                                        <td>{(+item.price).toLocaleString()} đ</td>
                                        <td>{item.quantity}</td>
                                        <td>{((+item.price) * (+item.quantity)).toLocaleString()} đ</td>
                                    </tr>
                                )
                            })}
                            <tr>
                                <th colSpan="4"></th>
                                <th >Tổng số lượng:</th>
                                <th colSpan="2">{totalQuantity} (sản phẩm)</th>
                            </tr>
                            <tr>
                                <th colSpan="4"></th>
                                <th >Tổng tiền:</th>
                                <th colSpan="2">{totalPrice.toLocaleString()} đ</th>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="col">
                    <h2>Thông tin mua hàng</h2>
                    <hr />
                    <div className="mb-3">
                        <label className="form-label">Họ và tên</label>
                        <input type="text" className="form-control" name="name"
                            onChange={(event) => { setName(event.target.value) }}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" name="email" aria-describedby="emailHelp" value={email}
                            onChange={(event) => { setEmail(event.target.value) }}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Số điện thoại</label>
                        <input type="text" className="form-control" name="phone" value={phone}
                            onChange={(event) => { setPhone(event.target.value) }}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Địa chỉ</label>
                        <input type="text" className="form-control" name="address" value={address}
                            onChange={(event) => { setAddress(event.target.value) }}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Phương thức thanh toán: <select name="payment"
                            defaultValue="0"
                            onChange={(event) => { setPayment(event.target.value) }}
                        >
                            <option value="0" hidden>Chọn phương thức thanh toán</option>
                            <option value="Thanh toán khi nhận hàng">Thanh toán khi nhận hàng</option>
                            <option value="Thanh toán online bằng QR">Thanh toán online bằng QR</option>
                        </select>
                        </label>
                    </div>
                    <button className="btn btn-success"
                        onClick={() => handleOrder()}
                    >Đặt hàng</button>
                </div>
            </div>
        </>
    )
};

export default Order;