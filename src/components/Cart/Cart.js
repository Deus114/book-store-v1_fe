import { useEffect, useState } from "react";
import { useSelector } from 'react-redux'
import { getuserCart, plusProduct, postCart } from "../../services/apiService";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import { toast } from 'react-toastify';

const Cart = (props) => {
    const [listCart, setlistCart] = useState([]);
    let totalPrice = 0;
    let totalQuantity = 0;
    const account = useSelector(state => state.user.account)

    useEffect(() => {
        getlist();
    }, [])

    const getlist = async () => {
        let res = await getuserCart(account?.id)
        if (res.EC === 0) {
            setlistCart(res.DT);
        }
    }

    const handlePlus = async (name) => {
        let res = await plusProduct(name, account.id, 1)
        if (res.EC === 0) {
            window.location.reload();
        }
        else {
            toast.error(res.EM);
        }
    }

    const handleMinus = async (name, quantity) => {
        if (quantity === "1") {
            const result = window.confirm(`You want to delete: ${name} ?`)
            if (result) {
                let res = await plusProduct(name, account.id, -1)
                if (res.EC === 0) {
                    window.location.reload();
                }
                else {
                    toast.error(res.EM);
                }
            } else { }
        }
        else {
            let res = await plusProduct(name, account.id, -1)
            if (res.EC === 0) {
                window.location.reload();
            }
            else {
                toast.error(res.EM);
            }
        }
    }

    return (
        <>
            <h2 className="ttle">Giỏ hàng của bạn</h2>
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
                        <th scope="col">Xóa</th>
                    </tr>
                </thead>
                <tbody>
                    {listCart.map((item, index) => {
                        let src = `data:image/jpeg;base64,${item.image}`;
                        totalPrice += ((+item.price) * (+item.quantity));
                        totalQuantity += (+item.quantity);
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.productName}</td>
                                <td><img src={src} alt={item.name} width="60" /></td>
                                <td>{(+item.price).toLocaleString()} đ</td>
                                <td><FiMinusCircle
                                    onClick={() => handleMinus(item.productName, item.quantity)}
                                /> {item.quantity} <FiPlusCircle
                                        onClick={() => handlePlus(item.productName)}
                                    /></td>
                                <td>{((+item.price) * (+item.quantity)).toLocaleString()} đ</td>
                                <td><button className="btn btn-danger">Xóa</button></td>
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
                        <th colSpan="2">{totalPrice.toLocaleString()}đ</th>
                    </tr>
                </tbody>
            </table>
        </>
    )
};

export default Cart;