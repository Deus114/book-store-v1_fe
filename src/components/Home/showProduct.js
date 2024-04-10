import { useNavigate, useLocation } from 'react-router-dom'


const ShowProduct = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;
    let listProduct = state.listProduct;

    const handleClickProduct = (product) => {
        navigate('/product-detail', { state: { product: product } });
    }

    return (
        <>
            <h4 className='ttle'>{state.category ?
                <>{state.category}</> :
                <>Tất cả sản phẩm</>
            }</h4>
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

export default ShowProduct;