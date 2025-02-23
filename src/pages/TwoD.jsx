import React, { useContext, useEffect, useState } from "react";
import UserWallet from "../components/UserWallet";
import list from "../assets/img/list.png";
import winner from "../assets/img/winner.png";
import holiday from "../assets/img/holiday.png";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../assets/css/twoD.css";
import { BiCheck, BiCheckCircle } from "react-icons/bi";
import useFetch from "../hooks/useFetch";
import BASE_URL from "../hooks/baseURL";
import { AuthContext } from "../context/AuthContext";

const TwoDPage = () => {
  const times = [
    // {id: 1, time: '10:30 AM'},
    { id: 2, time: "12:00 PM" },
    // {id: 3, time: '02:30 PM'},
    { id: 4, time: "04:30 PM" },
  ];

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { data: user } = useFetch(BASE_URL + "/user");

  const lottoHome = [
    { id: 1, title: "မှတ်တမ်း", img: list, link: "/2d/history" },
    { id: 2, title: "ကံထူးရှင်များ", img: winner, link: "/2d/winners" },
    { id: 3, title: "ပိတ်ရက်", img: holiday, link: "/2d/holiday" },
  ];
  const numbers = [
    { time: "11:00:00", set: "1398.33", value: "1209.91", twoD: "91" },
    { time: "11:00:00", set: "1398.33", value: "1209.91", twoD: "91" },
  ];

  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) {
      navigate("/login");
    }
  }, [auth, navigate]);

  const { data: modern } = useFetch(BASE_URL + "/2d/user/modern-digit");
  const { data: internet } = useFetch(BASE_URL + "/2d/user/internet-digit");

  console.log(internet);

  return (
    <div className="p-2">
      <UserWallet user={user} />
      <div className="lottoHomeContainer p-2 my-4 d-flex align-items-center justify-content-between ">
        {lottoHome.map((item) => {
          return (
            <NavLink to={item.link} key={item.id}>
              <div className="d-flex flex-column align-items-center">
                <img src={item.img} />
                <small>{item.title}</small>
              </div>
            </NavLink>
          );
        })}
      </div>
      <div className="mb-3  mx-3 text-center py-2  ">
        <h1 className="text-white fw-bold mb-4">26</h1>
        <div className="d-flex justify-content-center align-items-center gap-1">
          <BiCheckCircle />
          <small style={{ fontSize: "11px" }}>
            Updated: 18/12/2023 - 04:30:00 PM
          </small>
        </div>
        <small style={{ fontSize: "11px" }} className="text-light">
          11:50:00 AM တွင် ထီပိတ်ပါမည်။
        </small>
        <div className="mt-3  rounded-5 p-2 bg-pink">
          {numbers.map((number, index) => {
            return (
              <div key={index} className="border-bottom pb-2">
                <small className="fw-bold mb-1">{number.time}</small>
                <div className="row">
                  <div className="col-4 fw-bold">Set</div>
                  <div className="col-4 fw-bold">Value</div>
                  <div className="col-4 fw-bold">2D</div>
                </div>
                <div className="row">
                  <div className="col-4 fw-bold">{number.set}</div>
                  <div className="col-4 fw-bold">{number.value}</div>
                  <div className="col-4 fw-bold">{number.twoD}</div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="my-3 mb-5 rounded-5 bg-pink text-white px-4 py-3">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <div></div>
              <small className="fw-bold">9:00 AM</small>
            </div>
            <div>
              <div>မော်ဒန်</div>
              <div>{modern?.modern_morningData?.modern_digit ?? "-"}</div>
            </div>
            <div>
              <div>အင်တာနက်</div>
              <div>{internet?.morningData?.internet_digit ?? "-"}</div>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <div></div>
              <small className="fw-bold">2:00 PM</small>
            </div>
            <div>
              <div>မော်ဒန်</div>
              <div>{modern?.modern_eveningData?.modern_digit}</div>
            </div>
            <div>
              <div>အင်တာနက်</div>
              <div>{internet?.eveningData?.internet_digit}</div>
            </div>
          </div>
        </div>
        <button
          onClick={handleShow}
          className="border twoDBetBtn bg-pink mt-2 py-2 px-4 rounded-3 text-white fw-bold"
        >
          ထိုးမည်
        </button>
      </div>
      <Modal className="modal" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <small className="fw-bold">ထိုးမည့်အချိန် ရွေးပါ။</small>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {times.map((time, index) => {
            return (
              <NavLink to={`/2d/bet?session=${time.id}`} key={index}>
                <button
                  onClick={handleClose}
                  className="timeBtn py-2 text-white mb-3 rounded"
                  key={index}
                >
                  {time.time}
                </button>
              </NavLink>
            );
          })}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default TwoDPage;
