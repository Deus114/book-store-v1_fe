import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from 'react-icons/fc';
import { toast } from 'react-toastify';
import { putUpdateUser } from '../../../../services/apiService'
import _ from 'lodash'

const ModalUpdateUser = (props) => {
    const { show, setShow, userUpdate } = props;

    const handleClose = () => {
        setShow(false);
        setEmail("");
        setPassword("");
        setPhone("");
        setAddress("");
        setImage("");
        setRole("USER");
        setPreviewImage("");
        props.resetUserUpdate();
    }
    // state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [role, setRole] = useState(userUpdate.role);
    const [image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");

    useEffect(() => {
        if (!_.isEmpty(userUpdate)) {
            setEmail(userUpdate.email);
            setPhone(userUpdate.phone);
            setAddress(userUpdate.address);
            setRole(userUpdate.role);
            setUsername(userUpdate.username);
            if (userUpdate.image)
                setPreviewImage(`data:image/jpeg;base64,${userUpdate.image}`);
        }
    }, [userUpdate])

    const handleUploadImg = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]))
            setImage(event.target.files[0])
        }
    }

    const handleSubmit = async () => {
        // call API
        let res = await putUpdateUser(userUpdate._id, username, phone, address, role, image);
        if (res && res.EC === 0) {
            toast.success(res.EM);
            await props.fetchList(props.currentpage);
            handleClose();
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
                    <Modal.Title>EDIT a User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control"
                                value={email} onChange={(event) => setEmail(event.target.value)}
                                disabled
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Password</label>
                            <input type="password" className="form-control"
                                value={password} onChange={(event) => setPassword(event.target.value)}
                                disabled
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Username</label>
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
                        <div className="col-md-6">
                            <label className="form-label">Role</label>
                            <select defaultValue={userUpdate.role} className="form-select" onChange={(event) => setRole(event.target.value)}>
                                <option value="USER">USER</option>
                                <option value="ADMIN">ADMIN</option>
                            </select>
                        </div>
                        <div className="col-md-12">
                            <label className="form-label label-upload" htmlFor="labelUpload">
                                <FcPlus /> Upload File Image</label>
                            <input type='file' id='labelUpload' hidden onChange={(event) => handleUploadImg(event)} />
                        </div>
                        <div className="col--md-12 img-preview">
                            {previewImage ?
                                <img src={previewImage} />
                                :
                                <span>Preview</span>
                            }
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