import React, { useState } from 'react'
import CustomerInfo from '../components/CustomerInfo'
import { Button, Modal } from 'react-bootstrap';
import wave from '../assets/img/wave.png';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import BASE_URL from '../hooks/baseURL';
import { ToastContainer, toast } from 'react-toastify';
import SmallSpinner from '../components/Loader/SmallSpinner';

const TopUpPage = () => {
    const [searchParams]=useSearchParams();
    let id = searchParams.get('bank');
    const [amount, setAmount] = useState(0);
    const [accountName, setAccountName] = useState("");
    const [accountNo, setAccountNo] = useState("");
    const [refNo, setRefNo] = useState('');
    const [error, setError] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState("");
    const navigate = useNavigate();

    const deposit = (e) => {
      e.preventDefault();
      setLoading(true);
      let inputData = {
        amount : amount,
        account_name : accountName,
        account_no : accountNo,
        refrence_no : refNo,
        bank_id : bank.id,
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
      
            if (response.status === 422) {
              setErrMsg("");
              setError(errorData.errors);
            }else if (response.status === 401) {
              setError("");
              setErrMsg(errorData.message)
            }else{
            }
            throw new Error('Withdraw Failed');
          }
          return response.json();
        })
        .then(data => {
          setData(data);
          // console.log(data);
          setLoading(false);
          setErrMsg("");
          setError("");
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

  return (
    <div className='py-3 px-2'>
      <ToastContainer />
      <div className="d-flex justify-content-around align-items-center mb-4">
        <div className="">
          <img src={bank?.img_url} className='rounded-3 shadow' width={80} alt="" />
        </div>
        <div>
          <h2 className="fw-bold">{bank?.name}</h2>
          <small className='d-block'>{bank?.bank_account_no}</small>
          <small className='d-block'>{bank?.bank_account_name}</small>
        </div>
      </div>
      
      {/* <p className="fw-bold mb-4">အနည်းဆုံး ၁၀၀၀ ကျပ် မှစ၍ စိတ်ကြိုက်ငွေပမာဏ ရိုက်ထည့်ပါ။</p> */}
      {/* <form onSubmit={deposit}> */}
      <div className="mb-3">
        <label htmlFor="amount" className="form-label">ပမာဏ <small>(အနည်းဆုံး ၁၀၀၀ ကျပ် မှစ၍ ဖြည့်နိုင်ပါသည်။)</small></label>
        <input className='form-control' 
        id='amount' 
        placeholder="ပမာဏ" 
        type="number"
        onChange={e => setAmount(e.target.value)}
        value={amount} 
        />
        {error.amount && <span className='text-danger'>{error.amount}</span>}
      </div>
      <div className="mb-3">
        <label htmlFor="account_name" className="form-label">အကောင့်/ဖုန်းနံပါတ် ပိုင်ရှင်နာမည်</label>
        <input type="text" 
        id='account_name' 
        className="form-control" 
        placeholder="အကောင့်/ဖုန်းနံပါတ် ပိုင်ရှင်နာမည်"
        onChange={e => setAccountName(e.target.value)}
        value={accountName} 
        />
        {error.account_name && <span className='text-danger'>{error.account_name}</span>}
      </div>
      <div className="mb-3">
        <label htmlFor="account_name" className="form-label">အကောင့်နံပါတ်/ဖုန်းနံပါတ်</label>
        <input type="text" 
        id='account_name' 
        className="form-control" 
        placeholder="အကောင့်နံပါတ်/ဖုန်းနံပါတ်" 
        onChange={e => setAccountNo(e.target.value)}
        value={accountNo} 
        />
        {error.account_no && <span className='text-danger'>{error.account_no}</span>}
      </div>
      <div className="mb-3">
        <label htmlFor="account_name" className="form-label">ငွေလွှဲနံပါတ် (နောက်ဂဏန်း၆လုံး)</label>
        <input type="text" 
        id='account_name' 
        className="form-control" 
        placeholder="ငွေလွှဲနံပါတ်" 
        onChange={e => setRefNo(e.target.value)}
        value={refNo} 
        />
        {error.refrence_no && <span className='text-danger'>{error.refrence_no}</span>}
      </div>
      <div className="mb-4">
        <button  className="btn btn-danger text-white w-100" onClick={deposit}>
          {loading && <SmallSpinner />}
        ဆက်လုပ်မည်
        </button>
      </div>
      {/* </form> */}
      {/* <CustomerInfo/> */}
    </div>
  )
}

export default TopUpPage
