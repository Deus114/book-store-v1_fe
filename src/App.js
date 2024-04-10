import { useEffect, useState } from 'react';
import './App.scss';
import Header from './components/Header/Header';
import { Outlet } from "react-router-dom";
import { getProductsByCat, getallCategories } from './services/apiService';
import { useNavigate } from 'react-router-dom'

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
            </ul>
          </aside>
        </div>
        <div className='app-content col-sm-8'>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
