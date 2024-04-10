import { useNavigate } from 'react-router-dom'
import { getProductsBuy, getProductsNew } from '../../services/apiService';
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
    const [listProductsbuy, setlistProductsbuy] = useState([]);

    useEffect(() => {
        fetchList();
    }, [])

    const fetchList = async () => {
        let res = await getProductsNew();
        let res1 = await getProductsBuy();
        if (res.EC === 0) {
            setlistProductsnew(res.DT);
            setlistProductsbuy(res1.DT);
        }
    }

    const handleClickProduct = (product) => {
        navigate('/product-detail', { state: { product: product } });
    }

    return (
        <>
            <h4 className='ttle'>SẢN PHẨM MỚI NHẤT</h4>
            <div className="row">
                <div className="row justify-content-start">
                    {listProductsnew && listProductsnew.length > 0 &&
                        listProductsnew.map((item, index) => {
                            let src = `data:image/jpeg;base64,${item.image}`;

                            return (
                                <div className="card col-sm-3" key={`product-${index}`}>
                                    <div onClick={() => handleClickProduct(item)}>
                                        <img className="rounded mx-auto d-block prdimg-home" src={src} />
                                    </div>
                                    <span className="card-text ellipsis">{item.name}</span>
                                    <div className="card-body">
                                        <p className="card-text">{(+item.price).toLocaleString()} đ</p>
                                        <button className="btn btn-primary res">Thêm giỏ hàng</button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div> <br></br>
            <h4 className='ttle'>SẢN BÁN CHẠY NHẤT</h4>
            <div className="row">
                <div className="row justify-content-start">
                    {listProductsbuy && listProductsbuy.length > 0 &&
                        listProductsbuy.map((item, index) => {
                            let src = `data:image/jpeg;base64,${item.image}`;

                            return (
                                <div className="card col-sm-3" key={`product-${index}`}>
                                    <div onClick={() => handleClickProduct(item)}>
                                        <img className="rounded mx-auto d-block prdimg-home" src={src} />
                                    </div>
                                    <span className="card-text ellipsis">{item.name}</span>
                                    <div className="card-body">
                                        <p className="card-text">{(+item.price).toLocaleString()} đ</p>
                                        <button className="btn btn-primary res">Thêm giỏ hàng</button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
};

export default Homepage;