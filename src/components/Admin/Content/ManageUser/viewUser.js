import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import _ from 'lodash'

const ViewUser = (props) => {
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
            setRole(userUpdate.role);
            setPhone(userUpdate.phone);
            setAddress(userUpdate.address);
            setUsername(userUpdate.username);
            setPassword(userUpdate.password);
            if (userUpdate.image)
                setPreviewImage(`data:image/jpeg;base64,${userUpdate.image}`);
        }
    }, [userUpdate])

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
                                value={email}
                                disabled
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Password</label>
                            <input type="password" className="form-control"
                                value={password}
                                disabled
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Username</label>
                            <input type="text" className="form-control"
                                value={username} onChange={(event) => setUsername(event.target.value)}
                                disabled
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Phone</label>
                            <input type="text" className="form-control" disabled
                                value={phone} onChange={(event) => setPhone(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Address</label>
                            <input type="text" className="form-control" disabled
                                value={address} onChange={(event) => setAddress(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Role</label>
                            <select disabled defaultValue={userUpdate.role} className="form-select" onChange={(event) => setRole(event.target.value)}>
                                <option value="USER">USER</option>
                                <option value="ADMIN">ADMIN</option>
                            </select>
                        </div>
                        <div className="col-md-12">
                            <label className="form-label label-upload">
                                Image
                            </label>
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
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ViewUser;