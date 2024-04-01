import { Stack } from '@mui/material'
import { Settings } from 'react-slick'

export const SliderSettings: Settings = {
  dots: true,
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 1500,
  speed: 2000,
  cssEase: 'linear',
  responsive: [
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 960,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 1280,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
  ],

  customPaging: () => (
    <Stack
      sx={{
        width: '15px',
        height: '15px',
        borderRadius: '50%',
        marginTop: 7,
        backgroundColor: 'pink',
        transition: 'transform 0.2s ease-in',
        '&:hover': {
          transform: 'scale(1.5)',
          borderRadius: '15px',
        },
      }}
    />
  ),
}
