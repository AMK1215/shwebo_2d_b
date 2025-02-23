import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { BiPlusCircle } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import BASE_URL from "../hooks/baseURL";
import SmallSpinner from "../components/Loader/SmallSpinner";
import { ToastContainer, toast } from "react-toastify";
import WithdrawModal from "./WithdrawModal";

const WithDrawPage = () => {
  const { data: banks } = useFetch(BASE_URL + "/payment-type");
  const { data: user_bank } = useFetch(BASE_URL + "/user-payment");
  const [withdraw, setWithdraw] = useState(false);
  const [amount, setAmount] = useState(0);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // console.log(user_bank);

  const handlePassword = (password) => {
    setPassword(password);
  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleWithdraw = (e) => {
    e.preventDefault();
    setLoading(true);
    // console.log(amount);
    if(amount < 1000){
      setLoading(false);
      toast.error("၁၀၀၀ကျပ် အနည်းဆုံး ထည့်ပေးပါ။", {
            position: "top-right",
            autoClose: 2000,
            theme: 'dark',
            hideProgressBar: false,
            closeOnClick: true
      });
      return;
    }else{
      let inputData = {
        amount: amount,
        user_payment_id: user_bank?.id,
        password: password
      }
      // console.log(inputData);
      // return;
      fetch(BASE_URL + '/transaction/withdraw', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(inputData)
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
            if (response.status === 401) {
              toast.error(errorData.message, {
                  position: "top-right",
                  autoClose: 2000,
                  theme: 'dark',
                  hideProgressBar: false,
                  closeOnClick: true
              })
            }else{

            }
            throw new Error('Withdraw Failed');
          }
          return response.json();
        })
        .then(data => {
          setLoading(false);
          toast.success("ငွေထုတ်လွှာ ပို့ပြီးပါပြီ။", {
            position: "top-right",
            autoClose: 1000,
            theme: 'dark',
            hideProgressBar: false,
            closeOnClick: true
        })
        setTimeout(() => {
            navigate("/wallet-history");
        }, 2000);
        })
        .catch(error => {
        });
    }
  }

  return (
    <>
    <ToastContainer />
      {!user_bank && (
        <div className="py-3 px-2 px-sm-3">
          <p className="text-center mt-4">ငွေလက်ခံမည့် အကောင့်များမရှိသေးပါ။</p>
          <button
            onClick={handleShow}
            className="mt-4 bg-pink py-2 text-white rounded-3"
            style={{ width: "100%" }}
          >
            <div className="p-2 rounded-5 d-inline">
              {" "}
              <BiPlusCircle />
            </div>
            အကောင့်အသစ်ထည့်ရန် နှိပ်ပါ
          </button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>
                <small className="fw-bold" style={{ fontSize: "15px" }}>
                  ငွေလက်ခံမည့် အကောင့်တစ်ခုကိုရွေးပါ
                </small>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {banks.map((item, index) => {
                return (
                  <Link
                    key={index}
                    to={"/with-draw/confirm?bank=" + item.id}
                    className="my-2 d-block"
                  >
                    {" "}
                    <div className="cursor-pointer pb-2 d-flex align-items-center gap-3">
                      <img
                        src={item.img_url}
                        style={{ width: "40px", height: "40px" }}
                      />
                      <p className="fw-bold">{item.name}</p>
                    </div>
                  </Link>
                );
              })}
            </Modal.Body>
          </Modal>
        </div>
      )}
      {user_bank && !withdraw && (
        <>
        <Link onClick={() => setWithdraw(true)} className="container py-4 d-block">
          <h6 className="mb-4">ငွေထုတ်ရန်အကောင့်ကိုနှိပ်ပါ။</h6>
          <div className="card p-2 rounded-4 shadow-lg">
            <div className="d-flex align-items-center gap-3">
              <div>
                <img
                  src={user_bank?.payment_type?.img_url}
                  width={50}
                  className="img-fluid rounded-3"
                />
              </div>
              <div>
                <h6 className="fw-bold">{user_bank?.account_name}</h6>
                <span>{user_bank?.account_no}</span>
              </div>
            </div>
          </div>
          <span className="text-center mt-3 d-block">
            ငွေလက်ခံ အကောင့်ပြောင်းလဲလိုလျှင် အကောင့်ဖွင့်ထားသော
            ဖုန်းနံပါတ်ဖြင့် Admin များထံ ဆက်သွယ်ပါ။
          </span>
        </Link>
        </>

      )}
      {user_bank && withdraw && (
        <div className="container py-4">
          <marquee behavior="" direction="" className="pb-3">
            အနည်းဆုံး ၁၀၀၀ကျပ် မှစ၍ မိမိအကောင့်ထဲတွင်ရှိသော ငွေပမာဏအားလုံးကို ထုတ်ယူနိုင်ပါသည်။
          </marquee>
          <h6 className="mb-4">ငွေထုတ်မည့်ပမာဏထည့်ပါ။</h6>
            <input type="number" 
            className="form-control bg-transparent border-0 border-bottom text-white" 
            placeholder="ပမာဏ"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            />
            <small className="text-secondary">၁၀၀၀ကျပ် အနည်းဆုံး</small>

            <WithdrawModal amount={amount} handleWithdraw={handleWithdraw} handlePassword={handlePassword} loading={loading} />
        </div>
      )}
    </>
  );
};

export default WithDrawPage;
