import { SectionFormProps } from './SectionForm.type'
import { Button, Stack } from '@mui/material'
import { Add } from '@mui/icons-material'
import Module from './module/Module'
import { t } from 'i18next'
import { FormProvider } from 'react-hook-form'
import useSectionForm from './useSectionForm'
import FallbackLoader from '@components/fallback/FallbackLoader'
import { useState } from 'react'
import SectionTabs from './sectionTabs/SectionTabs'

function SectionForm({
  files,
  sectionFormMethods,
  isEditMode,
  isFetching,
  setFiles,
  handleAddSection,
}: SectionFormProps) {
  const {
    fields,
    handleAddAnswer,
    handleAddModule,
    handleAddQuestion,
    handleRemoveAnswer,
    handleRemoveModule,
    handleRemoveQuestion,
    handleAddExternalUrl,
    handleRemoveExternalUrl,
    handleRemoveQuiz,
    onDrop,
  } = useSectionForm({ sectionFormMethods })

  const [activeTab, setActiveTab] = useState(0)

  const handleChangeTab = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
  }

  const addNewSection = () => {
    setActiveTab(fields.length)
    handleAddModule()
  }

  const handleRemoveSection = (index: number) => {
    handleRemoveModule(index)
    setActiveTab(fields.length - 2)
  }

  if (isFetching) {
    return <FallbackLoader />
  }
  return (
    <FormProvider {...sectionFormMethods}>
      {!isEditMode ? (
        <Stack p={2} spacing={3}>
          {fields.map((field, index) => (
            <Module
              field={field}
              sectionFormMethods={sectionFormMethods}
              files={files}
              canDelete={fields.length > 1}
              key={field.id}
              index={index}
              isEditMode={isEditMode}
              onDrop={onDrop}
              setFiles={setFiles}
              handleAddQuestion={handleAddQuestion}
              handleRemoveQuestion={handleRemoveQuestion}
              handleAddAnswer={handleAddAnswer}
              handleRemoveAnswer={handleRemoveAnswer}
              handleRemoveModule={handleRemoveModule}
              handleAddExternalUrl={handleAddExternalUrl}
              handleRemoveExternalUrl={handleRemoveExternalUrl}
            />
          ))}

          <Stack justifyContent={'center'} alignItems={'center'} mt={2}>
            <Button
              variant="contained"
              onClick={handleAddModule}
              startIcon={<Add />}>
              {t('section.add_section')}
            </Button>
          </Stack>
        </Stack>
      ) : (
        <Stack p={2} spacing={3}>
          <SectionTabs
            sections={fields}
            activeTab={activeTab}
            handleChange={handleChangeTab}
            onAddNewSection={addNewSection}
          />
          <Module
            field={fields[activeTab]}
            sectionFormMethods={sectionFormMethods}
            files={files}
            canDelete={fields.length > 1}
            key={fields[activeTab].id}
            index={activeTab}
            isEditMode={isEditMode}
            onDrop={onDrop}
            setFiles={setFiles}
            handleAddQuestion={handleAddQuestion}
            handleRemoveQuestion={handleRemoveQuestion}
            handleAddAnswer={handleAddAnswer}
            handleRemoveAnswer={handleRemoveAnswer}
            handleRemoveModule={handleRemoveSection}
            handleAddExternalUrl={handleAddExternalUrl}
            handleRemoveExternalUrl={handleRemoveExternalUrl}
            handleAddSectionApi={handleAddSection}
            handleRemoveQuiz={handleRemoveQuiz}
          />
        </Stack>
      )}
    </FormProvider>
  )
}

export default SectionForm
