import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { delelteUser } from '../../../../services/apiService';
import { toast } from 'react-toastify';

const DeleteUser = (props) => {
    const { show, setShow, userUpdate } = props;

    const handleClose = () => setShow(false);

    const handleConfirm = async () => {
        let res = await delelteUser(userUpdate._id);
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
                <Modal.Body>Do you want delete user: <b>{userUpdate && userUpdate.email ? userUpdate.email : ""}</b>
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

export default DeleteUser;