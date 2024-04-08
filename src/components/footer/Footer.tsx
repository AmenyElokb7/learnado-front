import {
  Button,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { FooterContainer, RotatingImage } from './Footer.style'
import FooterImage from '@assets/images/footer-image.png'
import { FOOTER_COLUMNS } from './Footer.constants'
import { useTranslation } from 'react-i18next'
import { useEffect, useRef, useState } from 'react'
import { BLUE } from '@config/colors/colors'
import CustomLink from '@components/customLink/CustomLink'
import LabelWithIcon from '@components/labelWithIcon/LabelWithIcon'
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'

function Footer() {
  const [isFooterVisible, setIsFooterVisible] = useState(false)

  const { t } = useTranslation()
  const footerRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFooterVisible(entry.isIntersecting)
      },
      { threshold: 0.1 },
    )

    if (footerRef.current) {
      observer.observe(footerRef.current)
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current)
      }
    }
  }, [])

  return (
    <FooterContainer ref={footerRef} direction="row">
      <RotatingImage
        isfootervisible={
          isFooterVisible
            ? GLOBAL_VARIABLES.TRUE_STRING
            : GLOBAL_VARIABLES.FALSE_STRING
        }
        src={FooterImage}
        alt={GLOBAL_VARIABLES.APP_NAME}
        height="300px"
        width="300px"
      />
      <Stack
        direction={{ sm: 'column', lg: 'row' }}
        spacing={{ sm: 1, lg: 16, md: 1 }}>
        {FOOTER_COLUMNS.map((column) => (
          <Stack key={column.id} spacing={2} pt={6}>
            <Typography variant="h2" color={BLUE.main}>
              {t(column.title)}
            </Typography>
            {column.hasInput && (
              <TextField
                fullWidth
                placeholder={t('footer.enter_email')}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button variant="contained" sx={{ borderRadius: '8px' }}>
                        {t('footer.subscribe')}
                      </Button>
                    </InputAdornment>
                  ),
                }}
              />
            )}
            {column.items.map((item) => (
              <Stack key={item.id}>
                {item.path ? (
                  <CustomLink
                    isActive={item.path === window.location.pathname}
                    label={t(item.title)}
                    key={item.id}
                    to={item.path}
                  />
                ) : (
                  <LabelWithIcon icon={item.icon} label={t(item.title)} />
                )}
              </Stack>
            ))}
          </Stack>
        ))}
      </Stack>
    </FooterContainer>
  )
}

export default Footer
