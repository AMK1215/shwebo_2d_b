import React, { useContext, useEffect, useState } from 'react'
import logo from '../../assets/img/logo.png'
import './auth.css';
import BASE_URL from '../../hooks/baseURL';
import SmallSpinner from '../../components/Loader/SmallSpinner';
import { AuthContext } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import NewPlayerChangePassword from './NewPlayerChangePassword';

export default function Login() {
  const [eye, setEye] = useState(false);
  const [phone , setPhone] = useState('');
  const [password , setPassword] = useState('');
  const [error , setError] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success , setSuccess] = useState('');
  const [loading , setLoading] = useState(false);
  const [data, setData] = useState('');
  const navigate = useNavigate();
  const [changePassword, setChangePassword] = useState(false);
  const [userId, setUserId] = useState(0);

  const {auth} = useContext(AuthContext);

  const change = () =>{
    setChangePassword(!changePassword);
  }

  useEffect(() => {
    if(auth){
      navigate('/');
    }
  }, [auth, navigate]);

  const login = (e) =>{
    e.preventDefault();
    setLoading(true);
    const loginData = {
        phone: phone,
        password: password
    };
    // console.log(loginData);
    
    fetch(BASE_URL + '/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
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
          throw new Error('Login Failed');
        }
        return response.json();
      })
      .then(data => {
        setData(data);
        setLoading(false);
        if(data.data.is_changed_password === 0){
          setUserId(data.data.id)
          setPhone("");
          setPassword("");
          change();
        }else{
          if (data.data.token) {
            localStorage.setItem('token', data.data.token);
            window.location.href = "/";
            console.log("success");
          } else {
            throw new Error('Token not found in response');
          }
        }
      })
      .catch(error => {
      });
  }


  return (
    <>
    {!changePassword && (
    <div>
      <div className="d-flex justify-content-center pt-3 pt-sm-0  ">
        <Link to={'/'}>
        <img src={logo}  className='logo' alt="" />
        </Link>
      </div>
      <div className='  login bg-pink rounded-top-5 pb-4  '>
        <div className='d-flex justify-content-center pb-0 pt-5 pt-lg-3 pt-xl-5  mb-0'>
          <span className='text-center'>
            <span className="login-title">
              ShweBo2D
            </span>
            မှ
            <small className="d-block">ကြိုဆိုပါတယ် ခင်မျာ။</small>
          </span>
          
        </div>
        {/* <small className='text-center d-block text-color mb-4'>welcome back we missed you</small> */}
        <form className='px-3' onSubmit={login}>
          <div className="mb-4 mb-lg-3">
            <label htmlFor="phone" className="form-label text-color mb-3">ဖုန်းနံပါတ်</label>
            <div className="d-flex gap-2">
              <select name="" id="" className='form-control form-select w-25'>
                <option value="+95">+95</option>
              </select>
              <input type="number" 
              className='form-control input' 
              placeholder="0977777777" 
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              />
            </div>
            {error.phone && <span className='text-light'>*{error.phone}</span>}
            {errMsg && <span className='text-light'>*{errMsg}</span>}
          </div>
          <div className="mb-5 mb-lg-3">
            <label htmlFor="password" className="form-label text-color mb-3">လျို့ဝှက်နံပါတ်</label>
            <div className='password'>
              <input type={`${eye ? 'text' : 'password'}`} 
              className='form-control input' 
              placeholder="xxxxxxxx"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              />
              <i className={`fa-regular fa-${eye ? 'eye-slash' : 'eye'} text-color`} onClick={()=>setEye(!eye)}></i>
            </div>
            {error.password && <span className='text-light'>*{error.password}</span>}
          </div>

          <div className="mb-4 ">
            <button className="btn btn-outline-light w-100 rounded-3 py-2" type="submit">
              {loading && <SmallSpinner />}
              အကောင့်ဝင်မည်
            </button>
          </div>
        </form>
        <p className="text-center">
          အကောင့်မရှိသေးဘူးလား။ <Link to={'/register'} className='text-white text-decoration-underline'>အကောင့်ဖွင့်ပါ။</Link>
        </p>
      </div>
    </div>
    )}
    {changePassword && (
      <NewPlayerChangePassword userId={userId} change={change} />
    )}
    </>
  )
}
