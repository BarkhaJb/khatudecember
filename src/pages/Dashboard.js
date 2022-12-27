import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Dashnav from '../Components/Dashnav';
import album from '../Components/assets/images/Album.svg';
import playlist from '../Components/assets/images/playlist.svg';
import trending from '../Components/assets/images/trending.svg';
import releases from '../Components/assets/images/realeases.svg';
import recommend from '../Components/assets/images/recommend.svg';
import Artist from '../Components/assets/images/Artist.svg';
import radio from '../Components/assets/images/radio.svg';
import upcoming from '../Components/assets/images/Upcoming.svg';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div className='dashboardsec'>
      <div className='cardsec'>
        <Card style={{ width: '17rem' }}>
          <Card.Body>
            <Card.Title>add albums</Card.Title>
            <Card.Text>
              <img className='cardimg' src={album} />
            </Card.Text>
            <Button
              onClick={() => navigate('/albums')}
              variant='primary'
              className='cardbtn'
            >
              Explore
            </Button>
          </Card.Body>
        </Card>
        <Card style={{ width: '17rem' }}>
          <Card.Body>
            <Card.Title>add recommends</Card.Title>
            <Card.Text>
              <img className='cardimg' src={recommend} />
            </Card.Text>
            <Button
              onClick={() => navigate('/dashrecommend')}
              variant='primary'
              className='cardbtn'
            >
              {' '}
              Explore
            </Button>
          </Card.Body>
        </Card>
        <Card style={{ width: '17rem' }}>
          <Card.Body>
            <Card.Title>add trending bhajans</Card.Title>
            <Card.Text>
              <img className='cardimg' src={trending} />
            </Card.Text>
            <Button
              onClick={() => navigate('/dashtrend')}
              variant='primary'
              className='cardbtn'
            >
              Explore
            </Button>
          </Card.Body>
        </Card>
        <Card style={{ width: '17rem' }}>
          <Card.Body>
            <Card.Title>add top playlist</Card.Title>
            <Card.Text>
              <img className='cardimg' src={playlist} />
            </Card.Text>
            <Button
              onClick={() => navigate('/dashtoplist')}
              variant='primary'
              className='cardbtn'
            >
              Explore
            </Button>
          </Card.Body>
        </Card>
        <Card style={{ width: '17rem' }}>
          <Card.Body>
            <Card.Title>add artists</Card.Title>
            <Card.Text>
              <img className='cardimg' src={Artist} />
            </Card.Text>
            <Button
              onClick={() => navigate('/dashartist')}
              variant='primary'
              className='cardbtn'
            >
              Explore
            </Button>
          </Card.Body>
        </Card>

        <Card style={{ width: '17rem' }}>
          <Card.Body>
            <Card.Title>add new releases</Card.Title>
            <Card.Text>
              <img className='cardimg' src={releases} />
            </Card.Text>
            <Button
              onClick={() => navigate('/dashnewrelease')}
              variant='primary'
              className='cardbtn'
            >
              Explore
            </Button>
          </Card.Body>
        </Card>
        <Card style={{ width: '17rem' }}>
          <Card.Body>
            <Card.Title>add upcoming events</Card.Title>
            <Card.Text>
              <img className='cardimg' src={upcoming} />
            </Card.Text>
            <Button
              variant='primary'
              className='cardbtn'
              onClick={() => navigate('/dashupcoming')}
            >
              Explore
            </Button>
          </Card.Body>
        </Card>
        <Card style={{ width: '17rem' }}>
          {/* <Card.Img variant="top" src={cardimg} className="cardimg" /> */}
          <Card.Body>
            <Card.Title>add all bhajans</Card.Title>
            <Card.Text>
              <img className='cardimg' src={radio} />
            </Card.Text>
            <Button
              onClick={() => navigate('/dashallbhajan')}
              variant='primary'
              className='cardbtn'
            >
              Explore
            </Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
