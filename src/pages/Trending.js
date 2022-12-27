import React, { useState, useEffect } from 'react';
import tr_img1 from '../Components/assets/images/trending1.png';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import bgimg from '../Components/assets/images/play-bg.gif';

const Trend = () => {
  const list = [
    { name: 'rahul' },
    { name: 'sameer' },
    { name: 'sonu' },
    { name: 'pinki' },
    { name: 'basheer' },
  ];

  list.sort((a, b) => (a.qty > b.qty ? 1 : -1));

  console.log(list);
};
export default Trend;
