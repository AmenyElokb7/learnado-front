import { QuestionTypeEnum } from '@config/enums/questionType.enum'
import { Section } from '@features/courses/addCourse/sectionForm/module/Module.type'
import { getQuestionTypeFilter } from '@utils/helpers/course.helpers'
import {
  ModuleApi,
  QuizSubmission,
  QuizSubmissionApi,
  StudentQuiz,
  StudentQuizApi,
} from './modulesApi.type'
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'
import { ItemDetailsResponse } from 'types/interfaces/ItemDetailsResponse'
import { Quiz } from 'types/models/Quiz'
import { Module } from 'types/models/Module'
import { FieldValues } from 'react-hook-form'
import { ApiPaginationResponse } from '../type'
import { PaginationResponse } from 'types/interfaces/Pagination'
import { transformDateTimeFormat } from '@utils/helpers/date.helpers'

export const encodeModule = (
  sections: Section[],
  files: Record<number, File[]>,
): FormData => {
  const formData = new FormData()

  sections.forEach((section: Section, index: number) => {
    formData.append(`steps[${index}][title]`, section.title)
    formData.append(`steps[${index}][description]`, section.description)
    formData.append(`steps[${index}][duration]`, String(section.duration))

    if (section?.externalUrls?.length) {

      section.externalUrls.forEach((externalUrl, externalUrlIndex) => {
        formData.append(
          `steps[${index}][media_urls][${externalUrlIndex}][url]`,
          externalUrl.url,
        )
        formData.append(
          `steps[${index}][media_urls][${externalUrlIndex}][title]`,
          externalUrl.title,
        )
      })
    }

    if (Number(section.hasQuiz) === 1 && section.quiz.questions.length > 0) {
      section.quiz.questions.forEach((question, questionIndex) => {
        formData.append(
          `steps[${index}][quiz][questions][${questionIndex}][question]`,
          question.question,
        )
        formData.append(
          `steps[${index}][quiz][questions][${questionIndex}][type]`,
          getQuestionTypeFilter(question.type as number),
        )

        if (Number(question.type) === QuestionTypeEnum.BINARY) {
          formData.append(
            `steps[${index}][quiz][questions][${questionIndex}][is_valid]`,
            String(question.isValid),
          )
        }

        if (
          question.answers.length > 0 &&
          question.type === QuestionTypeEnum.QCM
        ) {
          question.answers.forEach((answer, answerIndex) => {
            formData.append(
              `steps[${index}][quiz][questions][${questionIndex}][answers][${answerIndex}][answer]`,
              answer.answer,
            )
            formData.append(
              `steps[${index}][quiz][questions][${questionIndex}][answers][${answerIndex}][is_valid]`,
              Boolean(answer.isValid) ? '1' : '0',
            )
          })
        }
      })
    }

    if (files[index]) {
      files[index].forEach((file, fileIndex) => {
        formData.append(`steps[${index}][media_files][${fileIndex}]`, file)
      })
    }
  })

  return formData
}

export const transformModuleResponse = (
  data: ItemDetailsResponse<ModuleApi>,
): ItemDetailsResponse<Module> => {
  return {
    message: data.message,
    data: transformSingleModule(data.data),
  }
}

const transformSingleModule = (data: ModuleApi): Module => {
  return {
    id: data.id,
    title: data.title,
    description: data.description,
    duration: String(data.duration),
    courseId: data.course_id,
    createdAt: data.created_at,
    hasQuiz: data.has_quiz,
    quiz: {
      id: data.quiz?.id,
      questions: data.quiz?.questions.map((question) => ({
        id: question.id,
        question: question.question,
        type: question.type,
        isValid: question.is_valid,
        answers: question.answers.map((answer) => ({
          id: answer.id,
          answer: answer.answer,
          isValid: answer.is_valid,
        })),
      })),
    },
    media:
      data.media.length > 0
        ? [
            {
              id: data.media[0].id,
              modelId: data.media?.[0]?.model_id ?? 0,
              modelType: data.media?.[0].model_type,
              mimeType:
                data.media?.[0]?.mime_type ?? GLOBAL_VARIABLES.EMPTY_STRING,
              fileName:
                data.media?.[0]?.file_name ?? GLOBAL_VARIABLES.EMPTY_STRING,
              title: data.media?.[0]?.title ?? GLOBAL_VARIABLES.EMPTY_STRING,
            },
          ]
        : [],
  }
}

