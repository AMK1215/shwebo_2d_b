import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import wave from '../assets/img/wave.png';
import kbz from '../assets/img/kbz.png'
import useFetch from '../hooks/useFetch';
import BASE_URL from '../hooks/baseURL';
import SmallSpinner from '../components/Loader/SmallSpinner';
import { ToastContainer, toast } from 'react-toastify';

const WithDrawConfirmPage = () => {
  const [eye, setEye] = useState(false);
  const [name, setName] = useState('');
  const [account, setAccount] = useState('');
  const [amount, setAmount] = useState(0);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [error, setError] = useState('');
  const [data, setData] = useState('');
  const navigate = useNavigate();
  
  const [searchParams]=useSearchParams();
  let id = searchParams.get('bank');
    const {data:banks} = useFetch(BASE_URL + "/payment-type");

    const bank = banks.find(bank => bank.id == id);

    const withdraw = (e) =>{
      e.preventDefault();
      setLoading(true);
      let inputData = {
            "payment_type_id" : id, 
            "account_name" : name,
            "account_no" : account,
            "password" : password,
      }
      fetch(BASE_URL + '/user-payment-create', {
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
              toast.error("လျို့ဝှက်နံပါတ်ကိုက်ညီမှုမရှိ၍ထပ်မံကြိုးစားပေးပါ။", {
                position: "top-right",
                autoClose: 1000,
                theme: 'dark',
              });
            }else{
            }
            throw new Error('Withdraw Failed');
          }
          return response.json();
        })
        .then(data => {
          setData(data);
          setLoading(false);
          setErrMsg("");
          setError("");
          toast.success("ငွေလက်ခံမည့်အကောင့်ထည့်ပြီးပါပြီ။", {
            position: "top-right",
            autoClose: 2000,
            theme: 'dark',
            hideProgressBar: false,
            closeOnClick: true
        })
        setTimeout(() => {
            navigate("/with-draw");
        }, 2000);
        })
        .catch(error => {
        });
    }

  return (
    <div className='py-3 px-2 px-sm-3'>
      <ToastContainer />
      <h6 className='mb-4 text-center'><i className="fas fa-money-bill text-danger me-1" style={{ fontSize: '23px'}}></i> ငွေဖြည့်မည်</h6>
      <form onSubmit={withdraw}>
        <div className=" mt-3 mb-4">
          <small className='fw-bold '>ငွေလက်ခံမည့် အကောင့်အမည်</small>
          <input 
          className='form-control mt-2 bg-transparent border-0 border-bottom text-white'  
          placeholder='အမည်ထည့်ပါ' 
          onChange={e => setName(e.target.value)}
          value={name}
          />
          {error.account_name && <span className='text-danger'>*{error.account_name}</span>}
        </div>
        <div className=" mt-3 mb-4">
          <small className='fw-bold '>ငွေလက်ခံမည့် အကောင့်ဖုန်းနံပါတ် </small>
          <input 
          className='form-control mt-2 bg-transparent border-0 border-bottom text-white'     
          onChange={e => setAccount(e.target.value)}
          value={account}
          />
          {error.account_no && <span className='text-danger'>*{error.account_no}</span>}
        </div>
        <div className=" mt-3 mb-4">
          <small className='fw-bold '>လျို့ဝှက်နံပါတ်</small>
            <div className='password'>
              <input type={`${eye ? 'text' : 'password'}`} 
              className='form-control mt-2 bg-transparent border-0 border-bottom text-white input' 
              placeholder="xxxxxxxx"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              />
              <i className={`fa-regular text-white fa-${eye ? 'eye-slash' : 'eye'} text-color`} onClick={()=>setEye(!eye)}></i>
            </div>
          {error.password && <span className='text-danger'>*{error.password}</span>}
        </div>
        <div className="mx-2 d-flex align-items-center justify-content-between">
          <div>
              <small>အကောင့်အမျိုးအစား</small>
              <small className="fw-bold d-block">{bank?.name}</small>
          </div>
            <img src={bank?.img_url} className='rounded-3' style={{width:'40px',height:"40px"}} />
        </div>
        <button type='submit' className="w-100 btn btn-danger mt-5 py-2 rounded-4">
            {loading && <SmallSpinner />}
            ထည့်မည်
        </button>
      </form>
    </div>
  )
}

export default WithDrawConfirmPage
