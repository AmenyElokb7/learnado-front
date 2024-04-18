import CustomTextField from '@components/Inputs/customTextField/CustomTextField'
import CustomRadioButton from '@components/Inputs/customRadioButton/CustomRadioButton'
import {
  Stack,
  Typography,
  Grid,
  Tooltip,
  Collapse,
  IconButton,
} from '@mui/material'
import { CREATE_STEP_FORM_CONFIG } from '../SectionForm.constants'

import { useTranslation } from 'react-i18next'
import { ModuleProps } from './Module.type'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import { ModuleRoot, StyledArrowIcon } from './Module.style'
import { useState } from 'react'
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'
import UploadMultipleFiles from '@components/Inputs/uploadMultipleFiles/UploadMultipleFiles'
import { Quiz } from 'types/models/Quiz'
import Question from '../question/Question'
import useDragAndDropModule from './useDragAndDropModule'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'

function Module({
  field,
  files,
  index,
  canDelete,
  sectionFormMethods,
  setFiles,
  onDrop,
  handleAddQuestion,
  handleRemoveQuestion,
  handleAddAnswer,
  handleRemoveAnswer,
  handleRemoveModule,
}: ModuleProps) {
  // Destructi,g the questions from the form
  const { questions } = field.quiz as Quiz

  // State Declaration
  const [expanded, setExpanded] = useState(true)
  const { t } = useTranslation()

  const hasQuiz = sectionFormMethods.watch(`sections.${index}.hasQuiz`)

  const {
    isDragging,
    handleOnDragEnd,
    handleOnDragOver,
    handleOnDragStart,
    handleOnDrop,
  } = useDragAndDropModule({ index, onDrop })

  return (
    <ModuleRoot
      spacing={2}
      mb={1}
      mt={1}
      draggable
      onDragStart={handleOnDragStart}
      onDragOver={handleOnDragOver}
      onDrop={handleOnDrop}
      onDragEnd={handleOnDragEnd}
      candrag={
        canDelete ? GLOBAL_VARIABLES.TRUE_STRING : GLOBAL_VARIABLES.FALSE_STRING
      }
      isdragging={
        isDragging
          ? GLOBAL_VARIABLES.TRUE_STRING
          : GLOBAL_VARIABLES.FALSE_STRING
      }>
      <Stack
        direction="row"
        justifyContent={'space-between'}
        alignItems={'center'}>
        <Stack direction={'row'} spacing={1} alignItems={'center'}>
          <StyledArrowIcon
            onClick={() => setExpanded(!expanded)}
            expanded={
              expanded
                ? GLOBAL_VARIABLES.TRUE_STRING
                : GLOBAL_VARIABLES.FALSE_STRING
            }
          />
          <Typography variant="h3" color="primary">
            {t('section.section', { index: index + 1 })}
          </Typography>
        </Stack>
        <Tooltip title={t('common.delete')}>
          <IconButton
            onClick={() => handleRemoveModule(index)}
            disabled={!canDelete}
            sx={{
              color: (theme) =>
                canDelete
                  ? theme.palette.error.main
                  : theme.palette.action.disabled,
            }}>
            <DeleteOutlineOutlinedIcon fontSize="medium" />
          </IconButton>
        </Tooltip>
      </Stack>

      <Collapse in={expanded} timeout={700}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              config={{
                ...CREATE_STEP_FORM_CONFIG.title,
                name: `sections.${index}.title`,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              config={{
                ...CREATE_STEP_FORM_CONFIG.duration,
                name: `sections.${index}.duration`,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              config={{
                ...CREATE_STEP_FORM_CONFIG.description,
                name: `sections.${index}.description`,
              }}
            />
          </Grid>

          <UploadMultipleFiles
            files={Object.values(files)[index]}
            index={index}
            setFiles={setFiles}
          />

          <Grid item xs={12}>
            <CustomRadioButton
              config={{
                ...CREATE_STEP_FORM_CONFIG.hasQuiz,
                name: `sections.${index}.hasQuiz`,
              }}
            />
          </Grid>
          {Number(hasQuiz) === 1 && (
            <Stack spacing={2} width="100%" p={8}>
              <Stack direction={'row'} spacing={2} alignItems={'center'}>
                <Typography color="primary" fontWeight={'medium'} variant="h2">
                  {t('section.quiz.questions')}
                </Typography>
                <Tooltip
                  title={t('section.quiz.add_question')}
                  placement="right">
                  <IconButton
                    onClick={() => handleAddQuestion(index)}
                    color="success">
                    <AddCircleOutlineOutlinedIcon fontSize="medium" />
                  </IconButton>
                </Tooltip>
              </Stack>
              {questions?.map((_, questionIndex) => {
                return (
                  <Grid item xs={12} key={questionIndex} p={2}>
                    <Question
                      handleAddQuestion={handleAddQuestion}
                      handleDeleteQuestion={() =>
                        handleRemoveQuestion(index, questionIndex)
                      }
                      canDelete={questions.length > 1}
                      questionIndex={questionIndex}
                      field={field}
                      sectionIndex={index}
                      sectionFormMethods={sectionFormMethods}
                      handleRemoveAnswer={handleRemoveAnswer}
                      handleAddAnswer={() =>
                        handleAddAnswer(index, questionIndex)
                      }
                    />
                  </Grid>
                )
              })}
            </Stack>
          )}
        </Grid>
      </Collapse>
    </ModuleRoot>
  )
}

export default Module
