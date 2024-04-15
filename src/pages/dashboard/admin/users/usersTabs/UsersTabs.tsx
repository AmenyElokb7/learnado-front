import { SyntheticEvent, useState } from 'react'
import { Tab, Tabs } from '@mui/material'
import { UserTabSteps } from './UsersTabs.constants'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

function UsersTabs() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [value, setValue] = useState(0)

  const handleChange = (_: SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Tabs value={value} onChange={handleChange}>
      {UserTabSteps.map((tab, index) => (
        <Tab
          value={tab.value}
          key={index}
          label={t(tab.label)}
          onClick={() => navigate(tab.path)}
        />
      ))}
    </Tabs>
  )
}

export default UsersTabs
