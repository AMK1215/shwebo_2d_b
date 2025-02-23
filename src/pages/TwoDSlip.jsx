import React from 'react'
import useFetch from '../hooks/useFetch'
import BASE_URL from '../hooks/baseURL'

export default function TwoDSlip({slip, show}) {
  const {data} = useFetch(BASE_URL + '/2d/user-2d-slip/' + slip);

  const slips = data?.records;
  // console.log(slips);

  return (
    <div>
      <button className="btn btn-sm btn-outline-light mb-4" onClick={show}>
        <i className="fas fa-arrow-left"></i>
      </button>
      {slips && slips.map((slip, index) => (
        <div key={index} className='card py-3 px-2 bg-transparent text-white border border-1 mb-3 rounded-3'>
          <div className="d-flex justify-content-around align-items-center">
            <div className='mb-2 text-center'>
              <span className='d-block mb-2'>ထိုးဂဏန်း</span>
              <span>
                {slip.bet_digit}
              </span>
            </div>
            <div className='mb-2 text-center'>
              <span className='d-block mb-2'>ထိုးကြေး</span>
              <span>
                {slip.sub_amount} ကျပ်
              </span>
            </div>
            <div className='mb-2 text-center'>
              <span className='d-block mb-2'>နိုင်/ရှုံး</span>
              {slip.prize_sent == 1 && slip.win_lose == 1 ? (
                <span className='text-success'>နိုင်</span>
              ) : ""}
              {slip.prize_sent == 0 && slip.win_lose == 1 ? (
                <span className='text-danger'>ရှုံး</span>
              ) : ""}
              {slip.prize_sent == 0 && slip.win_lose == 0 ? (
                <span className='text-warning'>စောင့်ဆိုင်း</span>
              ) : ""}
              <span>
                
              </span>
            </div>
          </div>
          
        </div>
      ))}
    </div>
  )
}
