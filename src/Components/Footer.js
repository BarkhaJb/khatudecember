


import React ,{useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom'
import { useLocation } from 'react-router-dom';


const Footer = ({ setCurrentArtist , setTrackIndex, setMusicIndex, releaseSong, setSelectStyle}) => {
    const[category,setCategory]=useState([]);
    const [playlist, setPlaylist] = React.useState([]);
    const[artist,setArtist]=useState([]);

    const [famesongs, setFameSongs] = useState([])
 
    const navigate = useNavigate();


    const { pathname } = useLocation();
   

    useEffect(() => {
        const url = 'https://khatuwaleshyam.com:3100/category/songs';
        fetch(url)
          .then((response) => response.json())
          .then((json) => setCategory(json))
          .catch((error) => console.log(error));
      }, []);
      useEffect(() => {
        const url = 'https://khatuwaleshyam.com:3100/playlist';
        fetch(url)
          .then((response) => response.json())
          .then((json) => setPlaylist(json))
          .catch((error) => console.log(error));
      }, []);
      useEffect(() => {
        const url = 'https://khatuwaleshyam.com:3100/artist';
        fetch(url)
          .then((response) => response.json())
          .then((json) => setArtist(json))
          .catch((error) => console.log(error));
      }, []);

      useEffect(() => {
        const url = 'https://khatuwaleshyam.com:3100/playlist/songs/633c3487cca1438524d18e91';
        fetch(url)
          .then((response) => response.json())
          .then((json) => setFameSongs(json))
          .catch((error) => console.log(error));
      }, []);



      const navigateToTopArtist = (user) => {
        // console.log('USER THIS', user);
        setCurrentArtist(user);
        navigate('/Top-Artist');
        setSelectStyle(null);
      };
      const MoveToPlaylist = (user) => {
        // console.log(' THIS user', user);
        setCurrentArtist(user);
        navigate('/TopPlaylist');
        setSelectStyle(null);
      };

      const navigateTojmbliss = () => {
        window.open('https://jmbliss.com');
      }

      const navigateliveInsta=()=>{
        window.open('https://www.instagram.com/khatuwaleshyam.108/')
      }

      const navigateliveFacebook=()=>{
          window.open('https://www.facebook.com/profile.php?id=100083786253213');
      }

      const navigateliveYoutube=()=>{
        window.open('https://www.youtube.com/channel/UCvAOOOVHy_1AArOBRTdyFyw');
      }
     
      const navigatelivetwitter=()=>{
        window.open('https://twitter.com/home');
      }

      const CategorySelect = (user) => {
        // console.log('ths is user', user);
        setCurrentArtist(user);
        navigate('/category');
        setSelectStyle(null);
      };

      const navigateToNewRelease = (user) => {

        
        navigate('/newReleases');
      };

      useEffect(() => {
        window.scrollTo(0, 0);
      }, [pathname]);
  
  return (
 <div className="footer" >
<div className='container-fluid first-foo-para'>
        <div className='top-footer-para'>
            <h2>Haare Ka Sahara Baba Shyam Hamara</h2>
            <div className='para'>
            <p>Kathin rah bhi saral ho jayegi mushkilen
sari hal ho jayegi ek bar aaja tu sharan
shyam ke zindagi teri safal ho jayegi,
Jay shree Shyam.
</p></div>
        </div>
        </div>
    <div className='container-fluid'>
        <div className='container'>
        <div className='footer-awsfnts'>
          <div className='connectus'><p>Connect with us</p></div>
           <div className='footer-awsfnts-area'>
        <Link to='' className='anchor-foo'><button className='foot-btn-icon face' onClick={navigateliveFacebook}> <i className="fa fa-facebook" aria-hidden="true"></i></button></Link>
        <Link to='' className='anchor-foo'><button className='foot-btn-icon insta' onClick={navigateliveInsta}><i className="fa fa-instagram" aria-hidden="true"></i></button></Link>
        <Link to='' className='anchor-foo'><button className='foot-btn-icon twitter' onClick={navigatelivetwitter}><i className="fa fa-twitter" aria-hidden="true"></i></button></Link>
        <Link to='' className='anchor-foo'> <button className='foot-btn-icon youtube'  onClick={ navigateliveYoutube}><i className="fa fa-youtube-play" aria-hidden="true"></i></button></Link>
           </div>
        </div>
        <div className='footer-para'>
            <ul  className='about-para'>
                <li className='about-para2 right-border'>Advertise on Khatuwaleshyam.com </li>
                <li className='about-para2 right-border'>Terms of Use</li>
                <li className='about-para2 right-border'>Privacy Policy </li>
                <li className='about-para2 right-border'>Partners</li>
                <li className='about-para2 right-border'>Sitemap </li>
                <li className='about-para2'>FAQ </li>
                </ul>
        </div>
 <div className='footer-content'>
  <div className='twocoloum'>
    <div className='footer-album'>
       <div className='footer-menu1'>
      <div className='album-area'>
        <h4 className='foo-heading'>album</h4>
        <div className="menu1-content">
            <ul className='album-list'>
                {category.map((user)=>(
                <li className='album-item bullet anchor-foo' onClick={() => CategorySelect(user)} >{user.title}</li>
               
                ))}
                 </ul>
        </div>
        </div>
       </div>
    </div>
    <div className='footer-genres'>
     <div className='footer-menu2'>
        <div className='genres-area'>
        <h4 className='foo-heading'>genres</h4>
        <div className='menu2-content'>
            <ul className='genres-list'>
              {playlist.slice(0,5).map((user) => (
               <li className='genres-item bullet anchor-foo'  onClick={() => MoveToPlaylist(user)}>{user.title}</li>
               
            ))}
            </ul>
        </div>
        </div>
     </div>
    </div>  
    </div>
    <div className='twocoloum'>
    <div className='footer-artist'>
     <div className='footer-menu3'>
        <h4 className='foo-heading'>artist</h4>
        <div className='menu3-content'>
              
            <ul className='artist-list'>
                {artist.slice(0,5).map((user)=>(
                    <li className='artist-item bullet anchor-foo'   onClick={() =>navigateToTopArtist(user)}>{user.artist} </li>
            
                ))}
            </ul>
               
        </div>
      
     </div>
    </div>
    <div className='footer-release'>
        <div className='footer-menu4'>
            <h4 className='foo-heading'>New Releases By Artist</h4>
            <div className='menu4-content'>
                <ul className='release-list'>
                    {artist.slice(-5).map((song) => (

                 
                <li className='artist-item bullet anchor-foo' onClick={() =>navigateToTopArtist(song)} >{song.artist}</li>
                ))}
            </ul> 
            </div>
        </div>

    </div> 
    </div>    
 </div>
 </div>
 <div className='bottom-footer'>
    <p className='bottom-footer-para' onClick={navigateTojmbliss}> © 2022 Jmbliss IT Solutions</p>
 </div>
 </div>
</div> 

  );
};
export default Footer;
