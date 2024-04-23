import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getorderById } from "../../services/apiService";
import { useSelector } from "react-redux";


const History = () => {
    const navigate = useNavigate();
    const [listOrder, setListOrder] = useState([]);
    const account = useSelector(state => state.user.account)

    useEffect(() => {
        fetchList();
    }, [])

    const fetchList = async () => {
        let res = await getorderById(account.id);
        if (res.EC === 0) {
            setListOrder(res.DT);
        }
    }

    return (
        <>
            <div>
                <span className='back'
                    onClick={() => navigate('/cart')}>&#60;&#60; Giỏ hàng</span>
            </div>
            <br></br>
            <h2 className="ttle">Lịch sử mua hàng</h2>
            <hr />
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Nội dung</th>
                        <th scope="col">Email</th>
                        <th scope="col">Tên</th>
                        <th scope="col">SĐT</th>
                        <th scope="col">Địa chỉ</th>
                        <th scope="col">Tổng</th>
                        <th scope="col">Ngày mua</th>
                        <th scope="col">Trạng thái</th>
                    </tr>
                </thead>
                <tbody>
                    {listOrder.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.content}</td>
                                <td>{item.email}</td>
                                <td>{item.name}</td>
                                <td>{item.phone}</td>
                                <td>{item.address}</td>
                                <td>{item.totalPrice.toLocaleString()}đ</td>
                                <td>{item.createdAt}</td>
                                <td>{item.status}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}

export default History;