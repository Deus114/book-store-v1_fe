import { useState } from 'react';
import { useSelector } from 'react-redux'
import ModalUpdateUser from './ModalUpdateUser';

const User = (props) => {
    const account = useSelector(state => state.user.account)
    const [showModalUpdate, setShowModalUpdate] = useState(false);

    return (
        <div className="mx-auto info">
            <h3>Thông tin cá nhân</h3>
            <br></br>
            <div className="row">
                <div className="col usf">
                    <div className="row" ><p>Username:</p></div>
                    <div className="row" ><p>Email:</p></div>
                    <div className="row" ><p>Mật khẩu:</p></div>
                    <div className="row" ><p>Điện thoại:</p></div>
                    <div className="row" ><p>Địa chỉ:</p></div>
                </div>
                <div className="col">
                    <div className="row"><p>{account.user}</p></div>
                    <div className="row"><p>{account.email}</p></div>
                    <div className="row"><p>**********</p></div>
                    <div className="row"><p>{account.phone}</p></div>
                    <div className="row"><p>{account.address}</p></div>
                </div>
            </div>
            <button type="button" className="btn btn-primary"
                onClick={() => { setShowModalUpdate(true); }}
            >Chỉnh sửa</button>
            <ModalUpdateUser
                show={showModalUpdate}
                setShow={setShowModalUpdate}
                account={account}
            />
        </div>
    )
};

export default User;