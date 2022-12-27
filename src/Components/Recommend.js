import React, { useState,useEffect } from "react";
import "../App.css";
import { Link } from 'react-router-dom';
import bgimg from '../Components/assets/images/play-bg.gif'



const Recommend = ({ children ,setMusicTracks,setTrackIndex, isPlay,audiofunction, selectStyle, setSelectStyle}) => {
    const text = children;
    const [recommend, setRecommend] = React.useState([]);
    const [isReadMore, setIsReadMore] = useState(true);
    const [visible ,setVisible]=useState(3);
    const[superData, setSuperData]= useState()
    

const toggleReadMore = () => {
	setIsReadMore(!isReadMore);
    if(visible===3){
        setVisible(6);  
    }
    else{
        setVisible(3);
    }
};   

useEffect(() => {
    const url = 'https://khatuwaleshyam.com:3100/trending';
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        const parsedData = json.map((item) => {
          return { src: item.song, name: item.track, id: item._id };
        });
      
        setSuperData(parsedData)
        setRecommend(json);
      })
      .catch((error) => console.log(error));
  }, []);
  const ChangeCurrentSong = (index) => {
    setTrackIndex(index);
    setMusicTracks(superData);
    setSelectStyle(index);
    audiofunction();
  };


return (
	<div className="conatiner-fluid">
	<h2>
		
        <div className="slider  ulhover">
        {' '}
       
         <div className='slider1'>
           <div className="heading-area">
              <div className="rightheading-area">
              <h2 className='slider-heading'> Recommends</h2>
              </div>
              <div className="leftheading-area">
                <h5 className='see-head'><p className="text">
	    <span onClick={toggleReadMore} className="read-or-hide">
		{isReadMore ? "see all" : " see less"}
	    </span>
	</p></h5>
                </div>
           </div>
         </div>    
         <div className='about-slider1 recommend tophead'>
            {recommend.slice(0, visible).map((song ,index)=>(
 <div className="row1"  onClick={() => ChangeCurrentSong(index)}>
    <div className="row-area" >
         <div className="row-image">
           <Link to='/'>   <img src={selectStyle=== index && isPlay === true ? bgimg: song.image}  className="roimg"></img></Link>
         </div>
        <div className="row-content">
          <p className="recommend-song">{song.track}</p>
          <p className="recommend-artist">{song.artist}</p>
      </div>
    </div>
    <div className="row-time">
        <p  className="ro-duration">{song.duration}</p>
        </div>
</div>
            ))}
             
    
         </div>
      </div>
	
	</h2>
	</div>
);
};

export default Recommend;
