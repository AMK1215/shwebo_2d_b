import React, { useContext, useEffect } from 'react'
import AccountInfo from '../../components/AccountInfo'
import UserWallet from '../../components/UserWallet'
import home from '../../assets/img/home.png';
import all from '../../assets/img/gameIcons/all.png';
import slots from '../../assets/img/gameIcons/slots.png';
import live_casino from '../../assets/img/gameIcons/live_casino.png';
import sport_book from '../../assets/img/gameIcons/sportbook.png';
import fishing from '../../assets/img/gameIcons/fishing.png';
import  '../../assets/css/home.css';
import side1 from '../../assets/img/side1.png'
import side2 from '../../assets/img/side2.png'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import useFetch from "../../hooks/useFetch";
import BASE_URL from '../../hooks/baseURL';
import { Carousel } from 'react-bootstrap';

export default function Home() {
  const {data:user} = useFetch(BASE_URL + "/user");
  const {data: gameTypes} = useFetch(BASE_URL + "/gameType");
  const {data: banners} = useFetch(BASE_URL + "/banner");
  const {data: bannerText} = useFetch(BASE_URL + "/bannerText");
  // console.log(bannerText);

  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!auth) {
      navigate('/login');
    }
  }, [auth, navigate]);

  const categories=[
    {img: all,title:'ဂိမ်းအားလုံး',value:'all'},
    {img: slots,title:'စလော့ဂိမ်း',value:'slots'},
    {img: live_casino,title:'ကာစီနို',value:'casino'},
    {img: sport_book,title:'အားကစား',value:'sports'},
    {img: fishing,title:'ငါးပစ်ဂိမ်း',value:'fishing'},
  ];

  return (
    <div className='home'>
      <AccountInfo user={user} />
     <div className="px-2 py-3 p-sm-3 px-lg-2 mb-5">
     <UserWallet user={user} />
     <div className='homeImgContainer'>
      <Carousel>
        {banners && banners.map((banner, index) => (
            <Carousel.Item key={index}>
              <img src={banner.img_url} className='homeImg mt-3' />
            </Carousel.Item>
        ))}
      </Carousel>
     <marquee className='lottoMarquee py-1'  direction="left">{bannerText?.text}</marquee>
     </div>
    <div className="d-flex justify-content-between betBtns mb-4">
      <div className="  ps-4 py-4  betBtnContainer">
        <NavLink to={'/2d'}>
          <img src={side1}   className='side1btn1' />
          <button style={{width:'80%'}} className='betBtn  text-center py-4 px-2 px-sm-0  fw-bold'>2D ထိုးမည်</button>
          <img src={side2}  className='side2' />
          </NavLink>
        </div>
        <div className="ps-4  py-4    betBtnContainer">
          <NavLink to={'/3d'}>
            <img src={side1}   className='side1' />
            <button style={{width:'80%'}} className='betBtn text-center py-4   fw-bold'>3D ထိုးမည်</button>
            <img src={side2}  className='side2' />
          </NavLink>
        </div>
     </div>

     <div className="row px-3 mb-4">
      {categories.map((item,index)=>{
        return <div className='col-6 mb-3' key={index}>
          <Link to={'/slots/?type='+item.value} className=''>
            <div  className="cursor-pointer d-flex align-items-center justify-content-center gap-1 py-3 categoryItem">
            <img src={item.img} style={{width:'30px',height:'30px'}} />
            <p className="fw-bold categoryTitle">{item.title}</p>
            </div>
          </Link>
        </div>
      })}
        <div className='col-6 mb-3'>
          <Link to={'/slots/gameLogs'} className=''>
            <div  className="cursor-pointer d-flex align-items-center justify-content-center gap-1 py-3 categoryItem">
            <i className="fas fa-gamepad" style={{ color: "gold" }}></i>
            <p className="fw-bold categoryTitle">Game Logs</p>
            </div>
          </Link>
        </div>
     </div>
     </div>
    </div>
  )
}
