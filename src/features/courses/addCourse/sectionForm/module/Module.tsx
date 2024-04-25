import {
  Stack,
  Typography,
  Grid,
  Tooltip,
  Collapse,
  IconButton,
  Divider,
} from '@mui/material'

import { useTranslation } from 'react-i18next'
import { ModuleProps } from './Module.type'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import { ModuleRoot, QuizRoot, StyledArrowIcon } from './Module.style'
import { useState } from 'react'
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'
import { Quiz } from 'types/models/Quiz'
import useDragAndDropModule from './useDragAndDropModule'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import {
  useDeleteAnswerMutation,
  useDeleteModuleMutation,
  useDeleteQuestionMutation,
  useDeleteQuizMutation,
  useUpdateModuleMutation,
  useUpdateQuizMutation,
} from '@redux/apis/modules/moduleApi'
import { useAppDispatch } from '@redux/hooks'
import { showError, showSuccess } from '@redux/slices/snackbarSlice'
import CustomDialogActions from '@components/dialogs/customDialogActions/CustomDialogActions'
import { GREY } from '@config/colors/colors'
import trash from '@assets/logo/icon-trash.svg'
import { courseApi } from '@redux/apis/courses/coursesApi'
import { Add, Edit } from '@mui/icons-material'
import ModuleHead from './moduleHead/ModuleHead'
import ModuleBody from './moduleBody/ModuleBody'
import Question from '../question/Question'

