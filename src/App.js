import { useEffect, useState } from 'react';
import './App.scss';
import Header from './components/Header/Header';
import { Outlet } from "react-router-dom";
import { getallCategories } from './services/apiService';

const App = () => {
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
                listCategories.map((item) => {
                  if (item.status === "SHOW") {
                    return (
                      <li class="list-group-item">{item.name}</li>
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
