import React, { useCallback, useContext, useEffect, useState } from "react";
import TwoDChooseOption from "../components/TwoDChooseOption";
import UserWallet from "../components/UserWallet";
import { Form, Modal } from "react-bootstrap";
import info from "../assets/img/info.png";
import info2 from "../assets/img/info2.png";
import clock from "../assets/img/clock.png";
import "../assets/css/chooseNumber.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import useFetch from "../hooks/useFetch";
import BASE_URL from "../hooks/baseURL";
import { AuthContext } from "../context/AuthContext";

const TwoDBetPage = () => {
    const { auth } = useContext(AuthContext);
    const [param] = useSearchParams();
    const session = param.get("session");
    const { data: user } = useFetch(BASE_URL + "/user");
    const [amount, setAmount] = useState(100);
    const [inputs, setInputs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
      if (!auth) {
        navigate('/login');
      }
    }, [auth, navigate]);

    const {data: numbers} = useFetch(BASE_URL + "/2d/user/all-2-digit");
    const two_digits = numbers?.two_digits;
    // console.log(numbers);

    //permunated numbers start
    const permunated = () => {
      const permutedInputs = [];
  
      inputs.forEach(input => {
        const originalNum = input.num;
        const reversedNum = originalNum.split('').reverse().join('');
        const amount = input.amount;
  
        permutedInputs.push({ num: originalNum, amount: amount });
        reversedNum !== originalNum && permutedInputs.push({ num: reversedNum, amount: amount });
      });
      setInputs(permutedInputs);
      toast.success('ပတ်လည် ဂဏန်းထည့်ပြီးပါပြီ။', {
      })
    };
    //permunated numbers end

    //pathee start
    const pathee = (id) => {
      let digits = [];
      if (id == 0) {
        digits = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "20", "30", "40", "50", "60", "70", "80", "90"];
      } else if (id == 1) {
        digits = ["01", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "21", "31", "41", "51", "61", "71", "81", "91"];
      } else if (id == 2) {
        digits = ["02", "20", "22", "23", "24", "25", "26", "27", "28", "29", "32", "42", "52", "62", "72", "82", "92"];
      } else if (id == 3) {
        digits = ["03", "30", "33", "34", "35", "36", "37", "38", "39", "43", "53", "63", "73", "83", "93"];
      } else if (id == 4) {
        digits = ["04", "40", "44", "45", "46", "47", "48", "49", "54", "64", "74", "84", "94"];
      } else if (id == 5) {
        digits = ["05", "50", "55", "56", "57", "58", "59", "65", "75", "85", "95"];
      } else if (id == 6) {
        digits = ["06", "60", "66", "67", "68", "69", "76", "86", "96"];
      } else if (id == 7) {
        digits = ["07", "70", "77", "78", "79", "87", "97"];
      } else if (id == 8) {
        digits = ["08", "80", "88", "89", "98", "99"];
      } else if (id == 9) {
        digits = ["09", "90", "99"];
      }

      setInputs(
        digits.map((num) => ({ num, amount: amount }))
      );
    }
    //pathee end

    //ထိပ်စည်း start
    const frontNumber = (id) => {
      let digits = [];
      if(id == 0){
        digits = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09"];
      }else if(id == 1){
        digits = ["10", "11", "12", "13", "14", "15", "16", "17", "18", "19"];
      }else if(id == 2){
        digits = ["20", "21", "22", "23", "24", "25", "26", "27", "28", "29"];
      }else if(id == 3){
        digits = ["30", "31", "32", "33", "34", "35", "36", "37", "38", "39"];
      }else if(id == 4){
        digits = ["40", "41", "42", "43", "44", "45", "46", "47", "48", "49"];
      }else if(id == 5){
        digits = ["50", "51", "52", "53", "54", "55", "56", "57", "58", "59"];
      }else if(id == 6){
        digits = ["60", "61", "62", "63", "64", "65", "66", "67", "68", "69"];
      }else if(id == 7){
        digits = ["70", "71", "72", "73", "74", "75", "76", "77", "78", "79"];
      }else if(id == 8){
        digits = ["80", "81", "82", "83", "84", "85", "86", "87", "88", "89"];
      }else if(id == 9){
        digits = ["90", "91", "92", "93", "94", "95", "96", "97", "98", "99"];
      }
      setInputs(
        digits.map((num) => ({ num, amount: amount }))
      );
    }
    //ထိပ်စည်း end

    //နောက်ပိတ် start
    const backNumber = (id) => {
      let digits = [];
      if (id == 0) {
        digits = ["00", "10", "20", "30", "40", "50", "60", "70", "80", "90"];
      }else if(id == 1){
        digits = ["01", "11", "21", "31", "41", "51", "61", "71", "81", "91"];
      }else if(id == 2){
        digits = ["02", "12", "22", "32", "42", "52", "62", "72", "82", "92"];
      }else if(id == 3){
        digits = ["03", "13", "23", "33", "43", "53", "63", "73", "83", "93"];
      }else if(id == 4){
        digits = ["04", "14", "24", "34", "44", "54", "64", "74", "84", "94"];
      }else if(id == 5){
        digits = ["05", "15", "25", "35", "45", "55", "65", "75", "85", "95"];
      }else if(id == 6){
        digits = ["06", "16", "26", "36", "46", "56", "66", "76", "86", "96"];
      }else if(id == 7){
        digits = ["07", "17", "27", "37", "47", "57", "67", "77", "87", "97"];
      }else if(id == 8){
        digits = ["08", "18", "28", "38", "48", "58", "68", "78", "88", "98"];
      }else if(id == 9){
        digits = ["09", "19", "29", "39", "49", "59", "69", "79", "89", "99"];
      }
      setInputs(
        digits.map((num) => ({ num, amount: amount }))
      );
    }
    //နောက်ပိတ် end

    //power number start
    const powerNumber = (id) => {
      // console.log(id);
      let digits = [];
      if (id == 1) {
        digits = ["07", "18", "24", "35", "69"];
      }else if(id == 2){
        digits = ["07", "18", "24", "35", "69", "70", "81", "42", "53", "96"];
      }else if(id == 3){
        digits = ["05", "16", "27", "38", "49"];
      }else if(id == 4){
        digits = ["05", "16", "27", "38", "49", "50", "61", "72", "83", "94"];
      }else if(id == 5){
        digits = ["07", "19", "23", "48", "56"];
      }else if(id == 6){
        digits = ["07", "19", "23", "48", "56", "70", "91", "32", "84", "65"]; 
      }else if(id == 7){
        digits = ["09", "13", "26", "47", "58"];
      }else if(id == 8){
        digits = ["09", "13", "26", "47", "58", "90", "31", "62", "74", "85"];
      }
      setInputs(
        digits.map((num) => ({ num, amount: amount }))
      );
    }
    //power number end

    // twentyNumbers start
    const twentyNumbers = (id) => {
      let digits = [];
      if(id === 0){
        digits = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19"];
      }else if(id === 1){
        digits = ["20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39"];
      }else if(id === 2){
        digits = ["40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59"];
      }else if(id === 3){
        digits = ["60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79"];
      }else if(id === 4){
        digits = ["80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99"];
      }
      setInputs(
        digits.map((num) => ({ num, amount: amount }))
      );
    }
    // twentyNumbers end

    //break start
    const breakNums = (id) => {
      id === 1 && setInputs([
        { num: "00", amount: amount },
        { num: "19", amount: amount },
        { num: "28", amount: amount },
        { num: "37", amount: amount },
        { num: "46", amount: amount },
        { num: "55", amount: amount },
        { num: "64", amount: amount },
        { num: "73", amount: amount },
        { num: "82", amount: amount },
        { num: "91", amount: amount },
      ]);
      id === 2 && setInputs([
        { num: "01", amount: amount },
        { num: "10", amount: amount },
        { num: "29", amount: amount },
        { num: "38", amount: amount },
        { num: "47", amount: amount },
        { num: "56", amount: amount },
        { num: "65", amount: amount },
        { num: "74", amount: amount },
        { num: "83", amount: amount },
        { num: "92", amount: amount },
      ]);
      id === 3 && setInputs([
        { num: "02", amount: amount },
        { num: "20", amount: amount },
        { num: "39", amount: amount },
        { num: "48", amount: amount },
        { num: "57", amount: amount },
        { num: "66", amount: amount },
        { num: "75", amount: amount },
        { num: "84", amount: amount },
        { num: "93", amount: amount },
      ]);
      id === 4 && setInputs([
        { num: "03", amount: amount },
        { num: "30", amount: amount },
        { num: "49", amount: amount },
        { num: "58", amount: amount },
        { num: "67", amount: amount },
        { num: "76", amount: amount },
        { num: "85", amount: amount },
        { num: "94", amount: amount },
      ]);
      id === 5 && setInputs([
        { num: "04", amount: amount },
        { num: "40", amount: amount },
        { num: "59", amount: amount },
        { num: "68", amount: amount },
        { num: "77", amount: amount },
        { num: "86", amount: amount },
        { num: "95", amount: amount },
      ]);
      id === 6 && setInputs([
        { num: "05", amount: amount },
        { num: "50", amount: amount },
        { num: "69", amount: amount },
        { num: "78", amount: amount },
        { num: "87", amount: amount },
        { num: "96", amount: amount },
      ]);
      id === 7 && setInputs([
        { num: "06", amount: amount },
        { num: "60", amount: amount },
        { num: "79", amount: amount },
        { num: "88", amount: amount },
        { num: "97", amount: amount },
      ]);
      id === 8 && setInputs([
        { num: "07", amount: amount },
        { num: "70", amount: amount },
        { num: "89", amount: amount },
        { num: "98", amount: amount },
      ]);
      id === 9 && setInputs([
        { num: "08", amount: amount },
        { num: "80", amount: amount },
        { num: "99", amount: amount },
      ]);
      id === 10 && setInputs([
        { num: "09", amount: amount },
        { num: "90", amount: amount },
      ]);
    }
    //break end

    //single & double start
    const singleDouble = (id) => {
      //brothers
      id === 1 && setInputs([
        { num: "01", amount: amount },
        { num: "10", amount: amount },
        { num: "12", amount: amount },
        { num: "21", amount: amount },
        { num: "23", amount: amount },
        { num: "32", amount: amount },
        { num: "34", amount: amount },
        { num: "43", amount: amount },
        { num: "45", amount: amount },
        { num: "54", amount: amount },
        { num: "56", amount: amount },
        { num: "65", amount: amount },
        { num: "67", amount: amount },
        { num: "76", amount: amount },
        { num: "78", amount: amount },
        { num: "87", amount: amount },
        { num: "89", amount: amount },
        { num: "98", amount: amount },
      ]);
      //big
      id === 2 && setInputs(
        Array.from({ length: 50 }, (_, i) => ({
          num: (i + 50).toString(),
          amount: amount,
        }))
      );
      //small
      id === 3 && setInputs(
        Array.from({ length: 50 }, (_, i) => {
          const num = 49 - i;
          const numStr = num < 10 ? `0${num}` : `${num}`;
          return { num: numStr, amount: amount };
        })
      );
      //odd numbers
      id === 4 && setInputs(
        Array.from({ length: 100 }, (_, i) => i)
        .filter(number => number % 2 !== 0)
        .map(number => ({
          num: number.toString().padStart(2, '0'),
          amount: amount
        }))

      );
      //even numbers
      id === 5 && setInputs(
        Array.from({ length: 100 }, (_, i) => i)
        .filter(number => number % 2 === 0)
        .map(number => ({
          num: number.toString().padStart(2, '0'),
          amount: amount
        }))
      );
      //even+even
      if(id === 6){
        const evenRepeatedNumbers = [];
        for (let ones = 0; ones <= 8; ones += 2) {
          const number = ones.toString().padStart(2, '0');
          evenRepeatedNumbers.push({
            num: number,
            amount: amount
          });
        }
        for (let tens = 2; tens <= 9; tens += 2) {
          for (let ones = 0; ones <= 9; ones += 2) {
            const number = tens * 10 + ones;
            evenRepeatedNumbers.push({
              num: number.toString().padStart(2, '0'), // Format as two-digit string
              amount: amount
            });
          }
        }
        setInputs(evenRepeatedNumbers);
      }
      //even+odd
      if(id === 7){
        const evenOddNumbers = [];
          for (let tens = 0; tens <= 9; tens += 2) {
            for (let ones = 1; ones <= 9; ones += 2) {
              const number = tens * 10 + ones;
              evenOddNumbers.push({
                num: number.toString().padStart(2, '0'), // Format as two-digit string
                amount: amount
              });
            }
          }
          setInputs(evenOddNumbers);
      }
      //odd+even
      if(id === 8){
        const oddEvenNumbers = [];
        // Including 12, 14, 16, 18, ...
        for (let tens = 1; tens <= 9; tens += 2) {
          for (let ones = 0; ones <= 9; ones += 2) {
            const number = tens * 10 + ones;
            oddEvenNumbers.push({
              num: number.toString().padStart(2, '0'), // Format as two-digit string
              amount: amount
            });
          }
        }
        setInputs(oddEvenNumbers);
      }
      //odd+odd
      if(id === 9){
        const oddRepeatedNumbers = [];
        // Including 11, 13, 15, 17, 19
        for (let ones = 1; ones <= 9; ones += 2) {
          const number = (10 + ones).toString().padStart(2, '0');
          oddRepeatedNumbers.push({
            num: number,
            amount: amount
          });
        }
        for (let tens = 3; tens <= 9; tens += 2) {
          for (let ones = 1; ones <= 9; ones += 2) {
            const number = tens * 10 + ones;
            oddRepeatedNumbers.push({
              num: number.toString().padStart(2, '0'),
              amount: amount
            });
          }
        }
        setInputs(oddRepeatedNumbers);
      }
      id === 10 && setInputs([
        {"num": "00", "amount": amount},
        {"num": "11", "amount": amount},
        {"num": "22", "amount": amount},
        {"num": "33", "amount": amount},
        {"num": "44", "amount": amount},
        {"num": "55", "amount": amount},
        {"num": "66", "amount": amount},
        {"num": "77", "amount": amount},
        {"num": "88", "amount": amount},
        {"num": "99", "amount": amount}
      ]);
    }
    //single & double end

    //percentage
    const percentage = (remain, limit) => {
      return (remain / limit) * 100;
    }
    
    //add number start
    const addNumber = useCallback((num) => {
      setInputs(inputs => {
        const exists = inputs.some(input => input.num === num);
        if (exists) {
          return inputs.filter(input => {
            return input.num !== num
          });
        } else {
          return [...inputs, { num, amount }];
        }
      });
    }, [amount]);

    useEffect(() => {
      setInputs(inputs => inputs.map(input => ({ ...input, amount })));
    }, [amount]);
    //add number end
  
    //all remove number start
    const remove = (e) => {
      e.preventDefault();
      setInputs([]);
    }
    //all remove number end
    
    //bet start
    const bet = (e) => {
        e.preventDefault();
        let betData = {
          totalAmount : amount * inputs.length, 
          amounts : inputs
        }
        // console.log(betData);
        localStorage.setItem("bets", JSON.stringify(betData));
        navigate('/2d/confirm');
    }
    //bet end

    //ui data for time limit
    const times = [
        { id: 1, time: "10:30 AM" },
        { id: 2, time: "12:00 PM" },
        { id: 3, time: "02:30 PM" },
        { id: 4, time: "04:30 PM" },
    ];
    const now = new Date();
    const targetTime = new Date();
    if(session == 1){
        targetTime.setHours(10);  // 10 AM in 24-hour format
        targetTime.setMinutes(30);  // 30 minutes
        targetTime.setSeconds(0);
        targetTime.setMilliseconds(0);
    }else if(session == 2){
        targetTime.setHours(12);  // 12 PM in 24-hour format
        targetTime.setMinutes(0);  // 00 minutes
        targetTime.setSeconds(0);
        targetTime.setMilliseconds(0);
    }else if(session == 3){
        targetTime.setHours(14);  // 14 PM in 24-hour format
        targetTime.setMinutes(30);  // 30 minutes
        targetTime.setSeconds(0);
        targetTime.setMilliseconds(0);
    }else if(session == 4){
        targetTime.setHours(16);  // 4 PM in 24-hour format
        targetTime.setMinutes(30);  // 30 minutes
        targetTime.setSeconds(0);
        targetTime.setMilliseconds(0);
    }
    const diffInMilliseconds = targetTime - now;
    const diffInMinutes = Math.floor(diffInMilliseconds / 1000 / 60);
    const diffHours = Math.floor(diffInMinutes / 60);
    const diffMinutes = diffInMinutes % 60;

    const getActiveBarColor = (percent) => {
        return percent === 100
        ? "#00CD15"
        : percent >= 90
        ? "#FF0000"
        : percent > 50
        ? "#FF7A00"
        : percent < 50 && percent > 0
        ? "#00CD15"
        : "";
    };
    //ui data

    const colorOptions = [
        { id: 1, color: "#00CD15", text: "၅၀% အောက်" },
        { id: 2, color: "#FF7A00", text: "၅၀% မှ ၉၀% ကြား" },
        { id: 3, color: "#FF0000", text: "၉၀% အထက်" },
        { id: 4, color: "#AE9F9E", text: "ထိုးငွေပြည့်သွားပါပြီ" },
    ];
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


  return (
    <>
    <ToastContainer />
      <div className="px-2 pt-2 p-sm-3">
        <UserWallet user={user} />
        <TwoDChooseOption pathee={pathee} frontNumber={frontNumber} backNumber={backNumber} powerNumber={powerNumber} twentyNumbers={twentyNumbers} permunated={permunated} breakGroup={breakNums} singleDouble={singleDouble} />
        <div>
          <div>
            <div className="d-flex align-items-center justify-content-between mb-3">
              <div className="d-flex align-items-center gap-2">
                <div>
                  <small className="text-center p-0 m-0 mb-1 ">
                    ပိတ်ရန်ကျန်ချိန်
                  </small>
                  <br />
                  <small className="fw-bold">
                    {diffInMilliseconds > 0 
                      ? `${diffHours.toString().padStart(2, '0')}:${diffMinutes.toString().padStart(2, '0')} Left` 
                      : "Closed Time!"}
                  </small>
                </div>
              </div>
              <select className="form-control form-select form-select-sm" style={{ width: "150px" }}>
                <option value="">
                    {session == 1 ? times[0].time : ""}
                    {session == 2 ? times[1].time : ""}
                    {session == 3 ? times[2].time : ""}
                    {session == 4 ? times[3].time : ""}
                </option>
              </select>
            </div>

              <small className="fw-semibold">လောင်းကြေးထည့်ပါ။</small>
              <Form.Group
                className="mb-3 mt-1"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control type="number" 
                placeholder="အနည်းဆုံး ၁၀၀ကျပ်" 
                onChange={(e) => setAmount(e.target.value)}
                value={amount}
                />
              </Form.Group>

            <div
              onClick={handleShow}
              className="cursorPointer d-flex align-items-center"
            >
              <img src={info} />
              <small>အရောင်ရှင်းလင်းချက်</small>
            </div>

            <Modal className="lottoModal" show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>
                  <img src={info2} />
                  <small>အရောင်ရှင်းလင်းချက်</small>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <small>ထီထိုးငွေ ၁၀၀% ပြည့်ပါက ဂဏန်းပိတ်ပါမည်။</small>
                <div className="my-3">
                  {colorOptions.map((item) => {
                    return (
                      <div
                        key={item.id}
                        className=" mb-3 d-flex align-items-center gap-2"
                      >
                        <div
                          style={{
                            background: item.color,
                            width: "15px",
                            height: "15px",
                            borderRadius: "100%",
                          }}
                        ></div>
                        <small>{item.text}</small>
                      </div>
                    );
                  })}
                </div>
              </Modal.Body>
            </Modal>
          </div>
          <div className="twoDNumbers py-3 px-2 pb-5">
            <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">

              {two_digits && two_digits.map((item, index) => {
                return (
                  <div
                    className={`cursorPointer rounded-3 text-center numberContainer ${inputs.some(input => input.num === item.two_digit) ? "activeNumber" : ""}`}
                    key={index} onClick={() => addNumber(item.two_digit, amount)}
                  >
                    <p className={`number ${inputs.some(input => input.num === item.two_digit) ? "text-white" : ""}`}>{item.two_digit}</p>
                    <div className="bar">
                      <div
                        className="activeBar"
                        style={{
                          width: percentage(item.over_all_remaining, numbers.default_break) + "%",
                          background: getActiveBarColor(percentage(item.over_all_remaining, numbers.default_break)),
                        }}
                      ></div>
                    </div>
                  </div>
                );
              })}
              {/* {numbers2.map((item, index) => {
                return (
                  <div
                    className="cursorPointer rounded-2 text-center numberContainer"
                    key={index}
                  >
                    <p className="number">{item}</p>
                    <div className="bar">
                      <div
                        className="activeBar"
                        style={{ width: "0%", background: "" }}
                      ></div>
                    </div>
                  </div>
                );
              })} */}
            </div>
          </div>
        </div>
      </div>
      <div className="py-3 twoDBetBtns d-flex gap-2 justify-content-center align-items-center mb-3">
        <div>
            <button className="py-2 px-4 rounded-3" onClick={remove}>
                <small>ဖျက်မည်</small>
            </button>
        </div>
        <div>
            <button className="bg-pink text-white py-2 px-4 rounded-3" type="submit" onClick={bet}>
                <small>ထိုးမည်</small>
            </button>
        </div>
      </div>
    </>
  );
};

export default TwoDBetPage;
