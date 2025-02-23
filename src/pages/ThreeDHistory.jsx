import React, { useEffect, useState } from "react";
import calendar from "../assets/img/calendar.png";
import "../pages/twod.css";
import useFetch from "../hooks/useFetch";
import BASE_URL from "../hooks/baseURL";
import ThreeDHistoryDetail from "./ThreeDHistoryDetail";

const ThreeDHistory = () => {
  const { data: user } = useFetch(BASE_URL + "/user");
  const { data: slips } = useFetch(BASE_URL + "/3d/user/one-week-rec-slip");
  const [show, setShow] = useState(false);
  const [slip, setSlip] = useState(null);
  const [number, setNumber] = useState(0);
  const records = slips?.records;

  const [url, setUrl] = useState(BASE_URL + "/3d/user/one-week-rec-slip-no/" + user.id + "/" + slip);

  const detail = (slip, no) => {
    setShow(!show);
    setSlip(slip);
    setNumber(no);
  }

  return (
    <div className="pt-4 pb-5 container">
      <h5 className="text-center fw-bold">3Dထီထိုးမှတ်တမ်း</h5>
      {/* <span className="d-block text-center fw-bold mb-4">{today}</span> */}
      <div className="my-4 px-2">
        {!show && (
            <div>
                {records &&
                records.map((history, index) => (
                    <button key={index} className="mb-3 btn btn btn-outline-light w-100 text-start" onClick={() => detail(history.slip_no, index)}>
                        <span className="d-block">Slip #{++index}</span>
                        <small className="text-start d-block">{history.slip_no}</small>
                    </button>
                ))}
            </div>
        )}
        {show && (
            <ThreeDHistoryDetail show={detail} slip={slip} user={user.id} no={number} />
        )}
      </div>
    </div>
  );
};

export default ThreeDHistory;
