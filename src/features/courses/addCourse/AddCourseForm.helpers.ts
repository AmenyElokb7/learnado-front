import { CourseForDesigner } from 'types/models/Course'
import { CourseFormValues } from './courseForm/CourseForm.type'
import { DEFAULT_COURSE } from './AddCourseForm.constants'

export const generateCourseFormDefaultValues = (
  valuesFromApi?: CourseForDesigner,
): CourseFormValues => {
  if (valuesFromApi) {
    return {
      title: valuesFromApi.title,
      description: valuesFromApi.description,
      categoryId: valuesFromApi.categoryId,
      languageId: valuesFromApi.languageId,
      isPaid: valuesFromApi.isPaid,
      price: valuesFromApi.price,
      discount: valuesFromApi.discount,
      facilitatorId: valuesFromApi.facilitatorId,
      isPublic: valuesFromApi.isPublic,
      latitude: valuesFromApi.latitude,
      longitude: valuesFromApi.longitude,
      link: valuesFromApi.link,
      teachingType: valuesFromApi.teachingType,
      subscribers: valuesFromApi.subscribers,
      sequential: valuesFromApi.sequential,
      startTime: valuesFromApi.startTime,
      endTime: valuesFromApi.endTime,
    }
  }

  return DEFAULT_COURSE
}
