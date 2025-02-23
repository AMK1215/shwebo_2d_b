import React, { useState } from "react";
import calendar from "../assets/img/calendar.png";
import "../pages/twod.css";
import useFetch from "../hooks/useFetch";
import BASE_URL from "../hooks/baseURL";
import { Link } from "react-router-dom";
import TwoDSlip from "./TwoDSlip";

const TwoDHistory = () => {
  const [session, setSession] = useState("morning");
  const [detail, setDetail] = useState(false);
  const [slip, setSlip] = useState(null);

  const { data: history1, loading1 } = useFetch(
    BASE_URL + "/2d/user-morning-slip"
  );
  const { data: history2, loading: loading2 } = useFetch(
    BASE_URL + "/2d/user-evening-slip"
  );
  const morningHistory = history1?.records;
  const eveningHistory = history2?.records;

  const date = new Date();
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const month =
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const year = date.getFullYear();
  const today = `${day}-${month}-${year}`;

  const showDetail = () => {
    setDetail(!detail);
  }

  return (
    <div className="pt-4 pb-5 container">
      {!detail && (
        <>
          <h5 className="text-center fw-bold">2D တစ်နေ့တာ မှတ်တမ်း</h5>
          <span className="d-block text-center fw-bold mb-4">{today}</span>
          <div className="d-flex align-items-center justify-content-center gap-3">
            <div
              onClick={() => setSession("morning")}
              className={`text-center rounded-4 py-3 px-1 w-100 ${
                session == "morning" ? "activeBtn" : ""
              }`}
              style={{
                background:
                  "linear-gradient(104.11deg, #212D77 8.54%, #0788FF 92.1%)",
                cursor: "pointer",
              }}
            >
              <img src={calendar} style={{ width: "20px", height: "20px" }} />
              <p>Morning</p>
              <small>ထီထိုးမှတ်တမ်း</small>
            </div>
            <div
              onClick={() => setSession("evening")}
              className={`text-center rounded-4 py-3 px-1 w-100 ${
                session == "evening" ? "activeBtn" : ""
              }`}
              style={{
                background:
                  "linear-gradient(104.11deg, #212D77 8.54%, #0788FF 92.1%)",
                cursor: "pointer",
              }}
            >
              <img src={calendar} style={{ width: "20px", height: "20px" }} />
              <p>Evening</p>
              <small>ထီထိုးမှတ်တမ်း</small>
            </div>
          </div>
          <div className="my-4 px-2">
            {session === "morning" && (
              <div>
                {morningHistory &&
                  morningHistory.map((history, index) => (
                    <div key={index} className="mb-3 text-center">
                      <Link onClick={() => [showDetail(), setSlip(history.slip_no)]}>
                        <div className="d-flex align-items-center justify-content-between">
                          <div>
                            <small className="fw-bold d-block">စလစ်</small>
                            <small className="d-block">
                              {history.slip_no.split("-")[0]}
                            </small>
                          </div>
                          <div>
                            <small className="fw-bold d-block">Session</small>
                            <small className="d-block">မနက်ခင်း</small>
                          </div>
                          <div>
                            <small className="fw-bold d-block">ထိုးကြေး</small>
                            <small className="d-block text-warning">
                              {history.total_sub_amount}
                            </small>
                          </div>
                        </div>
                      </Link>
                      <hr />
                    </div>
                  ))}
              </div>
            )}
            {session === "evening" && (
              <div>
                {eveningHistory &&
                  eveningHistory.map((history, index) => (
                    <div key={index} className="mb-3 text-center">
                    <Link onClick={() => [showDetail(), setSlip(history.slip_no)]}>
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <small className="fw-bold d-block">စလစ်</small>
                          <small className="d-block">
                            {history.slip_no.split("-")[0]}
                          </small>
                        </div>
                        <div>
                          <small className="fw-bold d-block">Session</small>
                          <small className="d-block">ညနေခင်း</small>
                        </div>
                        <div>
                          <small className="fw-bold d-block">ထိုးကြေး</small>
                          <small className="d-block text-warning">
                            {history.total_sub_amount}
                          </small>
                        </div>
                      </div>
                    </Link>
                    <hr />
                  </div>
                  ))}
              </div>
            )}
          </div>
        </>
      )}
      {detail && <TwoDSlip slip={slip} show={showDetail} />}
    </div>
  );
};

export default TwoDHistory;
