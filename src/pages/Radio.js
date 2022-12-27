import React,{useState, useEffect}  from "react";
import radioimg from '../Components/assets/images/radioimg.png'

const Radio = ({
  
    setMusicTracks,
    audiofunction,
    setPlaylist, isPlaying, setIsPlaying, 
  }) =>{
    const [radio, setRadio] = React.useState([]);
    
    


    useEffect(() => {
      
      const url = `https://khatuwaleshyam.com:3100/songs`;
      fetch(url)
        .then((response) => response.json())
        .then((json) => {
        
          console.log('CONSOLE', json);
          const parsedDataFour = json.map((item) => {
            return { src: item.song, name: item.track, id: item._id };
          });
          console.log('PARSED', parsedDataFour);
          setMusicTracks(parsedDataFour);
          setRadio(json);
        })
  
        .catch((error) => console.log(error));
    }, []);
  
      


  return (
<div className="araeaaaa">
<h6 className='radio-rts-rts'><p className="radio-abtpara">You Are Now Listening to Shri KhatuShyam Non-Stop Radio</p></h6>
      <div className="radio-img">
          <img src={radioimg}  className="radioimg-size"/>
          </div>
          <div className='trndbtn'>
              <button className='footer-btn radiobtn' 
               onClick={() => {
                  const play = audiofunction();
                  if (play) {
                    setIsPlaying(false);
                  } else {
                    setIsPlaying(true);
                  }
                }}>
               {isPlaying === true ? 'Play' : 'Pause'}
              </button>
            </div>
      
</div>

  );
              }


export default Radio;