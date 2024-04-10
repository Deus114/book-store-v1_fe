import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from 'react-icons/fc';
import { toast } from 'react-toastify';
import { postCreateNewProduct } from '../../../../services/apiService';

const ModalCreateProduct = (props) => {
    const { show, setShow, listCategories } = props;

    const handleClose = () => {
        setShow(false);
        setName("");
        setPrice("");
        setCategory("");
        setDesc("");
        setAuthor("");
        setNxb("");
        setStatus("SHOW");
        setPreviewImage("");
    }
    // state
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [desc, setDesc] = useState("");
    const [author, setAuthor] = useState("");
    const [nxb, setNxb] = useState("");
    const [status, setStatus] = useState("SHOW");
    const [image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");

    const handleUploadImg = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]))
            setImage(event.target.files[0])
        }
    }

    const handleSubmit = async () => {
        // Validate
        if (!name || !price || !image) {
            toast.error("Please fill all importan blank !");
            return;
        }

        // call API
        let res = await postCreateNewProduct(name, price, desc, author, nxb, status, category, image);
        if (res && res.EC === 0) {
            props.setCurrentpage(1);
            await props.fetchList(1);
            toast.success(res.EM);
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
                    <Modal.Title>Add new Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Name (*)</label>
                            <input type="text" className="form-control"
                                value={name} onChange={(event) => setName(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Price (*)</label>
                            <input type="text" className="form-control"
                                value={price} onChange={(event) => setPrice(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Tác giả</label>
                            <input type="text" className="form-control"
                                value={author} onChange={(event) => setAuthor(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Nhà xuất bản</label>
                            <input type="text" className="form-control"
                                value={nxb} onChange={(event) => setNxb(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Status</label>
                            <select defaultValue="SHOW" className="form-select" onChange={(event) => setStatus(event.target.value)}>
                                <option value="SHOW">SHOW</option>
                                <option value="HIDE">HIDE</option>
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Thể loại</label>
                            <select className="form-select" defaultValue={listCategories[0]?.name}
                                onChange={(event) => setCategory(event.target.value)}>
                                {listCategories && listCategories.length > 0 &&
                                    listCategories.map((item, index) => {
                                        return (
                                            <option value={item.name}>{item.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Giới thiệu - mô tả</label>
                            <textarea type="text" className="form-control"
                                value={desc} onChange={(event) => setDesc(event.target.value)}
                            />
                        </div>
                        <div className="col-md-12">
                            <label className="form-label label-upload" htmlFor="labelUpload">
                                <FcPlus /> Upload File Image (*)</label>
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
                    <Button variant="primary"
                        onClick={() => handleSubmit()}>
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalCreateProduct;