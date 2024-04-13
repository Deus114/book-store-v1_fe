import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux'
import { postCart } from '../../services/apiService';


const ProductDetail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    const account = useSelector(state => state.user.account)
    const { state } = location;
    let product = state?.product;
    let src = `data:image/jpeg;base64,${product.image}`;

    const handleClickAddCart = async (product) => {
        if (!isAuthenticated) {
            toast.success("Please login to add product to your cart");
            navigate('/login');
            window.location.reload();
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

    return (
        <>
            <div className="row">
                <div className="col">
                    <div className="box-large">
                        <div className="box-top">
                            <img id="img-large" className="img-fluid" src={src} width="70%" />
                        </div>
                    </div>
                </div>
                <div className='col content'>
                    <h4>{product.name}</h4>
                    <div className='row'>
                        <div className='col'><b>Tác giả:</b> {product.author}</div>
                        <div className='col'><b>Nhà xuất bản:</b> {product.nxb}</div>
                    </div>
                    <div className='row'>
                        <div className='col'><b>Thể loại:</b> {product.category}</div>
                    </div> <br></br>
                    <div className='row'>
                        <h4 className='price'>{(+product.price).toLocaleString()} đ</h4>
                    </div>
                    <div className='row'>
                        <div className='col'><button className='btn btn-danger'
                            onClick={() => handleClickAddCart(product)}
                        >Mua ngay</button></div>
                        <div className='col'><button className='btn btn-primary'
                            onClick={() => handleClickAddCart(product)}
                        >Thêm giỏ hàng</button></div>
                    </div>
                </div>
            </div>

            <div className='row desc'>
                <h4>Thông tin sản phẩm: </h4>
                <div className='desc-content'>
                    <p>
                        {product.desc}
                    </p>
                </div>

            </div>
        </>
    )
};

export default ProductDetail;