import { FieldArrayWithId } from 'react-hook-form'
import { FormValues } from '../module/Module.type'
import { SyntheticEvent } from 'react'

export interface SectionTabsProps {
  activeTab: number
  sections: FieldArrayWithId<FormValues, 'sections', 'id'>[]
  handleChange: (_: SyntheticEvent, newValue: number) => void
  onAddNewSection: () => void
}
