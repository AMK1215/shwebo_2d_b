import React, { useState } from 'react'
import BASE_URL from '../../hooks/baseURL';
import SmallSpinner from '../../components/Loader/SmallSpinner';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

export default function NewPlayerChangePassword({userId, change}) {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState("");
    const [error, setError] = useState("");
    const [errMsg, setErrMsg] = useState("");

    const changePassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        let inputData = {
            "password" : password,
            "password_confirmation" : confirmPassword,
            "user_id" : userId
        }
        fetch(BASE_URL + "/player-change-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept" : "application/json"
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
              throw new Error('Login Failed');
            }
            return response.json();
          })
          .then(data => {
            setData(data);
            setLoading(false);
            if(data.status == "Request was successful."){
                toast.error("Password Changed Successfully", {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                })
                setTimeout(() => {
                    change();
                }, 2000)
            }
          })
          .catch(error => {
          });
    }
    
  return (
    <div className='container'>
        <ToastContainer />
        <div className="text-center pt-5 pb-5">လျို့ဝှက်ကုဒ် ပြောင်းရန်</div>
        <form onSubmit={changePassword}>
            <div className="mb-3">
                <label htmlFor="newPassword" className="form-label">*New Password</label>
                <input type="password" 
                className="form-control" 
                placeholder="xxxxx" 
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                />
                {error.password && <span className="text-danger">*{error.password}</span>}
            </div>
            <div className="mb-4">
                <label htmlFor="newPassword" className="form-label">*Confirm Password</label>
                <input type="password" 
                className="form-control" 
                placeholder="xxxxx" 
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                />
                {error.password_confirmation && <span className="text-danger">*{error.password_confirmation}</span>}
            </div>
            <div className="mb-3">
                <button className="btn btn-outline-light w-100">
                    {loading && <SmallSpinner />}
                    Change
                </button>
            </div>
        </form>
    </div>
  )
}
