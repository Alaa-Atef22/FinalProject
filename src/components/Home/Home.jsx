import React from 'react'
import Product from '../Product/Product'
import Sliderslick from '../Sliderslick/Sliderslick'
import Slider2 from '../Slider2/Slider2'
import style from './Home.module.scss';


export default function Home() {

  return (
    <div className={`row ${style.test} p-0 m-0`}>
      <Slider2/>
  <Sliderslick/>
      <Product/>
    </div>
  )
}
