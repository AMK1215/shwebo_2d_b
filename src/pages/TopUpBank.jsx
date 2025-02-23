import React, { useState } from 'react'
import DepositModal from './DepositModal';
import { ToastContainer, toast } from 'react-toastify';
import useFetch from '../hooks/useFetch';
import BASE_URL from '../hooks/baseURL';
import "../assets/css/userWallet.css";
import { Carousel, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import SmallSpinner from '../components/Loader/SmallSpinner';

const TopUpBankPage = () => {
  const {data: channels} = useFetch(BASE_URL + "/agent-payment-type");
  const [amount, setAmount] = useState(0);
  const [confirm, setConfirm] = useState(false);
  const [id, setId] = useState(null);
  const [refNo, setRefNo] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const channel = channels.find(channel => channel.id == id);

  const handleConfirm = (payment) => {
    setConfirm(!confirm);
    setId(payment);
  }

  const handleCopyText = () => {
    navigator.clipboard.writeText(channel?.account_no);
    toast.success("Copied", {
        position: "top-right",
        autoClose: 1000,
        theme: 'dark',
        hideProgressBar: false,
        closeOnClick: true
    })
  }

  const handleSubmit = () => {
    setLoading(true);
    if(refNo.length > 6){
      toast.error("လုပ်ငန်းစဥ် နံပါတ် ၆လုံးသာ ထည့်ပေးပါရန်။", {
          position: "top-right",
          autoClose: 1000,
          theme: 'dark',
          hideProgressBar: false,
          closeOnClick: true
      })
      setLoading(false);
    }else if(refNo.length == 0){
      toast.error("လုပ်ငန်းစဥ် နံပါတ် ထည့်ပေးပါရန်။", {
          position: "top-right",
          autoClose: 1000,
          theme: 'dark',
          hideProgressBar: false,
          closeOnClick: true 
      });
      setLoading(false);
    }else if(refNo.length < 6){
      toast.error("လုပ်ငန်းစဥ်နံပါတ် ၆လုံးပြည့်အောင်ထည့်ပေးပါရန်။", {
          position: "top-right",
          autoClose: 1000,
          theme: 'dark',
          hideProgressBar: false,
          closeOnClick: true  
      });
      setLoading(false);
    }else if(refNo.length == 6){

      let inputData = {
        user_payment_id : channel?.id,
        amount : Number(amount),
        refrence_no : refNo,
      }
      fetch(BASE_URL + '/transaction/deposit', {
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
      
            // if (response.status === 422) {
            //   setErrMsg("");
            //   setError(errorData.errors);
            // }else if (response.status === 401) {
            //   setError("");
            //   setErrMsg(errorData.message)
            // }else{
            // }
            throw new Error('Withdraw Failed');
          }
          return response.json();
        })
        .then(data => {
          // setData(data);
          // console.log(data);
          setLoading(false);
          // setErrMsg("");
          // setError("");
          toast.success("ငွေသွင်းလွှာ ပို့ပြီးပါပြီ။", {
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
    <div className='p-2'>
      <ToastContainer />
      {!confirm && (
        <>
          <marquee behavior="" direction="" className="py-2">
            အနည်းဆုံး ၁၀၀၀ကျပ် မှစ၍ စိတ်ကြိုက်ငွေပမာဏ ရိုက်ထည့်ပြီး ငွေသွင်းနိုင်ပါသည်။
          </marquee>
          <small className="my-3 fw-bold d-block">ငွေဖြည့်မည့် ပမာဏထည့်ပါ</small>
          <input type="number" 
          className="form-control border-0 border-bottom bg-transparent text-white" 
          placeholder="ပမာဏ" 
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          />

          <div className="mt-5">
            <DepositModal amount={amount} handleConfirm={handleConfirm} channels={channels} />
          </div>
        </>
      )}
      {confirm && (
        <>
        <small className="d-block my-2" style={{ letterSpacing: "1px" }}>
          ဖော်ပြပါ အကောင့်ကိုသာ ငွေလွှဲပေးပါ။ အခြားအကောင့်များသည် မိမိ၏ငွေဖြည့်သွင်းခြင်းကို နှောင့်နှေးစေနိုင်ပါသည်။
        </small>
        <div className='d-flex justify-content-between align-items-center px-3 py-2 bg-danger mt-3 rounded-3'>
          <div className="d-flex align-items-center gap-3">
            <div>
              <img src={channel?.payment_type?.img_url} width={60} alt={channel?.payment_type?.image} />
            </div>
            <div>
              <span className='d-block'>
                {channel?.account_name}
              </span>
              <small>
                {channel?.account_no}
              </small>
            </div>
          </div>
          <div>
            <button className="btn btn-light" onClick={handleCopyText}>
              Copy
            </button>
          </div>
        </div>
        <div className="mt-4">
          <small>
            လုပ်ငန်းစဥ်နံပါတ် (နောက်ဆုံး၆လုံး)
          </small>
          <input type="number" 
          className="form-control mt-3 bg-transparent border-0 border-bottom text-white" 
          value={refNo}
          onChange={(e) => setRefNo(e.target.value)}
          placeholder='လုပ်ငန်းစဥ်နံပါတ်နောက်ဆုံး၆လုံး'
          />
          <small className='d-block mt-3'>
            အထက်ဖော်ပြပါ {channel?.payment_type?.name} နံပါတ်သို့ငွေလွှဲထားသော လုပ်ငန်းစဥ်နံပါတ် နောက်ဆုံး၄လုံးကို ထည့်ပါ။
          </small>
          <Carousel>
            {channel?.payment_type?.payment_images && channel?.payment_type?.payment_images.map((payment_channel, index) => (
                <Carousel.Item key={index}>
                  <img src={payment_channel.img_url} className='homeImg mt-3' />
                </Carousel.Item>
            ))}
          </Carousel>
          <button className="btn btn-danger w-100 rounded-4 mt-3" onClick={() => handleSubmit()}>
          {loading && <SmallSpinner />}
            <small>
              အတည်ပြုမည်
            </small>
          </button>
        </div>
        </>
      )}
    </div>
  )
}

export default TopUpBankPage
