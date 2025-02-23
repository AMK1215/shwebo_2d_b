import React, { useEffect, useState } from "react";
import UserWallet from "../components/UserWallet";
import { Form } from "react-bootstrap";
import clock from "../assets/img/clock.png";
import "../assets/css/threed.css";
import maze from "../assets/img/maze.png";
import flash from "../assets/img/flash.png";
import repeat from "../assets/img/repeat.png";
import dream from "../assets/img/dream.png";
import { Link, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import BASE_URL from "../hooks/baseURL";
import { ToastContainer, toast } from "react-toastify";
import ThreeDAMyanChoosePage from "./ThreeDAMyanChoose";

const ThreeDBetPage = () => {
  const { data: user } = useFetch(BASE_URL + "/user");
  const [amount, setAmount] = useState(100);
  const [inputs, setInputs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [digit, setDigit] = useState("");
  const [digits, setDigits] = useState([]);
  const navigate = useNavigate();

  const [quickSelect, setQuickSelect] = useState(false);
  const [kwat, setKwat] = useState([]);

  const handleKwat = () => {
    
  }

  const handleQuick = () => setQuickSelect(!quickSelect);

  const chooseNumber = (e) => {
    e.preventDefault();
    if (digit.length === 3) {
      if (!digits.includes(digit)) {
        setDigits([...digits, digit]);
      } else {
        toast.error("နံပါတ် ထပ်နေပါသည်။", {
          position: "top-right",
          theme: "dark",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
        });
      }
    } else {
      toast.error("ဂဏန်းသုံးလုံး ပြည့်အောင် ရေးပေးပါ။", {
        position: "top-right",
        theme: "dark",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
      });
    }
    setDigit("");
  };

  const addNumber = (num) => {
    if(!digits.includes(num)){
      setDigits([...digits, num]);
    }else{
      toast.error("နံပါတ် ထပ်နေပါသည်။", {
        position: "top-right",
        theme: "dark",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
      });
    }
  };
  console.log(digits);

  const remove = (num) => {
    setDigits(digits.filter((item) => item !== num));
  };

  const removeAll = () => {
    setDigits([]);
  };

  useEffect(() => {
    setInputs(digits.map((item) => ({ num: item, amount: amount })));
  }, [digits]);

  //bet start
  const bet = (e) => {
    e.preventDefault();
    let betData = {
      totalAmount: amount * inputs.length,
      amounts: inputs,
    };
    console.log(betData);
    localStorage.setItem("bets", JSON.stringify(betData));
    navigate("/3d/confirm");
  };
  //bet end
  //   console.log(inputs);

  return (
    <>
      <div className="p-2 p-sm-3 pb-5">
        <ToastContainer />
        {!quickSelect && (
          <>
            <UserWallet user={user} />
            <div className="mt-2 mb-4 px-3 py-3 d-flex align-items-center justify-content-center">
              {/* <div className="text-center">
            <img src={maze} style={{ width: "30px", height: "30px" }} />
            <div>
              <small>အခွေ</small>
            </div>
          </div> */}
              <div className="text-center">
                <Link onClick={() => setQuickSelect(true)}>
                  <img src={flash} style={{ width: "30px", height: "30px" }} />
                  <div>
                    <small>အမြန်ရွေး</small>
                  </div>
                </Link>
              </div>

              {/* <div className="text-center">
            <img src={repeat} style={{ width: "30px", height: "30px" }} />
            <div>
              <small>ပတ်လည်</small>
            </div>
          </div> */}
              {/* <div className="text-center">
            <img src={dream} style={{ width: "30px", height: "30px" }} />
            <div>
              <small>အိပ်မက်</small>
            </div>
          </div> */}
            </div>
            {/* <div className="d-flex align-items-center justify-content-between  mb-2">
            <div className="d-flex align-items-center gap-2">
            <img src={clock} style={{width:'20px',height:'20px'}} />
            <small className='text-center p-0 m-0 mb-1 '>ပိတ်ရန်ကျန်ချိန် <small className="fw-bold">12:01 PM</small></small>
            </div>
            <select name="" id="" className=''>
                {times.map((time)=>{
                    return <option key={time} value={time}>{time}</option>
                })}
             </select>
        </div> */}
            {/* <Form onSubmit={chooseNumber}> */}

            <small className="fw-semibold">လောင်းကြေးထည့်ပါ။</small>
            <Form.Group
              className="mb-3 mt-1"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Control
                className="form-control-sm"
                type="number"
                placeholder="အနည်းဆုံး ၁၀၀ကျပ်"
                onChange={(e) => setAmount(e.target.value)}
                value={amount}
              />
            </Form.Group>
            <small className="fw-semibold">ထိုးဂဏန်းရွေးမည်</small>
            <Form.Group
              className="mb-3 mt-1"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Control
                className="form-control-sm"
                type="number"
                onChange={(e) => setDigit(e.target.value)}
                value={digit}
              />
            </Form.Group>
            <button
              className="chooseBtn3d btn btn-sm text-white"
              onClick={chooseNumber}
            >
              ရွေးမည်{" "}
            </button>
            {/* </Form> */}
            <div className="mt-4 mb-5 container">
              <small className="text-white fw-bold">
                ရွေးချယ်ထားသောဂဏန်းများ -
              </small>
              <div className="mt-2 border rounded-3 p-3 row align-items-center gap-3">
                {digits &&
                  digits.map((number, index) => {
                    return (
                      <div
                        key={index}
                        className="chosenNumber3d fw-semibold py-1 px-2 rounded-3 bg-pink col-2"
                      >
                        {number}
                        <div
                          className="chosenNumberDelBtn bg-pink text-white cursorPointer"
                          onClick={() => remove(number)}
                        >
                          -
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </>
        )}
        {
          quickSelect && (
            <ThreeDAMyanChoosePage quickSelect={handleQuick} addNumber={addNumber} digits={digits} />
          )
        }
      </div>
      <div className="py-2 twoDBetBtns mx-auto d-flex gap-2 justify-content-center">
        <button
          className="chooseNumDelBtn  py-2 px-4 rounded-3"
          onClick={removeAll}
        >
          ဖျက်မည်
        </button>
        <button
          className=" bg-pink text-white py-2 px-4 rounded-3"
          onClick={bet}
        >
          <small>ထိုးမည်</small>
        </button>
      </div>
    </>
  );
};

export default ThreeDBetPage;
