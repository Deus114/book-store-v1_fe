import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { delelteCategory } from '../../../../services/apiService';
import { toast } from 'react-toastify';

const DeleteCategory = (props) => {
    const { show, setShow, categoryUpdate } = props;

    const handleClose = () => setShow(false);

    const handleConfirm = async () => {
        let res = await delelteCategory(categoryUpdate._id);
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
            <Modal show={show} onHide={handleClose} backdrop='static'>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm delete user ?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Do you want delete user: <b>{categoryUpdate && categoryUpdate.name ? categoryUpdate.name : ""}</b>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={() => handleConfirm()}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DeleteCategory;