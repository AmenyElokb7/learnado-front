import { TypographyOptions } from '@mui/material/styles/createTypography'
import { FONT } from 'config/constants/fonts.config'

const typography: TypographyOptions = {
  fontFamily: FONT,
  fontWeightRegular: 400,
  fontWeightMedium: 600,
  fontWeightBold: 900,
  h1: {
    fontWeight: 500,
    fontFamily: FONT,
    fontSize: '1.75rem',
    lineHeight: '2rem',
    '&:first-letter': {
      textTransform: 'Uppercase',
    },
  },
  h2: {
    fontWeight: 300,
    fontFamily: FONT,
    fontSize: '1.563rem',
    lineHeight: '2.188rem',
    '&:first-letter': {
      textTransform: 'Uppercase',
    },
  },
  h3: {
    fontWeight: 200,
    fontFamily: FONT,
    fontSize: '1.125rem',
    lineHeight: '1.563rem',
  },
  h4: {
    fontWeight: 100,
    fontFamily: FONT,
    fontSize: '1rem',
    lineHeight: '1.438rem',
  },
  h5: {
    fontSize: '1rem',
    lineHeight: '1.438rem',
    fontFamily: FONT,
    fontWeight: 100,
    textTransform: 'none',
    '&:first-letter': {
      textTransform: 'Uppercase',
    },
  },
  h6: {
    fontWeight: 100,
    fontFamily: FONT,
    fontSize: '1rem',
    lineHeight: '1.563rem',
  },
  body1: {
    fontFamily: FONT,
    fontSize: '0.938rem',
    lineHeight: '1.313rem',
  },
  body2: {
    fontWeight: 400,
    fontFamily: FONT,
    fontSize: '0.813rem',
    lineHeight: '1.25rem',
  },
  subtitle1: {
    fontFamily: FONT,
    fontSize: '0.938rem',
    '&:first-letter': {
      textTransform: 'Uppercase',
    },
  },
  subtitle2: {
    fontWeight: 300,
    fontFamily: FONT,
    fontSize: '0.9rem',
    lineHeight: '1.25rem',
  },
  button: {
    fontSize: '1rem',
    lineHeight: '1.438rem',
    fontFamily: FONT,
    fontWeight: 400,
    textTransform: 'none',
    '&:first-letter': {
      textTransform: 'Uppercase',
    },
  },
}

export default typography
