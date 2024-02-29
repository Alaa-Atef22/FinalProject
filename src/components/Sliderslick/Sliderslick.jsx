
import Slider from "react-slick";
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useRef } from "react";
export default function Sliderslick() {
  const[categorytList,setCategory]= useState([])
 async function getCategory(){
  let {data} =await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  // console.log(data.data);
  setCategory(data.data);
  }
  useEffect(()=>{
    getCategory()
  },[])
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
    const { className,  onClick } = props;
    return (
      <div
        className={className}
        style={{  display: "none"}}
        onClick={onClick}
      />
    );
  }
  let sliderRef = useRef(null);
  const next = () => {
    sliderRef.slickNext();
  };
  const previous = () => {
    sliderRef.slickPrev();
  };
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow:6,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow/>,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };


  
  return (
    <div className="p-0">
      <div className="col-md-12" >
      <Slider
        ref={slider => {
          sliderRef = slider;
        }}
        {...settings}
      >
        {categorytList.map((category,i)=>{
return <><img  className='w-100'src={category.image} alt='category'height={250}  key={i}/>
<h5 className="fw-bold text-center text-muted pt-3">{category.name}</h5></>
        })
        }
       </Slider>
       
       <div style={{ textAlign: "center" } }className=" ">
        <button className="btn bg-main rounded-4 me-3 mt-4" onClick={previous}>
          
        </button>
        <button className="btn bg-main rounded-4 mt-4" onClick={next}>
        
        </button>
      </div>
       
       
       </div>
    </div>
  )
}


