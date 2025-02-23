import React from 'react'
import wave from '../assets/img/wave.png'
import waveInfo from '../assets/img/waveInfo.png'
const TopUpConfirmPage = () => {
  return (
    <div className='py-3 px-2 pb-5 mb-5'>
      <p className="fw-bold mb-4">ဖော်ပြပါ အကောင့်ကိုသာ ငွေလွှဲပေးပါ။ အခြားအကောင့်များသည် မိမိ၏ငွေဖြည့်သွင်းခြင်းကို နှောင့်နှေးစေနိုင်ပါသည်။</p>
      <div className="bg-pink d-flex align-items-center justify-content-between text-white rounded-3 p-2">
    <div className="d-flex gap-1">
    <img src={wave} className='rounded-3' style={{width:'60px',height:'60px'}} />
    <div>
    <p className="fw-bold ">Wave Pay</p>
        <small className="fw-bold  d-block">U Aung Tun</small>
        <small className="fw-bold">0912345689</small>
    </div>
    </div>
    <button className='py-2 fw-bold px-4 text-center rounded-3 ' style={{height:'max-content'}}>Copy</button>
      </div>
      <div className=" mt-3 mb-4">
        <small className='fw-bold '>လုပ်ငန်းစဉ်နံပါတ် နောက်ဆုံး ၄ လုံး</small>
        <input className='rounded-2 mt-2 py-1 px-2'  style={{outline:'none',border:'none',width:'100%',fontSize:'13px'}}  placeholder='လုပ်ငန်းစဉ်နံပါတ် နောက်ဆုံး ၄ လုံး' />
       </div>
       <p className="fw-bold mb-3">အထက်ဖော်ပြပါ Wave Pay နံပါတ် သို့ငွေလွှဲထားသော လုပ်ငန်းစဉ်နံပါတ် နောက်ဆုံး ၄ လုံးကိုထည့်ပါ။ </p>
       <img src={waveInfo} className='img-fluid' style={{width:'100%',height:'120px',objectFit:'cover'}} />
       <button    style={{width:'100%'}} className="mt-4 py-2 px-3 rounded-3 bg-pink text-center fw-bold text-white">
       အတည်ပြုပါ
        </button>
    </div>
  )
}

export default TopUpConfirmPage
