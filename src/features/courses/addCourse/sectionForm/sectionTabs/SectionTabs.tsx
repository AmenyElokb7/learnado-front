import { AddNewSectionIcon, SectionTabsRoot } from './SectionTabs.style'
import { SectionTabsProps } from './SectionTabs.type'
import { Stack, Tab, Tooltip } from '@mui/material'
import { useTranslation } from 'react-i18next'

function SectionTabs({
  sections,
  activeTab,
  handleChange,
  onAddNewSection,
}: SectionTabsProps) {
  const { t } = useTranslation()
  return (
    <Stack direction={'row'} alignItems={'center'} spacing={3}>
      <SectionTabsRoot
        value={activeTab}
        onChange={handleChange}
        allowScrollButtonsMobile
        variant="scrollable"
        scrollButtons="auto"
        TabIndicatorProps={{ sx: { display: 'none' } }}>
        {sections.map((section, index) => (
          <Tab key={section.id} label={`Module ${index + 1}`} />
        ))}
      </SectionTabsRoot>
      <Tooltip title={t('section.add_section')}>
        <AddNewSectionIcon onClick={onAddNewSection} />
      </Tooltip>
    </Stack>
  )
}

export default SectionTabs