function Module({
  field,
  files,
  index,
  canDelete,
  sectionFormMethods,
  isEditMode,
  setFiles,
  onDrop,
  handleAddQuestion,
  handleRemoveQuestion,
  handleAddAnswer,
  handleRemoveAnswer,
  handleRemoveModule,
  handleAddExternalUrl,
  handleRemoveExternalUrl,
  handleRemoveQuiz,
  handleAddSectionApi,
}: ModuleProps) {
  // Destructing the questions from the form
  const { questions } = field.quiz as Quiz

  const externalUrls = field.externalUrls || [
    {
      url: GLOBAL_VARIABLES.EMPTY_STRING,
      title: GLOBAL_VARIABLES.EMPTY_STRING,
    },
  ]
  const dispatch = useAppDispatch()
  // State Declaration
  const [expanded, setExpanded] = useState(true)
  const [expandedQuiz, setExpandedQuiz] = useState(true)
  const [open, setOpen] = useState(false)
  const [openQuizDialog, setOpenQuizDialog] = useState(false)
  const [openQuestionDialog, setOpenQuestionDialog] = useState(false)
  const [openAnswerDialog, setOpenAnswerDialog] = useState(false)
  const { t } = useTranslation()

  const hasQuiz = sectionFormMethods.watch(`sections.${index}.hasQuiz`)
  const {
    isDragging,
    handleOnDragEnd,
    handleOnDragOver,
    handleOnDragStart,
    handleOnDrop,
  } = useDragAndDropModule({ index, onDrop })

  const [deletesection] = useDeleteModuleMutation()
  const [deleteQuiz] = useDeleteQuizMutation()
  // Delete section
  const handleDeleteSection = async () => {
    try {
      // Dele section api call
      deletesection(field.databaseId).unwrap()
      // dispatch success Snackbar
      dispatch(showSuccess(t('section.delete_success')))
      // Invalidate the get CourseForDesigner query
      dispatch(courseApi.util.invalidateTags(['Courses', 'CoursesForDesigner']))
      // Delete from the form
      handleRemoveModule(index)
    } catch (erroor) {
      // Dispatch error Snackbar
      dispatch(showError(t('errors.general_error')))
    } finally {
      // Close the dialog
      setOpen(false)
    }
  }

  const handleDeleteQuiz = async () => {
    try {
      // Delete Quiz api call
      deleteQuiz(field.quiz.id).unwrap()
      // Dispatch success Snackbar
      dispatch(showSuccess(t('section.quiz.delete_success')))

      // delete quiz from the form
      handleRemoveQuiz?.(index)
    } catch (error) {
      // Dispatch error Snackbar
      dispatch(showError(t('errors.general_error')))
    } finally {
      // Close the dialog
      setOpenQuizDialog(false)
    }
  }
  const isNewSection = !field.id || !field.title
  const isNewQuiz = field.quiz.id || field.quiz.questions[0].question
  const handleChangeExpand = () => setExpanded((prev) => !prev)

  const handleDeleteOrRemoveSection = () => {
    isEditMode && !isNewSection ? setOpen(true) : handleRemoveModule(index)
  }

  const [deleteQuestion] = useDeleteQuestionMutation()

  const handleRemoveQuestionApi = async () => {
    const questionId = questions[index].id

    try {
      // Delete question api call
      deleteQuestion(questionId).unwrap()
      // Dispatch success Snackbar
      dispatch(showSuccess(t('section.quiz.delete_question_success')))
      const questionIndex = questions.findIndex((q) => q.id === questionId)
      // Remove question from the form
      handleRemoveQuestion(index, questionIndex)
    } catch (error) {
      // Dispatch error Snackbar
      dispatch(showError(t('errors.general_error')))
    }
  }
  const [deleteAnswer] = useDeleteAnswerMutation()
  const handleDeleteAnswerApi = async () => {
    const answerId = questions[index].answers[index].id

    try {
      // Delete answer api call
      deleteAnswer(answerId).unwrap()
      // Dispatch success Snackbar
      dispatch(showSuccess(t('section.quiz.delete_answer_success')))
      // Remove answer from the form
      handleRemoveAnswer(index, index, index)
    } catch (error) {
      // Dispatch error Snackbar
      dispatch(showError(t('errors.general_error')))
    }
  }

  const [updateQuiz] = useUpdateQuizMutation()

  const onUpdateQuizApi = sectionFormMethods.handleSubmit(async (values) => {
    const sectionId = values.sections[index].databaseId
    const quizData = values.sections[index].quiz

    try {
      // Update Quiz api call
      await updateQuiz({ sectionId, data: quizData }).unwrap()
      // Dispatch success Snackbar
      dispatch(showSuccess(t('section.quiz.update_success')))
      dispatch(courseApi.util.invalidateTags(['Courses', 'CoursesForDesigner']))
    } catch (error) {
      // Dispatch error Snackbar
      dispatch(showError(t('errors.general_error')))
    }
  })

  const [updateSection] = useUpdateModuleMutation()

  const handleUpdateSectionApi = sectionFormMethods.handleSubmit(
    async (values) => {
      const sectionId = values.sections[index].databaseId
      const sectionData = values.sections[index]

      try {
        // Update Section api call
        await updateSection({
          sectionId,
          data: sectionData,
          files: files[index],
        }).unwrap()
        // Dispatch success Snackbar
        dispatch(showSuccess(t('section.update_success')))
        dispatch(
          courseApi.util.invalidateTags(['Courses', 'CoursesForDesigner']),
        )
      } catch (error) {
        // Dispatch error Snackbar
        dispatch(showError(t('errors.general_error')))
      }
    },
  )

  return (
    <>
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
          canDelete
            ? GLOBAL_VARIABLES.TRUE_STRING
            : GLOBAL_VARIABLES.FALSE_STRING
        }
        isdragging={
          isDragging
            ? GLOBAL_VARIABLES.TRUE_STRING
            : GLOBAL_VARIABLES.FALSE_STRING
        }>
        <ModuleHead
          canDelete={canDelete}
          expanded={expanded}
          index={index}
          isNewSection={isNewSection}
          title={field.title}
          onChangeExpanded={handleChangeExpand}
          onCreateSection={handleAddSectionApi}
          onDeleteSection={handleDeleteOrRemoveSection}
          onUpdateSection={handleUpdateSectionApi}
        />
        <Divider />
        <ModuleBody
          expanded={expanded}
          externalUrls={externalUrls}
          field={field}
          files={files}
          index={index}
          isEditMode={isEditMode}
          setFiles={setFiles}
          handleAddExternalUrl={handleAddExternalUrl}
          handleRemoveExternalUrl={handleRemoveExternalUrl}
          hasQuiz={hasQuiz}
          handleAddQuestion={handleAddQuestion}
          handleRemoveQuestion={handleRemoveQuestion}
          handleAddAnswer={handleAddAnswer}
          handleRemoveAnswer={handleRemoveAnswer}
          sectionFormMethods={sectionFormMethods}
          questions={questions}
        />
      </ModuleRoot>
      {isEditMode && Number(hasQuiz) === 1 && (
        <QuizRoot>
          <Stack
            direction={'row'}
            spacing={2}
            alignItems={'center'}
            justifyContent={'space-between'}>
            <Stack direction={'row'} spacing={1} alignItems={'center'}>
              <StyledArrowIcon
                onClick={() => setExpandedQuiz(!expandedQuiz)}
                expanded={
                  expandedQuiz
                    ? GLOBAL_VARIABLES.TRUE_STRING
                    : GLOBAL_VARIABLES.FALSE_STRING
                }
              />
              <Typography variant="h3" color="primary">
                {t('section.quiz.quiz')}
              </Typography>
            </Stack>
            {!isNewQuiz && !isNewSection ? (
              <IconButton color="info">
                <Tooltip title={t('section.quiz.add')}>
                  <Add />
                </Tooltip>
              </IconButton>
            ) : (
              <Stack direction={'row'} spacing={1}>
                <IconButton color="info" onClick={onUpdateQuizApi}>
                  <Tooltip title={t('section.quiz.update')}>
                    <Edit />
                  </Tooltip>
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => setOpenQuizDialog(true)}>
                  <Tooltip title={t('section.quiz.delete')}>
                    <DeleteOutlineOutlinedIcon />
                  </Tooltip>
                </IconButton>
              </Stack>
            )}
          </Stack>
          <Collapse in={expandedQuiz} timeout={700}>
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

              <Divider />
              {questions?.map((_, questionIndex) => {
                return (
                  <Grid item xs={12} key={questionIndex} p={2}>
                    <Question
                      handleAddQuestion={handleAddQuestion}
                      handleDeleteQuestion={() => {
                        isEditMode &&
                        !isNewSection &&
                        field.quiz.questions[questionIndex].id
                          ? setOpenQuestionDialog(true)
                          : handleRemoveQuestion(index, questionIndex)
                      }}
                      canDelete={questions.length > 1}
                      questionIndex={questionIndex}
                      field={field}
                      sectionIndex={index}
                      sectionFormMethods={sectionFormMethods}
                      handleRemoveAnswer={() => {
                        isEditMode && !isNewSection
                          ? setOpenAnswerDialog(true)
                          : handleRemoveAnswer
                      }}
                      handleAddAnswer={() =>
                        handleAddAnswer(index, questionIndex)
                      }
                    />
                  </Grid>
                )
              })}
            </Stack>
          </Collapse>
          <CustomDialogActions
            open={
              open || openQuizDialog || openQuestionDialog || openAnswerDialog
            }
            onAccept={
              open
                ? handleDeleteSection
                : openQuizDialog
                ? handleDeleteQuiz
                : openQuestionDialog
                ? () => handleRemoveQuestionApi()
                : () => handleDeleteAnswerApi()
            }
            onClose={() => {
              setOpen(false)
              setOpenQuizDialog(false)
              setOpenQuestionDialog(false)
              setOpenAnswerDialog(false)
            }}
            onCancel={() => {
              setOpen(false)
              setOpenQuizDialog(false)
              setOpenQuestionDialog(false)
              setOpenAnswerDialog(false)
            }}>
            <Stack direction={'column'} spacing={1} alignItems={'center'}>
              <img src={trash} width={100} />
              <Typography color={GREY.main} variant="h1" fontWeight={'medium'}>
                {open
                  ? t('section.delete_section_confirm')
                  : openQuizDialog
                  ? t('section.quiz.delete_quiz_confirm')
                  : openQuestionDialog
                  ? t('section.quiz.delete_question_confirm')
                  : t('section.quiz.delete_answer_confirm')}
              </Typography>
              <Typography variant="h6" color={GREY.main}>
                {open
                  ? t('section.delete_section')
                  : openQuizDialog
                  ? t('section.quiz.delete_quiz')
                  : openQuestionDialog
                  ? t('section.quiz.delete_question')
                  : t('section.quiz.delete_answer')}
              </Typography>
            </Stack>
          </CustomDialogActions>
        </QuizRoot>
      )}
    </>
  )
}

export default Module
