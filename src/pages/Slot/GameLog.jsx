import React, { useContext, useEffect, useState } from 'react'
import BASE_URL from '../../hooks/baseURL';
import useFetch from '../../hooks/useFetch';
import Spinner from '../../components/Loader/Spinner';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';


export default function GameLog() {
    const { auth } = useContext(AuthContext);
    const [url, setUrl] = useState(BASE_URL + '/wager-logs');
    const [type, setType] = useState('today');
    const {data: logs, loading} = useFetch(url);
    const navigate = useNavigate();
    console.log(logs);

    useEffect(() => {
        if (!auth) {
          navigate('/login');
        }
      }, [auth, navigate]);


  return (
    <div>
        <h5 className='text-center my-4'>Game Logs</h5>
        <div className="d-flex gap-2 justify-content-center mb-3">
            <button className={`btn btn-sm btn-outline-light ${type=="today" ? "active" : ""}`} onClick={() => [setUrl(BASE_URL + '/wager-logs'), setType('today')]}>
                Today
            </button>
            <button className={`btn btn-sm btn-outline-light ${type=="yesterday" ? "active" : ""}`} onClick={() => [setUrl(BASE_URL + '/wager-logs?type=yesterday'), setType('yesterday')]}>
                Yesterday
            </button>
            <button className={`btn btn-sm btn-outline-light ${type=="this_week" ? "active" : ""}`} onClick={() => [setUrl(BASE_URL + '/wager-logs?type=this_week'), setType('this_week')]}>
                This Week
            </button>
            <button className={`btn btn-sm btn-outline-light ${type=="last_week" ? "active" : ""}`} onClick={() => [setUrl(BASE_URL + '/wager-logs?type=last_week'), setType('last_week')]}>
                Last Week
            </button>
        </div>
        <div className="table-responsive mb-5 pb-4">
            <table className="table table-dark text-center">
                <thead>
                    <tr>
                        <td>#</td>
                        <td>Game</td>
                        <td>Bet</td>
                        <td>Count</td>
                        <td>Result</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        !loading && (
                            logs.length > 0 ? logs.map((log, index) => (
                                <tr key={index}>
                                    <td>{++index}</td>
                                    <td>
                                        {log.product}
                                        {/* <span className={`badge text-bg-${log.status == "win" ? "success" : "danger"}`}>{log.status}</span> */}
                                    </td>
                                    <td>{Number(log.total_bet_amount).toLocaleString()}</td>
                                    <td>{log.total_count}</td>
                                    <td>
                                        <span className={`${Number(log.total_transaction_amount) > 0 ? "text-success" : "text-danger"}`}>{Number(log.total_transaction_amount).toLocaleString()}</span>
                                    </td>
                                </tr>
                            )):(
                                <tr>
                                    <td colSpan={5}>
                                        <div className="d-flex justify-content-center align-items-center">
                                            No Data Found
                                        </div>
                                    </td>
                                </tr>
                            )
                        )
                    }
                </tbody>
            </table>
            {loading && <Spinner />}
        </div>
    </div>
  )
}
