import { QuestionTypeEnum } from '@config/enums/questionType.enum'
import { Section } from '@features/courses/addCourse/sectionForm/module/Module.type'
import { getQuestionTypeFilter } from '@utils/helpers/course.helpers'
import { ModuleApi } from './modulesApi.type'
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'
import { ItemDetailsResponse } from 'types/interfaces/ItemDetailsResponse'

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
): ItemDetailsResponse<Section> => {
  return {
    message: data.message,
    data: transformSingleModule(data.data),
  }
}

const transformSingleModule = (data: ModuleApi): Section => {
  return {
    id: data.id,
    title: data.title,
    description: data.description,
    media:
      data.media.length > 0
        ? {
            id: data.media[0].id,
            modelId: data.media?.[0]?.model_id ?? 0,
            mimeType:
              data.media?.[0]?.mime_type ?? GLOBAL_VARIABLES.EMPTY_STRING,
            fileName:
              data.media?.[0]?.file_name ?? GLOBAL_VARIABLES.EMPTY_STRING,
            title: data.media?.[0]?.title ?? GLOBAL_VARIABLES.EMPTY_STRING,
          }
        : [],
  }
}
