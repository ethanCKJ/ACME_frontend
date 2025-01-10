import React from 'react'
import Carousel from 'react-multi-carousel'
import "react-multi-carousel/lib/styles.css"
import { Box } from '@mui/material'

function PromoCarousel() {
  return (
    <Box display={"flex"} flexGrow={1} alignContent={"center"} justifyContent={"center"}>   
        <Box sx={{width: "800px"}}>
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
    infinite={false}
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
        items: 10,
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
        items: 2,
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
        <img src="/images/homepage/cake.webp" width="280px" height="280px"/>
        <img src="/images/homepage/cake.webp" width="280px" height="280px"/>
        <img src="/images/homepage/cake.webp" width="280px" height="280px"/>
        <img src="/images/homepage/cake.webp" width="280px" height="280px"/>
        <img src="/images/homepage/cake.webp" width="280px" height="280px"/>
        <img src="/images/homepage/cake.webp" width="280px" height="280px"/>
        <img src="/images/homepage/cake.webp" width="280px" height="280px"/>
        <img src="/images/homepage/cake.webp" width="280px" height="280px"/>
        <img src="/images/homepage/cake.webp" width="280px" height="280px"/>
    </Carousel>
        </Box>
    </Box>

  )
}

export default PromoCarousel