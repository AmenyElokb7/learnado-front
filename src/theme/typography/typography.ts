import { TypographyOptions } from '@mui/material/styles/createTypography'
import { APP_FONT_FAMILY } from '@config/constants/fonts.config'

const typography: TypographyOptions = {
  fontFamily: APP_FONT_FAMILY,
  fontWeightRegular: 400,
  fontWeightMedium: 600,
  fontWeightBold: 900,
  h1: {
    fontWeight: 500,
    fontFamily: APP_FONT_FAMILY,
    fontSize: '1.75rem',
    lineHeight: '2rem',
    '&:first-letter': {
      textTransform: 'Uppercase',
    },
  },
  h2: {
    fontWeight: 300,
    fontFamily: APP_FONT_FAMILY,
    fontSize: '1.563rem',
    lineHeight: '2.188rem',
    '&:first-letter': {
      textTransform: 'Uppercase',
    },
  },
  h3: {
    fontWeight: 200,
    fontFamily: APP_FONT_FAMILY,
    fontSize: '1.125rem',
    lineHeight: '1.563rem',
  },
  h4: {
    fontWeight: 100,
    fontFamily: APP_FONT_FAMILY,
    fontSize: '1rem',
    lineHeight: '1.438rem',
  },
  h5: {
    fontSize: '1rem',
    lineHeight: '1.438rem',
    fontFamily: APP_FONT_FAMILY,
    fontWeight: 100,
    textTransform: 'none',
    '&:first-letter': {
      textTransform: 'Uppercase',
    },
  },
  h6: {
    fontWeight: 100,
    fontFamily: APP_FONT_FAMILY,
    fontSize: '1rem',
    lineHeight: '1.563rem',
  },
  body1: {
    fontFamily: APP_FONT_FAMILY,
    fontSize: '0.938rem',
    lineHeight: '1.313rem',
  },
  body2: {
    fontWeight: 400,
    fontFamily: APP_FONT_FAMILY,
    fontSize: '0.813rem',
    lineHeight: '1.25rem',
  },
  subtitle1: {
    fontFamily: APP_FONT_FAMILY,
    fontSize: '0.938rem',

    '&:first-letter': {
      textTransform: 'Uppercase',
    },
  },
  subtitle2: {
    fontWeight: 300,
    fontFamily: APP_FONT_FAMILY,
    fontSize: '0.9rem',

    lineHeight: '1.25rem',
  },
  button: {
    fontSize: '1rem',
    lineHeight: '1.438rem',
    fontFamily: APP_FONT_FAMILY,
    fontWeight: 400,
    textTransform: 'none',

    '&:first-letter': {
      textTransform: 'Uppercase',
    },
  },
}

export default typography
