import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { putUpdateCategory } from '../../../../services/apiService'
import _ from 'lodash'

const ModalUpdateCategory = (props) => {
    const { show, setShow, categoryUpdate } = props;

    const handleClose = () => {
        setShow(false);
        setName("");
        setStatus("");
        props.resetcategoryUpdate();
    }
    // state
    const [name, setName] = useState("");
    const [status, setStatus] = useState("SHOW");

    useEffect(() => {
        if (!_.isEmpty(categoryUpdate)) {
            setName(categoryUpdate.name);
            setStatus(categoryUpdate.status);
        }
    }, [categoryUpdate])

    const handleSubmit = async () => {
        // call API
        let res = await putUpdateCategory(categoryUpdate._id, name, status);
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
                    <Modal.Title>EDIT a Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Name</label>
                            <input type="text" className="form-control"
                                value={name} onChange={(event) => setName(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Role</label>
                            <select defaultValue={categoryUpdate.status} className="form-select" onChange={(event) => setStatus(event.target.value)}>
                                <option value="SHOW">SHOW</option>
                                <option value="HIDE">HIDE</option>
                            </select>
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

export default ModalUpdateCategory;