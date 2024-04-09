import { useNavigate } from 'react-router-dom'
import { getProductsNew } from '../../services/apiService';
import { useEffect, useState } from 'react';
// import {useSelector} from 'react-redux'

const Homepage = () => {
    const navigate = useNavigate();
    // const account =useSelector(state => state.user.account)
    // const isAuthenticated =useSelector(state => state.user.isAuthenticated)

    // const handleGetstart = () => {
    //     navigate('/login');
    // }

    const [listProductsnew, setlistProductsnew] = useState([]);

    useEffect(() => {
        fetchList();
    }, [])

    const fetchList = async () => {
        let res = await getProductsNew();
        if (res.EC === 0) {
            setlistProductsnew(res.DT);
        }
    }

    return (
        <>
            <h4>SẢN PHẨM MỚI NHẤT</h4>
            <div className="row">
                <div className="row justify-content-start">
                    {listProductsnew && listProductsnew.length > 0 &&
                        listProductsnew.map((item, index) => {
                            let src = `data:image/jpeg;base64,${item.image}`;

                            return (
                                <>
                                    <div className="card col-sm-3">
                                        <div>
                                            <img className="rounded mx-auto d-block prdimg-home" src={src} />
                                        </div>
                                        <span className="card-text ellipsis">{item.name}</span>
                                        <div className="card-body">
                                            <p className="card-text">{item.price}đ</p>
                                            <button className="btn btn-primary res">Thêm giỏ hàng</button>
                                        </div>
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
            </div> <br></br>
        </>
    )
};

export default Homepage;