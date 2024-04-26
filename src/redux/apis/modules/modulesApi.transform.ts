import { QuestionTypeEnum } from '@config/enums/questionType.enum'
import { Section } from '@features/courses/addCourse/sectionForm/module/Module.type'

export const encodeModule = (
  sections: Section[],
  files: Record<number, File[]>,
): FormData => {
  const formData = new FormData()

  sections.forEach((section: Section, index: number) => {
    formData.append(`steps[${index}][title]`, section.title)
    formData.append(`steps[${index}][description]`, section.description)
    formData.append(`steps[${index}][duration]`, section.duration)
    if (section.externalUrls.length) {
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
          String(question.type),
        )
        if (String(question.type) === QuestionTypeEnum.BINARY) {
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
