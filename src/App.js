import { useEffect, useState } from 'react';
import './App.scss';
import Header from './components/Header/Header';
import { Outlet } from "react-router-dom";
import { getProductsByCat, getallCategories } from './services/apiService';
import { useNavigate } from 'react-router-dom'
import { MdOutlineHeadsetMic } from "react-icons/md";
import { BsCashCoin } from "react-icons/bs";
import { IoEarthOutline } from "react-icons/io5";
import { SiFacebook } from "react-icons/si";
import { FaInstagram, FaTwitter } from "react-icons/fa";

const App = () => {
  const navigate = useNavigate();

  const [listCategories, setListCategories] = useState([]);

  useEffect(() => {
    fetchListCategories();
  }, [])

  const fetchListCategories = async () => {
    let res = await getallCategories();
    if (res.EC === 0) {
      setListCategories(res.DT);
    }
  }

  const handleClickCategory = async (category) => {
    let res = await getProductsByCat(category);
    if (res.EC === 0) {
      navigate('/show-product', { state: { listProduct: res.DT, category: category.name } });
    }
  }

  return (
    <div className="app-container">
      <div className='header-container'>
        <Header />
      </div>
      <div className='main-container'>
        <div className='sidenav-container col-sm-3'>
          <aside>
            <h3 className="asi">DANH MỤC SẢN PHẨM</h3>
            <ul className="list-group">
              {listCategories && listCategories.length > 0 &&
                listCategories.map((item, index) => {
                  if (item.status === "SHOW") {
                    return (
                      <li key={`category-${index}`} className="list-group-item cate"
                        onClick={() => handleClickCategory(item)}
                      >{item.name}</li>
                    )
                  }
                })
              }
              <li className="list-group-item cate"
                onClick={() => handleClickCategory({})}
              >Tất cả</li>
            </ul>
          </aside>
        </div>
        <div className='app-content col-sm-8'>
          <Outlet />
        </div>
      </div>
      <br></br>
      <div className='footer-container'>
        <div className="row cont">
          <div className="col col-sm-2"></div>
          <div className="col col-sm-3" id='footer'>
            <h5><MdOutlineHeadsetMic /> Liên hệ với chúng tôi</h5>
            <h6>Tư vấn mua hàng (miễn phí)</h6>
            <span>1900 0000 <span>(8h-21h)</span></span>
            <h6>Hỗ trợ kĩ thuật</h6>
            <span>1900 0001 <span>(8h-21h)</span></span>
            <h6>Góp ý, khiếu nại</h6>
            <span>1900 0002 <span>(8h-21h)</span></span>
          </div>
          <div className="col col-sm-3">
            <h5><BsCashCoin /> Hỗ trợ thanh toán</h5>
            <h6>Thanh toán bằng tiền mặt</h6>
            <h6> Thanh toán bằng tài khoản ngân hàng</h6>
            <h6>Thành toán bằng thẻ</h6>
          </div>
          <div className="col col-sm-3">
            <h5><IoEarthOutline /> Theo dõi chúng tôi tại</h5>
            <h6><SiFacebook /> Facebook</h6>
            <h6><FaInstagram /> Instagram</h6>
            <h6><FaTwitter /> Twitter</h6>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
