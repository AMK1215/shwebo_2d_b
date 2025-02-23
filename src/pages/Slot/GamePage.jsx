import React, { useContext, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch';
import BASE_URL from '../../hooks/baseURL';
import { AuthContext } from '../../context/AuthContext';

const GamePage = () => {
    const [searchParams]=useSearchParams();
    let gameType=searchParams.get('type');
    const {data: slots} = useFetch(BASE_URL + '/gameTypeProducts/1');
    const slotGames = slots.products;
    const slotCode = slots.code;
    const {data: casinos} = useFetch(BASE_URL + '/gameTypeProducts/2');
    const casinoGames = casinos.products;
    const casinoCode = casinos.code;
    const {data: sports} = useFetch(BASE_URL + '/gameTypeProducts/3');
    const sportGames = sports.products;
    const sportCode = sports.code;
    const {data: fishes} = useFetch(BASE_URL + '/gameTypeProducts/4');
    const fishGames = fishes.products;
    const fishCode = fishes.code;
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
      if (!auth) {
        navigate('/login');
      }
    }, [auth, navigate]);


    const launchGame = (code, gameId) => (e) => {
      e.preventDefault();
      let gameData = {
        "productId" : gameId,
        "gameType" : code
      }
      fetch(BASE_URL + "/game/Seamless/LaunchGame", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(gameData)
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Launch Game failed");
            }
            console.log("Launch Game success");
            return response.json();
        })
        .then((data) => {
            // console.log(data.data);
            // window.location.href = data.data;
            window.open(data.Url, '_blank');
            // console.log(data);
        })
        .catch((error) => {
            console.error("Launch Game error:", error);
        });
    }

    
  return (
    <div className='px-2 pb-5 mb-5'>
      <h4 className='mt-4 text-center fw-bold'>{gameType.toUpperCase()} GAMES</h4>
      <div className="px-2 my-4 row">
        {gameType == "all" && (
          <>
          <h3 className='mb-3'>Slots</h3>
            {slotGames && slotGames.map((game,index)=>{
              return <a key={index} className='cursor-pointer col-4 p-1 p-sm-2 mb-2 mb-sm-3' onClick={launchGame(slotCode, game.code)}>
                  <img src={game.imgUrl} style={{width:'100%',height:'100%',border:'2px solid #FF1267'}} className='img-fluid gameImg rounded-4' />
              </a>
            })}

          <h3 className='my-4'>Live Casinos</h3>
            {casinoGames && casinoGames.map((game,index)=>{
              return <a key={index} className='cursor-pointer col-4 p-1 p-sm-2 mb-2 mb-sm-3' onClick={launchGame(casinoCode, game.code)}>
                  <img src={game.imgUrl} style={{width:'100%',height:'100%',border:'2px solid #FF1267'}} className='img-fluid gameImg rounded-4' />
              </a>
            })} 
          
          <h3 className='my-4'>Sport Books</h3>
            {sportGames && sportGames.map((game,index)=>{
              return <a key={index} className='cursor-pointer col-4 p-1 p-sm-2 mb-2 mb-sm-3' onClick={launchGame(sportCode, game.code)}>
                  <img src={game.imgUrl} style={{width:'100%',height:'100%',border:'2px solid #FF1267'}} className='img-fluid gameImg rounded-4' />
              </a>
            })} 

          <h3 className='my-4'>Fishing</h3>
            {fishGames && fishGames.map((game,index)=>{
              return <a key={index} className='cursor-pointer col-4 p-1 p-sm-2 mb-2 mb-sm-3' onClick={launchGame(fishCode, game.code)}>
                  <img src={game.imgUrl} style={{width:'100%',height:'100%',border:'2px solid #FF1267'}} className='img-fluid gameImg rounded-4' />
              </a>
            })} 
          </>
        )}
        {gameType == "slots" && (
          <>
            {slotGames && slotGames.map((game,index)=>{
              return <a key={index} className='cursor-pointer col-4 p-1 p-sm-2 mb-2 mb-sm-3' onClick={launchGame(slotCode, game.code)}>
                  <img src={game.imgUrl} style={{width:'100%',height:'100%',border:'2px solid #FF1267'}} className='img-fluid gameImg rounded-4' />
              </a>
            })}
          </>
        )}
        {gameType == "casino" && (
          <>
            {casinoGames && casinoGames.map((game,index)=>{
              return <a key={index} className='cursor-pointer col-4 p-1 p-sm-2 mb-2 mb-sm-3' onClick={launchGame(casinoCode, game.code)}>
                  <img src={game.imgUrl} style={{width:'100%',height:'100%',border:'2px solid #FF1267'}} className='img-fluid gameImg rounded-4' />
              </a>
            })}
          </>
        )}

      {gameType == "sports" && (
          <>
            {sportGames && sportGames.map((game,index)=>{
              return <a key={index} className='cursor-pointer col-4 p-1 p-sm-2 mb-2 mb-sm-3' onClick={launchGame(sportCode, game.code)}>
                  <img src={game.imgUrl} style={{width:'100%',height:'100%',border:'2px solid #FF1267'}} className='img-fluid gameImg rounded-4' />
              </a>
            })}
          </>
        )}

      {gameType == "fishing" && (
          <>
            {fishGames && fishGames.map((game,index)=>{
              return <a key={index} className='cursor-pointer col-4 p-1 p-sm-2 mb-2 mb-sm-3' onClick={launchGame(fishCode, game.code)}>
                  <img src={game.imgUrl} style={{width:'100%',height:'100%',border:'2px solid #FF1267'}} className='img-fluid gameImg rounded-4' />
              </a>
            })}
          </>
        )}

      </div>
    </div>
  )
}

export default GamePage
