import "../ManageUser/ManageUser.scss"
import { FcPlus } from "react-icons/fc";
import { useEffect, useState } from "react";
import { getProductsPaginate, getallCategories } from "../../../../services/apiService"
import ModalCreateProduct from "./ModalCreateProduct";
import TableProduct from "./tableProduct";
import ViewProduct from "./viewProduct";

const ManageProduct = (props) => {
    const limitUser = 5;
    const [currentpage, setCurrentpage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [productUpdate, setproductUpdate] = useState({});
    const [showView, setShowView] = useState(false);
    const [pageCount, setPageCount] = useState(0);

    const [listCategories, setListCategories] = useState([]);
    const [listProducts, setListProducts] = useState([]);

    // ComponentDidMount && no need asyn await
    useEffect(() => {
        fetchListPaginate(1);
        fetchListCategories();
    }, [])

    const fetchListCategories = async () => {
        let res = await getallCategories();
        if (res.EC === 0) {
            setListCategories(res.DT);
        }
    }

    const fetchListPaginate = async (page) => {
        let res = await getProductsPaginate(page, limitUser);
        if (res.EC === 0) {
            setListProducts(res.DT.products);
            setPageCount(res.DT.totalPages);
        }
    }

    // // const handleClickUpdate = (user) => {
    // //     setShowModalUpdate(true);
    // //     setuserUpdate(user);
    // // }

    const resetproductUpdate = () => {
        setproductUpdate({});
    }

    const handleClickView = (product) => {
        setShowView(true);
        setproductUpdate(product);
    }

    // // const handleClickDelete = (user) => {
    // //     setShowModalDelete(true);
    // //     setuserUpdate(user);
    // // }

    return (
        <div className="manage-user-container">
            <div className='title'>
                Manage Products
            </div>
            <div className='user-content'>
                <div className="btn-addnew-user">
                    <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                        <FcPlus /> Add new Product
                    </button>
                </div>
                <div>
                    <TableProduct
                        listProducts={listProducts}
                        // handleClickUpdate={handleClickUpdate}
                        handleClickView={handleClickView}
                        // handleClickDelete={handleClickDelete}
                        pageCount={pageCount}
                        fetchList={fetchListPaginate}
                        currentpage={currentpage}
                        setCurrentpage={setCurrentpage}
                    />
                    <ModalCreateProduct
                        show={showModal}
                        setShow={setShowModal}
                        listCategories={listCategories}
                        fetchList={fetchListPaginate}
                        currentpage={currentpage}
                        setCurrentpage={setCurrentpage}
                    />
                </div>
                {/* <ModalUpdateUser
                    show={showModalUpdate}
                    setShow={setShowModalUpdate}
                    fetchList={fetchListPaginate}
                    userUpdate={userUpdate}
                    resetUserUpdate={resetUserUpdate}
                    currentpage={currentpage}
                /> */}
                <ViewProduct
                    show={showView}
                    setShow={setShowView}
                    productUpdate={productUpdate}
                    resetproductUpdate={resetproductUpdate}
                />
                {/* <DeleteUser
                    show={showModalDelete}
                    setShow={setShowModalDelete}
                    userUpdate={userUpdate}
                    fetchList={fetchListPaginate}
                    currentpage={currentpage}
                    setCurrentpage={setCurrentpage}
                /> */}
            </div>
        </div>
    )
}

export default ManageProduct;