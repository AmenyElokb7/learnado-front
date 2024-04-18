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
    // formData.append(`steps[${index}][has_quiz]`, section.hasQuiz ? '1' : '0')
    if (files[index]) {
      files[index].forEach((file, fileIndex) => {
        formData.append(`steps[${index}][media_files][${fileIndex}]`, file)
      })
    }
  })

  return formData
}
