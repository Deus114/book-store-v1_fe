import ModalCreateUser from "./ModalCreateUser";
import "./ManageUser.scss"
import { FcPlus } from "react-icons/fc";
// import TableUser from "./tableUser";
import { useEffect, useState } from "react";
import { getUsersPaginate } from "../../../../services/apiService"
import ModalUpdateUser from "./ModalUpdateUser";
import ViewUser from "./viewUser";
import DeleteUser from "./ModalDeleteUser";
import TableUserPaginate from "./TableUserPaginate";

const ManageUser = (props) => {
    const limitUser = 5;
    const [currentpage, setCurrentpage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [userUpdate, setuserUpdate] = useState({});
    const [showView, setShowView] = useState(false);
    const [pageCount, setPageCount] = useState(0);

    const [listUser, setListUser] = useState([]);

    // ComponentDidMount && no need asyn await
    useEffect(() => {
        fetchListPaginate(1);
        // fetchList();
    }, [])

    // const fetchList = async () => {
    //     let res = await getAllUsers();
    //     if (res.EC === 0) {
    //         setListUser(res.DT);
    //     }
    // }

    const fetchListPaginate = async (page) => {
        let res = await getUsersPaginate(page, limitUser);
        if (res.EC === 0) {
            console.log(res.DT)
            setListUser(res.DT.users);
            setPageCount(res.DT.totalPages);
        }
    }

    const handleClickUpdate = (user) => {
        setShowModalUpdate(true);
        setuserUpdate(user);
    }

    const resetUserUpdate = () => {
        setuserUpdate({});
    }

    const handleClickView = (user) => {
        setShowView(true);
        setuserUpdate(user);
    }

    const handleClickDelete = (user) => {
        setShowModalDelete(true);
        setuserUpdate(user);
    }

    return (
        <div className="manage-user-container">
            <div className='title'>
                ManageUser
            </div>
            <div className='user-content'>
                <div className="btn-addnew-user">
                    <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                        <FcPlus /> Add new user
                    </button>
                </div>
                <div>
                    {/* <TableUser
                        listUser={listUser}
                        handleClickUpdate={handleClickUpdate}
                        handleClickView={handleClickView}
                        handleClickDelete={handleClickDelete}
                    /> */}
                    <TableUserPaginate
                        listUser={listUser}
                        handleClickUpdate={handleClickUpdate}
                        handleClickView={handleClickView}
                        handleClickDelete={handleClickDelete}
                        pageCount={pageCount}
                        fetchList={fetchListPaginate}
                        currentpage={currentpage}
                        setCurrentpage={setCurrentpage}
                    />
                </div>
                <ModalCreateUser
                    show={showModal}
                    setShow={setShowModal}
                    fetchList={fetchListPaginate}
                    currentpage={currentpage}
                    setCurrentpage={setCurrentpage}
                />
                <ModalUpdateUser
                    show={showModalUpdate}
                    setShow={setShowModalUpdate}
                    fetchList={fetchListPaginate}
                    userUpdate={userUpdate}
                    resetUserUpdate={resetUserUpdate}
                    currentpage={currentpage}
                />
                <ViewUser
                    show={showView}
                    setShow={setShowView}
                    userUpdate={userUpdate}
                    resetUserUpdate={resetUserUpdate}
                />
                <DeleteUser
                    show={showModalDelete}
                    setShow={setShowModalDelete}
                    userUpdate={userUpdate}
                    fetchList={fetchListPaginate}
                    currentpage={currentpage}
                    setCurrentpage={setCurrentpage}
                />
            </div>
        </div>
    )
}

export default ManageUser;