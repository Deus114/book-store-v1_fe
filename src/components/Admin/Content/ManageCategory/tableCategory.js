import ReactPaginate from "react-paginate";
const TableCategory = (props) => {
    const { listCategory, pageCount } = props;

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
                        <th scope="col">Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listCategory && listCategory.length > 0 &&
                        listCategory.map((item, index) => {
                            return (
                                <tr key={`cat-${index}`}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.status}</td>
                                    <td>
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
                    {listCategory && listCategory.length === 0 &&
                        < tr >
                            <td colSpan={5}>No category found</td>
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

export default TableCategory;