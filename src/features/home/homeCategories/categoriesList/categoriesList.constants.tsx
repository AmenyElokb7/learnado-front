import { Stack } from '@mui/material'
import { Settings } from 'react-slick'
import { Category } from 'types/models/Category'

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
      breakpoint: 500,
      settings: {
        slidesToShow: 1,
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

export const Categories: Category[] = [
  {
    id: 1,
    title: 'Angular',
    url: 'https://dreamslms-wp.dreamstechnologies.com/wp-content/uploads/2023/01/categories-icon.png',
    nbrOfLessons: 10,
  },
  {
    id: 2,
    title: 'Bootstrap',
    url: 'https://dreamslms-wp.dreamstechnologies.com/wp-content/uploads/2023/01/categories-icon-04.png',
    nbrOfLessons: 2,
  },
  {
    id: 3,
    title: 'Node',
    url: 'https://dreamslms-wp.dreamstechnologies.com/wp-content/uploads/2023/01/categories-icon-02.png',
    nbrOfLessons: 15,
  },
  {
    id: 4,
    title: 'Docker',
    url: 'https://dreamslms-wp.dreamstechnologies.com/wp-content/uploads/2023/01/categories-icon-01.png',
    nbrOfLessons: 5,
  },
  {
    id: 5,
    title: 'GatsBy',
    url: 'https://dreamslms-wp.dreamstechnologies.com/wp-content/uploads/2023/01/categories-icon-03.png',
    nbrOfLessons: 3,
  },
]
