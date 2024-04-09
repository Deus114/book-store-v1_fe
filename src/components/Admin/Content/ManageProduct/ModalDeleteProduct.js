import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { delelteProduct } from '../../../../services/apiService';
import { toast } from 'react-toastify';

const DeleteProduct = (props) => {
    const { show, setShow, productUpdate } = props;

    const handleClose = () => setShow(false);

    const handleConfirm = async () => {
        let res = await delelteProduct(productUpdate._id);
        if (res && res.EC === 0) {
            props.setCurrentpage(1);
            await props.fetchList(1);
            handleClose();
            toast.success(res.EM);
        }
        if (res && res.EC !== 0) {
            toast.error(res.EM);
        }
    }

    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop='static'>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm delete product ?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Do you want delete product: <b>{productUpdate && productUpdate.name ? productUpdate.name : ""}</b>
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

export default DeleteProduct;