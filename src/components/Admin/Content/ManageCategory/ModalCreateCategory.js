import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { postCreateNewCategory } from '../../../../services/apiService'

const ModalCreateCategory = (props) => {
    const { show, setShow } = props;

    const handleClose = () => {
        setShow(false);
        setName("");
        setStatus("SHOW");
    }
    // state
    const [name, setName] = useState("");
    const [status, setStatus] = useState("SHOW");

    const handleSubmit = async () => {
        // Validate
        if (name === "") {
            toast.error('Invalid Name');
            return;
        }

        // call API
        let res = await postCreateNewCategory(name, status);
        if (res && res.EC === 0) {
            toast.success(res.EM);
            handleClose();
            props.setCurrentpage(1);
            await props.fetchList(1);
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
                className='modal-add-category'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add new category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Name</label>
                            <input type="email" className="form-control"
                                value={name} onChange={(event) => setName(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Status</label>
                            <select defaultValue="SHOW" className="form-select" onChange={(event) => setStatus(event.target.value)}>
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
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalCreateCategory;