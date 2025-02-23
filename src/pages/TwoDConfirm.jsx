import React, { useContext, useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { LuDelete } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import dashed from "../assets/img/dashed.png";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Modal, Spinner } from "react-bootstrap";
import BASE_URL from "../hooks/baseURL";
import { AuthContext } from "../context/AuthContext";
import SmallSpinner from "../components/Loader/SmallSpinner";

const TwoDConfirmPage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    // const [errMsg, setErrMsg] = useState("");
    const [data, setData] = useState([]);

    const navigate = useNavigate();
    const { auth } = useContext(AuthContext);
    const bets = JSON.parse(localStorage.getItem("bets"));

    //check auth
    useEffect(() => {
      if (!auth) {
        navigate('/login');
      }
    }, [auth, navigate]);

    //check bets
    if (!bets) {
      useEffect(() => {
        navigate('/');
      }, [bets, navigate])
      return;
    }

    const [total, setTotal] = useState(bets.totalAmount);
    const [betData, setBetData] = useState(bets.amounts);
    const [smShow, setSmShow] = useState(false);
    const [betAmount, setBetAmount] = useState(0);
    const [num, setNum] = useState("");

    //edit code start
    const popUpModal = (num, amount) => {
        setSmShow(true);
        setBetAmount(amount);
        setNum(num);
    }
    const editBet = (num, amount) => {
        if(amount < 100){
            toast.error("ထိုးကြေး အနည်းဆုံး ၁၀၀ ထည့်ပါ။", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })
            return;
        }
        let editData = {
            "num" : num,
            "amount" : Number(amount)
        }
        setBetData((prevState) => {
            const updatedBetData = prevState.map((bet) => {
                if(bet.num === num){
                return editData
                }
                return bet
            });
            setTotal(
                (prevState) =>
                    (prevState - betData.find((amount) => amount.num === num).amount) + Number(amount)
            );

            // console.log(updatedData);
            
            return updatedBetData;
        });

        setSmShow(false);
    }
    const updatedData = {
        "totalAmount" : total,
        "amounts" : betData
    }
    localStorage.setItem("bets", JSON.stringify(updatedData));
    //edit code  end

    //single delete code start
    const deleteBet = (num) => {
        setBetData((prevState) => {
            const updatedBetData = prevState.filter((bet) => bet.num !== num);

            const betToDelete = prevState.find((bet) => bet.num === num);
            const amountToDeduct = betToDelete ? betToDelete.amount : 0;

            setTotal((prevTotal) => prevTotal - amountToDeduct);

            const remainBet = {
                totalAmount: prevState.reduce((total, bet) => total + (bet.num !== num ? bet.amount : 0), 0),
                amounts: updatedBetData
            };
            localStorage.setItem("bets", JSON.stringify(remainBet));
            return updatedBetData;
        });
    };
    //single delete

    //bulk delete start
    const removeAll = () => {
        setBetData([]);
        setTotal(0);
        let bets = {
            totalAmount: 0,
            amounts: [],
        };
        localStorage.setItem("bets", JSON.stringify(bets));
        toast.error("အကုန် ဖျက်ပြီးပါပီ။", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        setTimeout(() => {
        navigate("/2d");
        }, 2000);
    };
    //bulk delete end

    //confirm bet start
    const confirm = (e) => {
      e.preventDefault();
      setLoading(true);
      const confirmBets = {
        totalAmount: total,
        amounts: betData
      };
    
      fetch(BASE_URL + "/2d/two-d-play", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(confirmBets)
      })
        .then(async response => {
          if (!response.ok) {
            setLoading(false);
            let errorData;
            try {
              errorData = await response.json();
            } catch (error) {
              console.error('Error parsing JSON:', error);
            }
            setError(errorData.errors || errorData.message); // Handle both 422 & 401 errors
            toast.error(errorData.errors || errorData.message, {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark"
            })
            return;
          }
          setData(await response.json()); // Get data on success
          console.log(data);
    
          toast.success("အောင်မြင်ပါသည်။", {
            position: "top-right",
            autoClose: 1000,
            theme: 'dark',
            hideProgressBar: false,
            closeOnClick: true
          });
    
          setTimeout(() => {
            navigate("/2d/history");
            localStorage.removeItem("bets");
          }, 2000);
        });
    };
    //confirm bet end

  return (
    <>
      <ToastContainer />
      <div className="p-2 px-sm-3">
        <div
          style={{
            background: "#171f52",
            height: "400px",
            overflowY: "scroll",
          }}
          className="p-3 rounded-3  "
        >
          <p className="fw-bold text-center">ထိုးမည့် ဂဏန်းများ </p>
          <div className="row mt-4 mb-3 mx-auto">
            <div className="col-3">
              <small>စဉ်</small>
            </div>
            <div className="col-3">
              <small>ဂဏန်း</small>
            </div>
            <div className="col-3">
              <small>ပမာဏ</small>
            </div>
            <div className="col-3">
              <small>ပြင်/ဖျက်</small>
            </div>
          </div>
          {betData &&
            betData.map((amount, index) => (
              <div className="row mb-2" key={index}>
                <div className="col-3">
                  <small>{++index}</small>
                </div>
                <div className="col-3">
                  <small>{amount.num}</small>
                </div>
                <div className="col-3">
                  <small>{amount.amount.toLocaleString()}</small>
                </div>
                <div className="col-3">
                  <div className="d-flex align-items-center gap-1">
                    <BiEdit size={25} onClick={() => popUpModal(amount.num, amount.amount)} />
                    <MdDelete
                      color="red"
                      size={25}
                      onClick={() => deleteBet(amount.num)}
                    />
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="mx-auto text-center" style={{ width: "98%" }}>
          <img
            src={dashed}
            style={{ width: "100%", height: "auto", marginTop: "-26px" }}
          />
        </div>
        <div
          className="p-3 rounded-3 mb-5"
          style={{ background: "#171F52", marginTop: "-20px" }}
        >
          <div
            className="p-3 text-center rounded-3"
            style={{ background: "#333c74" }}
          >
            <h5 className="fw-bold">
              {total.toLocaleString()}
              <small style={{ color: "gainsboro" }}>MMK</small>
            </h5>
          </div>
        </div>
      </div>
      <div className="py-2 twoDBetBtns mx-auto d-flex gap-2 justify-content-center">
        <button
          className=" chooseNumDelBtn  py-2 px-4 rounded-3"
          onClick={() => removeAll()}
        >
          ဖျက်မည်
        </button>
        {!loading && (
          <button type="submit" className="bg-pink text-white py-2 px-4 rounded-3" onClick={confirm}>
            <small>
            ထိုးမည်
            </small>
          </button>
        )}
        {loading && <Spinner />}
      </div>

      <Modal
        size="sm"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton className="bg-blue text-white">
          <Modal.Title id="example-modal-sizes-title-sm">
            <small>({num}) ထိုးကြေးပြင်ရန် </small>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-blue text-white">
          <input type="number" 
          className="form-control bg-blue betAmount text-white"
          onChange={e => setBetAmount(e.target.value)}
          value={betAmount}
          />
          <div className="d-flex justify-content-end mt-3">
            <button className="btn btn-sm btn-success" onClick={() => editBet(num, betAmount)}>ပြင်မည်</button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default TwoDConfirmPage;
