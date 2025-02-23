import React, { useContext, useEffect, useState } from 'react'
import AccountInfo from '../components/AccountInfo'
import profile from '../assets/img/profile.png'
import trophy from '../assets/img/trophy.png'
import profileWinner from '../assets/img/profileWinner.png'
import number from '../assets/img/number.png'
import calendar from '../assets/img/calendar.png'
import profileHoliday from '../assets/img/profileHoliday.png'
import live from '../assets/img/live.png'
import globe from '../assets/img/globe.png'
import { Link, useNavigate } from 'react-router-dom'
import BASE_URL from '../hooks/baseURL'
import useFetch from '../hooks/useFetch'
import SmallSpinner from "../components/Loader/SmallSpinner";
import { AuthContext } from '../context/AuthContext'

const ProfilePage = () => {
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
      if (!auth) {
        navigate('/login');
      }
    }, [auth, navigate]);

    const {data:user} = useFetch(BASE_URL + "/user");
    const [loader, setLoader] = useState(false);

    const logout = async (e) => {
        e.preventDefault();
        setLoader(true);
        localStorage.removeItem('token');
        window.location.href = "/login";
        try {
            const response = await fetch(`${BASE_URL}/logout`, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
            });
            if (response.ok) {
                // console.log("Logout success!");
                setLoader(false);
                window.location.href = "/login";
            } else {
                console.error("Logout failed:", response.statusText);
            }
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };
    

    const profileLinks1=[
        {img:profile,name:'ကိုယ်ရေးအချက်အလက် (Profile)',link:'/profile'},
        {img:trophy,name:'အမှတ် ၀ ကျပ်',link:'/'},
    ];
    
    const profileLinks2=[
        {img:profileWinner,name:'2D ကံထူးရှင်များ',link:'/2d/winners'},
          {img:profileWinner,name:'3D ကံထူးရှင်များ',link:'/3d/winners'},
        {img:number,name:'2D ထွက်ဂဏာန်းများ',link:'/2d/results'},
        {img:number,name:'3D ထွက်ဂဏာန်းများ',link:'/3d/results'},
        {img:live,name:'2D Live',link:'/2d/live'},
         {img:live,name:'3D Live',link:'/3d/live'},
      ]
  return (
    <div className='pb-5'>
      <AccountInfo user={user}/>
      <div className="py-2">
        <div style={{background:'#2C315D'}} className='py-3 px-2 d-flex align-items-center justify-content-between'>
        <p>အကောင့်ဖွင့်ထားသောဖုန်းနံပါတ်</p>
        <p style={{color:'#FF1267'}}>{user?.phone}</p>
        </div>
        <div style={{background:'#2C315D'}} className='mt-3 p-2'>
            <p style={{color:'#FF1267'}} >Account</p>
           <div className="mt-2">
           {profileLinks1.map((item,index)=>{
                return <div key={index} >
                <Link to={item.link}>
                <div className="d-flex mb-3 align-items-center gap-2">
                    <img src={item.img} style={{width:'25px',height:'25px',objectFit:'contain'}} />
                    <p>{item.name}</p>
                </div>
                </Link>
            </div>
            })}
           </div>
            
        </div>
        <div style={{background:'#2C315D'}} className='mt-3 p-2'>
            <p style={{color:'#FF1267'}} >Other information</p>
           <div className="mt-2">
           {profileLinks2.map((item,index)=>{
                return <div key={index} >
                <Link to={item.link}>
                    <div className="d-flex mb-3 align-items-center gap-2">
                        <img src={item.img} style={{width:'25px',height:'25px',objectFit:'contain'}} />
                        <p>{item.name}</p>
                    </div>
                </Link>
            </div>
            })}
           </div>
           {/* <div   >
                <Link to={'/'}>
                <div className="d-flex mb-3 align-items-center gap-2">
                    <img src={calendar} style={{width:'18px',height:'18px',objectFit:'contain'}} />
                <p>2D Calendar</p>
                </div>
                </Link>
            </div> */}
            <div>
                <Link to={'/2d/holiday'}>
                    <div className="d-flex mb-3 align-items-center gap-2">
                        <img src={profileHoliday} style={{width:'18px',height:'18px',objectFit:'contain'}} />
                        <p>2D Holiday</p>
                    </div>
                </Link>
            </div>
            <div>
                <Link to={'/'}>
                    <div className="d-flex mb-3 align-items-center gap-2">
                        <img src={globe} style={{width:'18px',height:'18px',objectFit:'contain'}} />
                        <p>App Version</p>
                    </div>
                </Link>
            </div>
            <div>
                <span style={{ cursor: 'pointer'}} onClick={logout}>
                    <div className="d-flex mb-3 ms-1 align-items-center gap-2">
                        {loader ? <SmallSpinner /> : <i className="fas fa-right-from-bracket"></i>}
                        <p>Log Out</p>
                    </div>
                </span>
            </div>
           
           
            
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
