import { useNavigate, useLocation } from 'react-router-dom'
import { getProductsByCat, postCart } from '../../services/apiService';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';


const ShowProduct = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;
    const [listProduct, setLisProduct] = useState([])
    const [defaultValue, setDefaultValue] = useState("0")
    const account = useSelector(state => state.user.account)
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)

    useEffect(() => {
        setLisProduct(state.listProduct);
        setDefaultValue("0");
    }, [state.listProduct])

    const handleClickProduct = (product) => {
        navigate('/product-detail', { state: { product: product } });
    }

    const handleClickAddCart = async (product) => {
        if (!isAuthenticated) {
            navigate('/login');
            toast.success("Please login to add product to your cart");
        }
        else {
            let res = await postCart(product.name, product.image, account.id, 1, product.price)
            if (res.EC === 0) {
                toast.success(res.EM);
                navigate('/cart');
            }
            else {
                toast.error(res.EM);
            }
        }
    }

    const handleClickFilter = async (index) => {
        console.log(state.category)
        let res = await getProductsByCat(state.category, index);
        setLisProduct(res.DT);
    }

    return (
        <>
            <div className='row'>
                <div className='col'>
                    <h4 className='ttle'>{state.category ?
                        <>{state.category}</> :
                        <>Tất cả sản phẩm</>
                    }</h4>
                </div>
                <div className='col'>
                    <select value={defaultValue} className='filter'
                        onChange={(event) => {
                            if (event.target.value !== "0") {
                                setDefaultValue(event.target.value)
                                handleClickFilter(event.target.value);
                            }
                        }}
                    >
                        <option value="0">Sắp xếp theo giá</option>
                        <option value="1">Tăng dần</option>
                        <option value="-1">Giảm dần</option>
                    </select>
                </div>
            </div>

            <div className="row">
                <div className="row justify-content-start">
                    {listProduct && listProduct.length > 0 &&
                        listProduct.map((item, index) => {
                            let src = `data:image/jpeg;base64,${item.image}`;

                            return (
                                <div className="card col-sm-3" key={`product-${index}`}>
                                    <div onClick={() => handleClickProduct(item)}>
                                        <img className="rounded mx-auto d-block prdimg-home" src={src} />
                                    </div>
                                    <span className="card-text ellipsis">{item.name}</span>
                                    <div className="card-body">
                                        <p className="card-text">{(+item.price).toLocaleString()}đ</p>
                                        <button className="btn btn-primary res"
                                            onClick={() => handleClickAddCart(item)}
                                        >Thêm giỏ hàng</button>
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

export default ShowProduct;