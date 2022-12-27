import React,{useState, useEffect}  from "react";
import 'react-multi-carousel/lib/styles.css';
import Carousel from 'react-multi-carousel';
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import  eventright  from '../Components/assets/images/eventright 2.png';
import Recommend from '../Components/Recommend';
 

const Home = ({
  releaseSong,
  setCurrentArtist,
  setTrackIndex,
  setMusicTracks,
  selectStyle,
 setSelectStyle,
 isPlay,
 audiofunction

}) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5,
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3,
        },
         desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3,
        },
        tablet: {
          breakpoint: { max: 992, min: 464 },
          items: 2,
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
        },
      };
      
      const responsiveTwo = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5,
        },
        desktop: {
          breakpoint: { max: 3000, min: 1025 },
          items: 6,
        },
        tablet: {
          breakpoint: { max: 1024, min: 992 },
          items: 5,
        },
        tablet: {
          breakpoint: { max: 991, min: 464 },
          items: 2,
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 2,
        },
      };
      
      const [trendingSong, setTrendingSong] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [category, setCategory] = React.useState([]);
  const [playlist, setPlaylist] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  
  


  useEffect(() => {

    if (data.length !== 0) {
      setIsLoading(false);
    }
    const url = 'https://khatuwaleshyam.com:3100/artist';
    fetch(url)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.log(error));
  }, [data]);

 


  useEffect(() => {
    if (category.length !== 0) {
      setIsLoading(false);
    }
    const url = 'https://khatuwaleshyam.com:3100/category/songs';
    fetch(url)
      .then((response) => response.json())
      .then((json) => setCategory(json))
      .catch((error) => console.log(error));
  }, []);

  
  useEffect(() => {
    if (playlist.length !== 0) {
      setIsLoading(false);
    }
    const url = 'https://khatuwaleshyam.com:3100/playlist';
    fetch(url)
      .then((response) => response.json())
      .then((json) => setPlaylist(json))
      .catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    if (trendingSong.length !== 0) {
      setIsLoading(false);
    }
    const url = 'https://khatuwaleshyam.com:3100/trending';
    fetch(url)
      .then((response) => response.json())
      .then((json) => setTrendingSong(json))
      .catch((error) => console.log(error));
  }, []);
  const navigate = useNavigate();
  const SongSelect = (index) => {
    navigate('/Trending');
    setTrackIndex(index);
    setSelectStyle(index)
    // console.log('ths is user');
  };
  const navigateToTopArtist = (user) => {
    // console.log('USER THIS', user);
    setCurrentArtist(user);
    navigate('/Top-Artist');
    setSelectStyle(null);
  };


  const CategorySelect = (user) => {
    // console.log('ths is user', user);
    setCurrentArtist(user);
    navigate('/category');
    setSelectStyle(null)
  };
  const navigateToNewRelease = (index) => {
    setSelectStyle(index)
    setTrackIndex(index)
    navigate('/newReleases');
  };
  const MoveToPlaylist = (user) => {
    // console.log(' THIS user', user);
    setCurrentArtist(user);
    navigate('/TopPlaylist');
    setSelectStyle(null);
  };
 

    return(
<div className="container-fluid">
      <div className="home ulhover">
     
         <div className='ft-bnr'>
        {' '}

        {isLoading ? (
          <div className="loader"></div>
        ) : (
        <Carousel
          responsive={responsive}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={3000}
        >
        {category.map((user) => (
          <div className='slick-slide'>
            <li className='blocks-gallery-item wdt'>
              <figure>
              <Link to='/Category'>   <img src={user.image} className='slider-top-img'    onClick={() => CategorySelect(user)}></img></Link>
              </figure>
              <figcaption></figcaption>
            </li>
          </div>
        ))}
         
        </Carousel>
        )}
        </div>
      </div>
      <Recommend setMusicTracks={setMusicTracks} audiofunction={audiofunction}
      setTrackIndex={ setTrackIndex} isPlay={isPlay} selectStyle={selectStyle} setSelectStyle={setSelectStyle}/>

      <div className="slider  ulhover">
        {' '}
       
         <div className='slider1'>
           <h2 className='slider-heading'>Trending Bhajans</h2>
         </div>    
         <div className='about-slider1 trnding-area'>
             <Carousel responsive={responsiveTwo} infinite={true} >
             {trendingSong.map((user, index)=>(
              <div className='slick-slide' onClick={()=>SongSelect(index)}>
                 <li className='blocks-gallery-item trnd-hv'>
                     <img  className='slider-img trnding-img'
                     src={user.image}  ></img>
                     <div className="playyiconhome"> <Link to='/Trending' > <i class="fa fa-play-circle-o" aria-hidden="true"></i></Link> </div>
                 </li>
              <div className="songname">
                 <p className="artsong">{user.track}</p>
                 <p className="artname">{user.artist}</p>
              </div>
               </div>
                ))}
              </Carousel>
         </div>
      </div>
      <div className="slider  ulhover">
          <div className='slider1'>
              <h2 className='slider-heading'>Top Playlist</h2>
         </div>    
         <div className='about-slider1 superhit'>
               <Carousel className="superhit" responsive={responsiveTwo} infinite={true}>
              {playlist.map((user) => (
               <div className='slick-slide'>
               <li className='blocks-gallery-item trnd-hv'>
      
                    <img  className='slider-img superhit-img'
                    src={user.image}   onClick={() => MoveToPlaylist(user)} ></img>
                    <div className="playyiconhome"><i class="fa fa-play-circle-o" aria-hidden="true" onClick={() => MoveToPlaylist(user)}></i></div>
               </li>
            <div className="songname">
          </div>
          </div>
            ))}
            </Carousel>
             </div>
      </div>
      <div className="slider  ulhover">
          <div className='slider1'>
              <h2 className='slider-heading'>Top Searched Artists</h2>
          </div>    
          <div className='about-slider1 Searched'>
          {isLoading ? (
            <div className="loader"></div>
          ) : (
                <Carousel responsive={responsiveTwo} infinite={true}>
                    {data.map((user) => (
                     <div className='slick-slide'  onClick={() => {
                      navigateToTopArtist(user);
                       }}>
                     <li className='blocks-gallery-item trnd-hv'>
                        <img  className='slider-img searchimg'
                        src={user.image}  ></img>
                        <div className="playyiconhome"><i class="fa fa-play-circle-o" aria-hidden="true"></i></div>
              
                     </li>
           
                   <div className="songname searchpara">
                      <p>{user.artist}</p>
                   </div> 
          </div>         
             ))}

              </Carousel>
          )}
      </div>
      <div className="slider  ulhover">
         <div className='slider1'>
        <h2 className='slider-heading'>New Releases</h2>
          </div>    
          <div className='about-slider1 release-area'>
        <Carousel responsive={responsiveTwo} infinite={true} >
        {releaseSong.map((user, index) => (
          <div className='slick-slide' onClick={() => navigateToNewRelease(index)}>
            <li className='blocks-gallery-item trnd-hv'>
            
                 <img  className='slider-img Releaseimg  '
                  src={user.image}   ></img>
                    <div className="playyiconhome"><i class="fa fa-play-circle-o" aria-hidden="true" onClick={() => navigateToNewRelease(index)}></i></div>
      
    
             
            </li>
            <div className="songname">
            <p className="artsong">{user.track}</p>
            <p className="artname">{user.artist}</p>
          </div>
          </div>
        ))}
        
        </Carousel>
          </div>
       </div>
      </div>
    <div   className='upcomingEvents' >
     <div  className="upcomingarea" >
           <div className="event-left">
                     <div className='eventhead'>
                            <h2>upcoming Events</h2>
                     </div>
                     <div className="about-event">
                      <h3>Khatushyam Bhajan Sandhya</h3>
                     </div>
                     <div className="concert">
                      
                        <div className="area1">
                            <div  className="area-content"><Link to='' className='eventlink'> <button className='eventbtn'><i class="fa fa-map-marker areaicon" aria-hidden="true"></i></button></Link>
                               <p>Indore</p></div>
                           <div  className="area-content"> <Link to='' className='eventlink'> <button className='eventbtn'><i class="fa fa-calendar areaicon" aria-hidden="true"></i></button></Link><p>06 oct..</p></div>
                            <div className="area-content"><Link to='' className='eventlink'> <button className='eventbtn'><i class="fa fa-clock-o areaicon" aria-hidden="true"></i></button></Link><p>06:00 pm</p></div>
                        </div>
                        <div className="area1">
                            <div  className="area-content"><Link to='' className='eventlink'> <button className='eventbtn'><i class="fa fa-map-marker areaicon" aria-hidden="true"></i></button></Link>
                               <p>Indore</p></div>
                           <div  className="area-content"> <Link to='' className='eventlink'> <button className='eventbtn'><i class="fa fa-calendar areaicon" aria-hidden="true"></i></button></Link><p>06 oct..</p></div>
                            <div className="area-content"><Link to='' className='eventlink'> <button className='eventbtn'><i class="fa fa-clock-o areaicon" aria-hidden="true"></i></button></Link><p>06:00 pm</p></div>
                        </div>
                        <div className="area1 thirdrow">
                            <div  className="area-content"><Link to='' className='eventlink'> <button className='eventbtn'><i class="fa fa-map-marker areaicon" aria-hidden="true"></i></button></Link>
                               <p>Indore</p></div>
                           <div  className="area-content"> <Link to='' className='eventlink'> <button className='eventbtn'><i class="fa fa-calendar areaicon" aria-hidden="true"></i></button></Link><p>06 oct..</p></div>
                            <div className="area-content"><Link to='' className='eventlink'> <button className='eventbtn'><i class="fa fa-clock-o areaicon" aria-hidden="true"></i></button></Link><p>06:00 pm</p></div>
                        </div>
                        <div className="area1 thirdrow">
                            <div  className="area-content"><Link to='' className='eventlink'> <button className='eventbtn'><i class="fa fa-map-marker areaicon" aria-hidden="true"></i></button></Link>
                               <p>Indore</p></div>
                           <div  className="area-content"> <Link to='' className='eventlink'> <button className='eventbtn'><i class="fa fa-calendar areaicon" aria-hidden="true"></i></button></Link><p>06 oct..</p></div>
                            <div className="area-content"><Link to='' className='eventlink'> <button className='eventbtn'><i class="fa fa-clock-o areaicon" aria-hidden="true"></i></button></Link><p>06:00 pm</p></div>
                        </div>
                     </div> 
           </div>
           <div className="event-right">
               <div className="eventimg"> <img src={eventright}  className="eventimgsize"/></div>
           </div>
        </div>
    </div>         
</div>
           
    
    )
}

export default Home;