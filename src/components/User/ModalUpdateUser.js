import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { putUpdateUser } from '../../services/apiService';
import { useDispatch } from 'react-redux';
import { doLogin } from '../../redux/action/userAction';

const ModalUpdateUser = (props) => {
    const { show, setShow, account } = props;
    const dispatch = useDispatch();

    const handleClose = () => {
        setShow(false);
    }
    // state
    const [email, setEmail] = useState(account.email);
    const [password, setPassword] = useState(account.password);
    const [username, setUsername] = useState(account.user);
    const [phone, setPhone] = useState(account.phone);
    const [address, setAddress] = useState(account.address);

    const handleSubmit = async () => {
        // Validate
        if (!username || !password) {
            toast.error("You must fill require blank !");
            return;
        }

        // call API
        let res = await putUpdateUser(account.id, username, phone, address, account.role);
        if (res && res.EC === 0) {
            dispatch(doLogin(res));
            handleClose();
            toast.success(res.EM);
        }
        if (res && res.EC !== 0) {
            toast.error(res.EM);
        }
    }

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                size='xl'
                backdrop='static'
                className='modal-add-user'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Infomation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email(*)</label>
                            <input type="email" className="form-control"
                                value={email} onChange={(event) => setEmail(event.target.value)}
                                disabled
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Password(*)</label>
                            <input type="text" className="form-control"
                                value={password} onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Username(*)</label>
                            <input type="text" className="form-control"
                                value={username} onChange={(event) => setUsername(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Phone</label>
                            <input type="text" className="form-control"
                                value={phone} onChange={(event) => setPhone(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Address</label>
                            <input type="text" className="form-control"
                                value={address} onChange={(event) => setAddress(event.target.value)}
                            />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmit()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUpdateUser;