import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import _ from 'lodash'

const ViewProduct = (props) => {
    const { show, setShow, productUpdate } = props;

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
        props.resetproductUpdate();
    }
    // state
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [desc, setDesc] = useState("");
    const [author, setAuthor] = useState("");
    const [nxb, setNxb] = useState("");
    const [status, setStatus] = useState("SHOW");
    const [previewImage, setPreviewImage] = useState("");

    useEffect(() => {
        if (!_.isEmpty(productUpdate)) {
            setName(productUpdate.name);
            setPrice(productUpdate.price);
            setCategory(productUpdate.category);
            setDesc(productUpdate.desc);
            setAuthor(productUpdate.author);
            setNxb(productUpdate.nxb);
            setStatus(productUpdate.status);
            if (productUpdate.image)
                setPreviewImage(`data:image/jpeg;base64,${productUpdate.image}`);

            console.log(category);
        }
    }, [productUpdate])

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
                    <Modal.Title>Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Name (*)</label>
                            <input type="text" className="form-control" disabled
                                value={name} onChange={(event) => setName(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Price (*)</label>
                            <input type="text" className="form-control" disabled
                                value={price} onChange={(event) => setPrice(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Tác giả</label>
                            <input type="text" className="form-control" disabled
                                value={author} onChange={(event) => setAuthor(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Nhà xuất bản</label>
                            <input type="text" className="form-control" disabled
                                value={nxb} onChange={(event) => setNxb(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Status</label>
                            <select defaultValue={status} className="form-select" disabled
                                onChange={(event) => setStatus(event.target.value)}>
                                <option value={status}>{status}</option>
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Thể loại</label>
                            <select defaultValue={category} disabled className="form-select"
                                onChange={(event) => setCategory(event.target.value)}>
                                <option value={category}>{category}</option>
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Giới thiệu - mô tả</label>
                            <textarea type="text" className="form-control" disabled
                                value={desc} onChange={(event) => setDesc(event.target.value)}
                            />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Lượt mua</label>
                            <input type="text" className="form-control" disabled
                                value={productUpdate.buy}
                            />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Lượt xem</label>
                            <input type="text" className="form-control" disabled
                                value={productUpdate.watch}
                            />
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

export default ViewProduct;