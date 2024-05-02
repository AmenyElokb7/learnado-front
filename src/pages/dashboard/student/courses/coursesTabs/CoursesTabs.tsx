import { SyntheticEvent, useState } from 'react'
import { Tab, Tabs } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { CourseETabSteps } from './CoursesTabs.constants'
import { SectionTabsRoot } from '@features/courses/addCourse/sectionForm/sectionTabs/SectionTabs.style'

function CoursesTabs() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [value, setValue] = useState(0)

  const handleChange = (_: SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <SectionTabsRoot
      TabIndicatorProps={{ sx: { display: 'none' } }}
      value={value}
      onChange={handleChange}>
      {CourseETabSteps.map((tab, index) => (
        <Tab
          value={tab.value}
          key={index}
          label={t(tab.label)}
          onClick={() => navigate(tab.path)}
        />
      ))}
    </SectionTabsRoot>
  )
}

export default CoursesTabs
