import { QuestionTypeEnum } from '@config/enums/questionType.enum'
import { Section } from '@features/courses/addCourse/sectionForm/module/Module.type'
import { getQuestionTypeFilter } from '@utils/helpers/course.helpers'
import { ModuleApi } from './modulesApi.type'
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'
import { ItemDetailsResponse } from 'types/interfaces/ItemDetailsResponse'
import { Quiz } from 'types/models/Quiz'
import { Module } from 'types/models/Module'

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
          `steps[${index}][external_urls][${externalUrlIndex}][url]`,
          externalUrl.url,
        )
        formData.append(
          `steps[${index}][external_urls][${externalUrlIndex}][title]`,
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
