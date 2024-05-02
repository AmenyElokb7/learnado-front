import {
  Collapse,
  Divider,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import CustomTextField from '@components/Inputs/customTextField/CustomTextField'
import UploadMultipleFiles from '@components/Inputs/uploadMultipleFiles/UploadMultipleFiles'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import { CREATE_STEP_FORM_CONFIG } from '../../SectionForm.constants'
import { ModuleBodyProps } from './ModuleBody.type'
import AddToPhotosOutlinedIcon from '@mui/icons-material/AddToPhotosOutlined'
import CustomRadioButton from '@components/Inputs/customRadioButton/CustomRadioButton'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import Question from '../../question/Question'
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'

function ModuleBody({
  expanded,
  files,
  index,
  isEditMode,
  externalUrls,
  hasQuiz,
  questions,
  field,
  sectionFormMethods,
  setFiles,
  handleAddExternalUrl,
  handleRemoveExternalUrl,
  handleAddQuestion,
  handleRemoveQuestion,
  handleAddAnswer,
  handleRemoveAnswer,
}: ModuleBodyProps) {
  const { t } = useTranslation()
  return (
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
          files={files[index] || []}
          index={index}
          setFiles={setFiles}
          isEditMode={isEditMode}
        />

        {externalUrls
          .filter((url) => url.url !== GLOBAL_VARIABLES.EMPTY_STRING)
          .map(
            (url, indexUrl) => (
              (
                <Grid
                  item
                  xs={12}
                  key={indexUrl}
                  direction={'row'}
                  alignItems={'center'}
                  display={'flex'}
                  gap={4}>
                  <Grid item xs={12} sm={6}>
                    <CustomTextField
                      config={{
                        ...CREATE_STEP_FORM_CONFIG.externalUrlTitle,
                        name: `sections.${index}.externalUrls.${indexUrl}.title`,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomTextField
                      config={{
                        ...CREATE_STEP_FORM_CONFIG.externalUrl,
                        name: `sections.${index}.externalUrls.${indexUrl}.url`,
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={1}>
                    <Tooltip title={t('common.add')}>
                      <IconButton onClick={() => handleAddExternalUrl(index)}>
                        <AddToPhotosOutlinedIcon color="info" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={t('common.delete')}>
                      <IconButton
                        disabled={externalUrls.length > 1 ? false : true}
                        sx={{
                          color: externalUrls.length === 1 ? 'inherit' : 'red',
                        }}
                        onClick={() =>
                          handleRemoveExternalUrl(index, indexUrl)
                        }>
                        <DeleteOutlineOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                </Grid>
              )
            ),
          )}

        <Grid item xs={12}>
          <CustomRadioButton
            config={{
              ...CREATE_STEP_FORM_CONFIG.hasQuiz,
              name: `sections.${index}.hasQuiz`,
            }}
          />
        </Grid>
        {!isEditMode && (
          <Grid item xs={12}>
            <Divider />
          </Grid>
        )}
        {!isEditMode && Number(hasQuiz) === 1 && (
          <Stack spacing={2} width="100%" p={8}>
            <Stack direction={'row'} spacing={2} alignItems={'center'}>
              <Typography color="primary" fontWeight={'medium'} variant="h2">
                {t('section.quiz.questions')}
              </Typography>

              <Tooltip title={t('section.quiz.add_question')} placement="right">
                <IconButton
                  onClick={() => handleAddQuestion(index)}
                  color="success">
                  <AddCircleOutlineOutlinedIcon fontSize="medium" />
                </IconButton>
              </Tooltip>
            </Stack>
            <Divider />
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
  )
}

export default ModuleBody
