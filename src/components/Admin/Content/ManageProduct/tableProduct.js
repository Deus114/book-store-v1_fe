import ReactPaginate from "react-paginate";

const TableProduct = (props) => {
    const { listProducts, pageCount } = props;

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        props.fetchList(+event.selected + 1);
        props.setCurrentpage(+event.selected + 1);
    };

    return (
        <>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listProducts && listProducts.length > 0 &&
                        listProducts.map((item, index) => {
                            return (
                                <tr key={`product-${index}`}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{(+item.price).toLocaleString()} đ</td>
                                    <td>{item.status}</td>
                                    <td>
                                        <button className="btn btn-primary"
                                            onClick={() => props.handleClickView(item)}
                                        >
                                            View
                                        </button>
                                        <button className="btn btn-warning mx-3"
                                            onClick={() => props.handleClickUpdate(item)}
                                        >
                                            Edit
                                        </button>
                                        <button className="btn btn-danger"
                                            onClick={() => props.handleClickDelete(item)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    {listProducts && listProducts.length === 0 &&
                        < tr >
                            <td colSpan={5}>No product found</td>
                        </tr>
                    }
                </tbody>
            </table >
            <ReactPaginate
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={pageCount}
                previousLabel="< previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
                forcePage={props.currentpage - 1}
            />
        </>
    )
};

export default TableProduct;