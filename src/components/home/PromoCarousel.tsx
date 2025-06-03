import React from 'react'
import Carousel from 'react-multi-carousel'
import "react-multi-carousel/lib/styles.css"
import { Box } from '@mui/material'

interface StyledImageInterface {
    name: string;
}
const StyledImage = ({name}: StyledImageInterface) => {
    return (<Box sx={{display: "flex", justifyContent:"center",}}>
                <img src={`/images/homepage/${name}.webp`} width="560px" height="420px"/>
            </Box>)
}
const names: Array<string> = ["bread","cake", "cookie", "eggTart"]
function PromoCarousel() {
  return (
    <Box display={"flex"} flexGrow={1} alignContent={"center"} justifyContent={"center"} marginTop={"10px"}>   
        <Box sx={{width: "1000px"}}>
                <Carousel
    additionalTransfrom={0}
    arrows
    autoPlaySpeed={3000}
    centerMode={false}
    className=""
    containerClass="container"
    dotListClass=""
    draggable
    focusOnSelect={false}
    infinite={true}
    itemClass=""
    keyBoardControl
    minimumTouchDrag={80}
    pauseOnHover
    renderArrowsWhenDisabled={false}
    renderButtonGroupOutside={false}
    renderDotsOutside={false}
    responsive={{
        desktop: {
        breakpoint: {
            max: 3000,
            min: 1024
        },
        items: 1,
        partialVisibilityGutter: 40
        },
        mobile: {
        breakpoint: {
            max: 464,
            min: 0
        },
        items: 1,
        partialVisibilityGutter: 30
        },
        tablet: {
        breakpoint: {
            max: 1024,
            min: 464
        },
        items: 1,
        partialVisibilityGutter: 30
        }
    }}
    rewind={false}
    rewindWithAnimation={false}
    rtl={false}
    shouldResetAutoplay
    showDots={false}
    sliderClass=""
    slidesToSlide={1}
    swipeable
    >
        {names.map((name) => <StyledImage name={name} key={name}/>)}
    </Carousel>
        </Box>
    </Box>

  )
}

export default PromoCarousel