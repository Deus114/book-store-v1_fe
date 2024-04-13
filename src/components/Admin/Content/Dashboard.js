import { useEffect, useState } from "react";
import { getAdminBoard } from "../../../services/apiService";


const Dashboard = (props) => {
    let [board, setBoard] = useState({})

    useEffect(() => {
        fetchBoard();
    }, [])

    const fetchBoard = async () => {
        let res = await getAdminBoard();
        if (res && res.EC === 0) {
            setBoard(res.DT);
        }
    }

    return (
        <>
            <div className="title">
                <h4>Wellcome to Amin Page</h4>
            </div>
            <div className="board">
                <div className="row">
                    <div className="col-sm-3">
                        <h5>
                            Users
                        </h5>
                        <hr></hr>
                        <span>{board.users}</span>
                    </div>
                    <div className="col-sm-3">
                        <h5>
                            Categories
                        </h5>
                        <hr></hr>
                        <span>{board.categories}</span>
                    </div>
                    <div className="col-sm-3">
                        <h5>
                            Products
                        </h5>
                        <hr></hr>
                        <span>{board.products}</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard;