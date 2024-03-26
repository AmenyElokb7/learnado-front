import React, { useState } from 'react'
import { Avatar, Menu, MenuItem } from '@mui/material'
import TranslateIcon from '@mui/icons-material/Translate'
import { useTranslation } from 'react-i18next'
import CustomIconButton from '../customIconButton/CustomIconButton'
import flagEN from 'assets/logo/languages/us.png'
import flagFR from 'assets/logo/languages/fr.png'

const LanguageSwitcher = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { i18n } = useTranslation()

  const handleClick = (event?: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event?.currentTarget || null)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSelect = (lang: string) => {
    console.log(`Changing language to: ${lang}`)
    i18n.changeLanguage(lang)
    handleClose()
  }
  const { t } = useTranslation()

  return (
    <div>
      <CustomIconButton color="primary" onClick={handleClick}>
        <TranslateIcon />
      </CustomIconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={() => handleSelect('en')}>
          <Avatar
            src={flagEN}
            alt="English"
            variant="square"
            sx={{ width: '30px', height: '20px', mr: '10px' }}
          />
          {t('English')}
        </MenuItem>
        <MenuItem onClick={() => handleSelect('fr')}>
          <Avatar
            src={flagFR}
            alt="Français"
            variant="square"
            sx={{ width: '30px', height: '20px', mr: '10px' }}
          />
          {t('French')}
        </MenuItem>
      </Menu>
    </div>
  )
}

export default LanguageSwitcher
