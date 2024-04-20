import { SectionFormProps } from './SectionForm.type'
import { Button, Stack, Tooltip } from '@mui/material'
import { Add } from '@mui/icons-material'
import Module from './module/Module'
import { t } from 'i18next'
import { FormProvider } from 'react-hook-form'
import useSectionForm from './useSectionForm'

function SectionForm({
  files,
  sectionFormMethods,
  isEditMode,
  setFiles,
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
    onDrop,
  } = useSectionForm({ sectionFormMethods })

  return (
    <FormProvider {...sectionFormMethods}>
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
          <Tooltip title={t('section.add_section')}>
            <Button
              variant="contained"
              onClick={handleAddModule}
              startIcon={<Add />}>
              {t('section.add_section')}
            </Button>
          </Tooltip>
        </Stack>
      </Stack>
    </FormProvider>
  )
}

export default SectionForm
