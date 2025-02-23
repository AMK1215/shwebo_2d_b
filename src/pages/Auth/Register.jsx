import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import logo from '../../assets/img/logo.png'
import './auth.css';
import SmallSpinner from '../../components/Loader/SmallSpinner';
import BASE_URL from '../../hooks/baseURL';

export default function Register() {
  const [eye, setEye] = useState(false);
  const [phone , setPhone] = useState('');
  const [name , setName] = useState('');
  // const [refCode , setRefCode] = useState('');
  const [password , setPassword] = useState('');
  // const [confirmPassword , setConfirmPassword] = useState('');
  const [error , setError] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [loading , setLoading] = useState(false);
  const [data, setData] = useState('');
  const navigate = useNavigate();

  const {auth} = useContext(AuthContext);
  useEffect(() => {
    if(auth){
      navigate('/');
    }
  }, [auth, navigate]);

  const register = (e) =>{
    e.preventDefault();
    setLoading(true);
    const registerData = {
        name: name,
        phone: phone,
        password: password,
        // password_confirmation: confirmPassword,
        // referral_code: refCode,
    };
    // console.log(registerData);
    
    fetch(BASE_URL + '/register', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(registerData)
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
            // console.log(errorData.message);
          }else{
          }
          throw new Error('Register Failed');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        setData(data);
        setLoading(false);
        localStorage.setItem('token', data.data.token);
        window.location.href = "/";
      })
      .catch(error => {
      });
  }

  return (
    <div>
      <div className="d-flex justify-content-center pt-0 pt-sm-0  ">
        <Link to={'/'}>
        <img src={logo}  className='logo' alt="" />
        </Link>
      </div>
      <div className='  login bg-pink rounded-top-5 pb-2  '>
        <div className='d-flex justify-content-center pb-0 pt-2  mb-0'>
          <span className='login-title'>ShweBo2D</span>
        </div>
        {/* <small className='text-center d-block text-color mb-1'>welcome to shwebo 2D|3D|Slots</small> */}
        <form className='px-3' onSubmit={register}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label text-color">အမည်</label>
            <input type="text" 
            className="form-control"
            placeholder="အမည်"
            onChange={(e) => setName(e.target.value)}
            value={name}
            />
            {error.name && <span className='text-light'>*{error.name}</span>}
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label text-color">ဖုန်းနံပါတ်</label>
            <div className="d-flex gap-2">
              <select name="" id="" className='form-control form-select w-25'>
                <option value="+95">+95</option>
              </select>
              <input type="number" 
              className='form-control' 
              placeholder="0977777777" 
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              />
            </div>
            {error.phone && <span className='text-light'>*{error.phone}</span>}
            {errMsg && <span className='text-light'>*{errMsg}</span>}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label text-color">လျို့ဝှက်နံပါတ်(၆)လုံး သတ်မှတ်ပေးရန်</label>
            <div className='password'>
              <input type={`${eye ? 'text' : 'password'}`} 
              className='form-control' 
              placeholder="xxxxxxxx"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              />
              <i className={`fa-regular fa-${eye ? 'eye-slash' : 'eye'} text-color`} onClick={()=>setEye(!eye)}></i>
            </div>
            {error.password && <span className='text-light'>*{error.password}</span>}
          </div>
          {/* <div className="mb-3">
            <label htmlFor="password" className="form-label text-color">လျို့ဝှက်နံပါတ် ထပ်မံရေးပါ</label>
            <div className='password'>
              <input type={`${eye ? 'text' : 'password'}`} 
              className='form-control' 
              placeholder="xxxxxxxx"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              />
              <i className={`fa-regular fa-${eye ? 'eye-slash' : 'eye'} text-color`} onClick={()=>setEye(!eye)}></i>
            </div>
            {error.password_confirmation && <span className='text-light'>*{error.password_confirmation}</span>}
          </div> */}
          {/* <div className="mb-3">
            <label htmlFor="refCode" className="form-label text-color">ရည်ညွန်းကုဒ် (မရှိလျှင် ထည့်ရန်မလိုပါ)</label>
            <input type="text" 
            id='refCode'
            className="form-control"
            placeholder="xxxx"
            onChange={(e) => setRefCode(e.target.value)}
            value={refCode}
            />
            {error.referral_code && <span className='text-light'>*{error.referral_code}</span>}
          </div> */}

          <div className="mb-4 ">
            <button className="btn btn-outline-light w-100 rounded-3" type="submit">
              {loading && <SmallSpinner />}
              အကောင့်ဖွင့်မည်
            </button>
          </div>
        </form>
        <p className="text-center pb-4">
          အကောင့်ရှိပြီးပြီလား။ <Link to={'/login'} className='text-white text-decoration-underline'>အကောင့်ဝင်ပါ။</Link>
        </p>
      </div>
    </div>
  )
}
