import React from "react";
import useFetch from "../hooks/useFetch";
import BASE_URL from "../hooks/baseURL";

export default function ThreeDHistoryDetail({ show, slip, user, no }) {
  const { data: history } = useFetch(
    BASE_URL + "/3d/user/one-week-slip-no/" + user + "/" + slip
  );

  let records = history?.records;
  console.log(records);
  // return;

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <button
            className="btn btn-sm btn-outline-light mb-3"
            onClick={() => show(slip)}
          >
            <i className="fas fa-arrow-left"></i> ရှေ့သို့
          </button>
        </div>
        <div>
            <span className="fw-bold">Slip: {no}</span>
        </div>
      </div>

      {records &&
        records.map((record, index) => (
          <div
            className="d-flex align-items-center justify-content-between my-3"
            key={index}
          >
            <div>
              <small className="fw-bold d-block mb-2">နိုင်/ရှုံး</small>
              {record.win_lose === 0 && (
                <small className="d-block fw-bold text-warning">
                  စောင့်ဆိုင်း
                </small>
              )}
              {record.win_lose === 1 && (
                <small
                  className={`d-block fw-bold text-${
                    record.prize_sent === 1 ? "success" : "danger"
                  }`}
                >
                  {record.prize_sent === 1 ? "နိုင်" : "ရှုံး"}
                </small>
              )}
            </div>
            <div>
              <small className="fw-bold d-block mb-2">3D</small>
              <small className="d-block" style={{ color: "#FF1267" }}>
                {record.bet_digit}
              </small>
            </div>
            <div>
              <small className="fw-bold d-block mb-2">Bet (MMK)</small>
              <small className="d-block text-warning">
                {record.sub_amount}
              </small>
            </div>
          </div>
        ))}
    </>
  );
}
