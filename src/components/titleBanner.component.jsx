import { forwardRef } from 'react';
import '../App.css'

import Header from '../assets/Header/Header.png';

// eslint-disable-next-line react/display-name
const TitleHeader = forwardRef(
  (
  {
    Title
  },
  ref

  ) => {

  return (
    
    <>
      <image src={Header}/>
    </>
  )
  }
);

export default TitleHeader