export const encodeQuiz = (quiz: Quiz): FormData => {
  const formData = new FormData()
  quiz.questions.forEach((question, questionIndex) => {
    if (question.id) {
      // Include the question ID when it exists
      formData.append(
        `quiz[questions][${questionIndex}][id]`,
        String(question.id),
      )
    }

    formData.append(
      `quiz[questions][${questionIndex}][question]`,
      question.question,
    )
    formData.append(
      `quiz[questions][${questionIndex}][type]`,
      getQuestionTypeFilter(question.type as number),
    )

    if (Number(question.type) === QuestionTypeEnum.BINARY) {
      formData.append(
        `quiz[questions][${questionIndex}][is_valid]`,
        String(question.isValid),
      )
    }

    if (Number(question.type) === QuestionTypeEnum.QCM) {
      if (question.answers && question.answers.length > 0) {
        question.answers.forEach((answer, answerIndex) => {
          if (answer.id) {
            // Include the answer ID when it exists
            formData.append(
              `quiz[questions][${questionIndex}][answers][${answerIndex}][id]`,
              String(answer.id),
            )
          }

          formData.append(
            `quiz[questions][${questionIndex}][answers][${answerIndex}][answer]`,
            answer.answer,
          )
          formData.append(
            `quiz[questions][${questionIndex}][answers][${answerIndex}][is_valid]`,
            Boolean(answer.isValid) ? '1' : '0',
          )
        })
      }
    }
  })

  return formData
}

export const encodeUpdateModule = (
  section: Section,
  files: File[],
): FormData => {
  const formData = new FormData()

  formData.append(`title`, section.title)
  formData.append(`description`, section.description)
  formData.append(`duration`, String(section.duration))

  if (section?.externalUrls?.length) {
    section.externalUrls.forEach((externalUrl, externalUrlIndex) => {
      formData.append(
        `external_urls[${externalUrlIndex}][url]`,
        externalUrl.url,
      )
      formData.append(
        `external_urls[${externalUrlIndex}][title]`,
        externalUrl.title,
      )
    })
  }

  if (files) {
    files.forEach((file, fileIndex) => {
      formData.append(`media_files[${fileIndex}]`, file)
    })
  }

  return formData
}

interface QuizAnswer {
  answer: number[] | number
}

export const encodeQuizSubmission = (data: FieldValues): FormData => {
  const formData = new FormData()
  Object.entries(data.answers).forEach(([questionId, answerData], index) => {
    const typedAnswerData = answerData as QuizAnswer

    // Always append the question_id
    formData.append(`answers[${index}][question_id]`, questionId)

    // Check if answer is an array and append each item individually
    if (Array.isArray(typedAnswerData.answer)) {
      typedAnswerData.answer.forEach((answerId) => {
        formData.append(`answers[${index}][answer][]`, `${answerId}`)
      })
    } else {
      // For single answers, just append the value
      formData.append(
        `answers[${index}][answer][]`,
        `${typedAnswerData.answer}`,
      )
    }
  })
  return formData
}

export const transformQuizSubmissionResponse = (
  data: ItemDetailsResponse<QuizSubmissionApi>,
): ItemDetailsResponse<QuizSubmission> => {
  return {
    message: data.message,
    data: {
      score: data.data.score,
      totalScorePossible: data.data.total_score_possible,
      needsReview: data.data.needs_review,
      passed: data.data.passed,
    },
  }
}
export const transformQuizScores = (data: StudentQuizApi[]): StudentQuiz[] => {
  return data.map((quiz) => ({
    id: quiz.id,
    score: quiz.score,
    totalScorePossible: quiz.total_score_possible,
    passed: quiz.passed,
    createAt: transformDateTimeFormat(quiz.created_at),
    quiz: {
      id: quiz.quiz.id,
      step: {
        id: quiz.quiz.step.id,
        title: quiz.quiz.step.title,
        course: {
          id: quiz.quiz.step.course.id,
          title: quiz.quiz.step.course.title,
        },
      },
    },
  }))
}

export const transformQuizScoreResponse = (
  data: ApiPaginationResponse<StudentQuizApi>,
): PaginationResponse<StudentQuiz> => {
  return {
    message: data.message,
    data: transformQuizScores(data.data),
    meta: {
      currentPage: GLOBAL_VARIABLES.PAGINATION.FIRST_PAGE,
      perPage: GLOBAL_VARIABLES.PAGINATION.ROWS_PER_PAGE,
      total: GLOBAL_VARIABLES.PAGINATION.TOTAL_ITEMS,
      count: GLOBAL_VARIABLES.PAGINATION.TOTAL_ITEMS,
    },
  }
}
