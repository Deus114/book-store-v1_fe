import "../ManageUser/ManageUser.scss"
import { FcPlus } from "react-icons/fc";
import { useEffect, useState } from "react";
import ModalCreateCategory from "./ModalCreateCategory";
import TableCategory from "./tableCategory";
import { getAllCategories } from "../../../../services/apiService";
import ModalUpdateCategory from "./ModalUpdateCategory";
import DeleteCategory from "./ModalDeleteCategory";

const ManageCategory = (props) => {
    const limitUser = 5;
    const [currentpage, setCurrentpage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [categoryUpdate, setcategoryUpdate] = useState({});
    const [pageCount, setPageCount] = useState(1);

    const [listCategory, setListCategory] = useState([]);

    // ComponentDidMount && no need asyn await
    useEffect(() => {
        fetchListPaginate(1);
    }, [])

    const fetchListPaginate = async (page) => {
        let res = await getAllCategories(page, limitUser);
        if (res.EC === 0) {
            console.log(res.DT)
            setListCategory(res.DT.categories);
            setPageCount(res.DT.totalPages);
        }
    }

    const handleClickUpdate = (category) => {
        setShowModalUpdate(true);
        setcategoryUpdate(category);
    }

    const resetcategoryUpdate = () => {
        setcategoryUpdate({});
    }

    const handleClickDelete = (category) => {
        setShowModalDelete(true);
        setcategoryUpdate(category);
    }

    return (
        <div className="manage-user-container">
            <div className='title'>
                Manage Category
            </div>
            <div className='user-content'>
                <div className="btn-addnew-user">
                    <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                        <FcPlus /> Add new Category
                    </button>
                </div>
                <div>
                    <TableCategory
                        listCategory={listCategory}
                        handleClickUpdate={handleClickUpdate}
                        handleClickDelete={handleClickDelete}
                        pageCount={pageCount}
                        fetchList={fetchListPaginate}
                        currentpage={currentpage}
                        setCurrentpage={setCurrentpage}
                    />
                </div>
                <ModalCreateCategory
                    show={showModal}
                    setShow={setShowModal}
                    fetchList={fetchListPaginate}
                    currentpage={currentpage}
                    setCurrentpage={setCurrentpage}
                />
                <ModalUpdateCategory
                    show={showModalUpdate}
                    setShow={setShowModalUpdate}
                    fetchList={fetchListPaginate}
                    categoryUpdate={categoryUpdate}
                    resetcategoryUpdate={resetcategoryUpdate}
                    currentpage={currentpage}
                />
                <DeleteCategory
                    show={showModalDelete}
                    setShow={setShowModalDelete}
                    categoryUpdate={categoryUpdate}
                    fetchList={fetchListPaginate}
                    currentpage={currentpage}
                    setCurrentpage={setCurrentpage}
                />
            </div>
        </div>
    )
}

export default ManageCategory;