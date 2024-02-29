import React from 'react'
import Slider from "react-slick";
import { useRef } from "react";
import imgSlider1 from '../../assets/img/41nN4nvKaAL._AC_SY200_.jpg'
import imgSlider2 from '../../assets/img/61cSNgtEISL._AC_SY200_.jpg'
import imgSlider3 from '../../assets/img/XCM_Manual_1396328_4379574_Egypt_EG_BAU_GW_DC_SL_Jewelry_379x304_1X._SY304_CB650636675_.jpg'
import imgSlider4 from '../../assets/img/XCM_Manual_1533480_5305769_379x304_1X._SY304_CB616236518_.jpg'
import imgSlider5 from '../../assets/img/XCM_Manual_1396328_4379575_Egypt_EG_BAU_GW_DC_SL_Bags_Wallets_379x304_1X._SY304_CB650636675_.jpg'
// import style from './Sliderslick';
export default function Slider2() {
   
  let sliderRef = useRef(null);
  const next = () => {
    sliderRef.slickNext();
  };
  const previous = () => {
    sliderRef.slickPrev();
  };

  function SampleNextArrow(props) {
    const { className, onClick } = props;
    return (
      <div
        className={className}
        style={{display: "none" }}
        onClick={onClick}
      />
    );
  }
  function SamplePrevArrow(props) {
    const { className, onClick } = props;
    return (
      <div
        className={className}
        style={{  display: "none"}}
        onClick={onClick}
      />
    );
  }
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow:1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow/>,
    prevArrow: <SamplePrevArrow />,
  };


  return (
    <div className='row d-flex justify-content-center g-0 mb-5 mt-5 pt-5 '>
        <div className="col-md-3"> <Slider
        ref={slider => {
          sliderRef = slider;
        }}
        {...settings}
      >
        <img  className='w-100'src={imgSlider1} alt='category1'height={350}/>
        <img  className='w-100'src={imgSlider2} alt='category2'height={350}/>
        <img  className='w-100'src={imgSlider3} alt='category3'height={200}/></Slider>

        <div style={{ textAlign: "center" } }className=" ">
        <button className="btn bg-main rounded-4 me-3 mt-3 mb-3" onClick={previous}>
          
        </button>
        <button className="btn bg-main rounded-4 mt-3 mb-3" onClick={next}>
        
        </button>
      </div>
        
        </div>
        <div className="col-md-3">
        <img  className='w-100'src={imgSlider5} alt='category4'height={200}/>
        <img  className='w-100'src={imgSlider4} alt='category5'height={200}/>
        </div>

       
    </div>
  )
}
