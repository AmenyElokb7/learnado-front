import { transformPaginationResponse } from '@redux/apis/transform'
import { PaginationResponse } from 'types/interfaces/Pagination'
import { Course, CourseForDesigner } from 'types/models/Course'
import { ApiPaginationResponse } from '../type'
import {
  ApiQuestion,
  ApiStep,
  CourseApi,
  CourseForDesignerApi,
  SingleCourseResponseData,
} from './coursesApi.type'
import { generatePictureSrc, toSnakeCase } from '@utils/helpers/string.helpers'

import { Module } from 'types/models/Module'
import { transformMedia } from '../transform'
import {
  transformDuration,
  transformDateFormat,
  transformDateTimeFormat,
} from '@utils/helpers/date.helpers'
import {
  formatPrice,
  formatPriceWithDiscount,
} from '@utils/helpers/price.helpers'
import { ItemDetailsResponse } from 'types/interfaces/ItemDetailsResponse'
import { FieldValues } from 'react-hook-form'
import { ModuleApi } from '../modules/modulesApi.type'
import { TeachingTypeFilterEnum } from '@config/enums/teachingType.enum'
import { Section } from '@features/courses/addCourse/sectionForm/module/Module.type'
import { Question } from 'types/models/Quiz'
import { decodeQuestionType } from '@utils/helpers/course.helpers'
import { DEFAULT_SECTIONS } from '@features/courses/addCourse/AddCourseForm.constants'
import { ConfigEnv } from '@config/configEnv'

export const transformFetchCoursesResponse = (
  response: ApiPaginationResponse<CourseApi>,
): PaginationResponse<Course> => {
  return {
    ...transformPaginationResponse(response),
    data: transformCourses(Object.values(response?.data)),
  }
}

export const transformFetchCourseResponse = (
  response: SingleCourseResponseData,
): ItemDetailsResponse<Course> => {
  return {
    message: response.message,
    data: transformSingleCourse(response.data),
  }
}

const transformCourses = (data: CourseApi[]): Course[] => {
  return data?.map((course) => transformSingleCourse(course))
}

export const transformSingleCourse = (course: CourseApi): Course => {
  return {
    id: course.id,
    title: course.title,
    category: course.category_id,
    description: course.description,
    language: {
      id: course.language.id,
      language: course.language.language,
    },
    language_id: course.language_id,
    isPaid: course.is_paid === 1,
    price: formatPrice(course.price),
    discount: formatPriceWithDiscount(course.price, course.discount),
    duration: transformDuration(parseInt(course.duration)),
    isPublic: course.is_public === 1,
    isSequential: course.is_sequential === 1,
    teachingType: course.teaching_type,
    startTime: transformDateTimeFormat(course.start_time),
    endTime: transformDateTimeFormat(course.end_time),
    lat: course.latitude,
    long: course.longitude,
    createdAt: transformDateFormat(course.created_at),
    lessonsCount: course.lessons_count,
    subscribedUsersCount: course.subscribed_users_count,
    facilitator: {
      id: course.facilitator.id,
      firstName: course.facilitator.first_name,
      lastName: course.facilitator.last_name,
      email: course.facilitator.email,
      media: course?.facilitator?.media?.length
        ? [
            {
              fileName: generatePictureSrc(
                course.facilitator.media[0]?.file_name,
              ),
              modelId: course.facilitator.media[0]?.model_id,
            },
          ]
        : [],
    },
    sections: transformCourseModules(course.steps),
    media: transformMedia(course.media),
  }
}

export const transformCourseModules = (modules: ModuleApi[]): Module[] => {
  return modules.map((module) => ({
    id: module.id,
    databaseId: module.id,
    title: module.title,
    description: module.description,
    duration: transformDuration(module.duration),
    courseId: module.course_id,
    createdAt: transformDateFormat(module.created_at),
    media: transformMedia(module.media),
    hasQuiz: module?.quiz?.questions?.length > 0 ? 1 : 0,
  }))
}
export const encodeCourse = (values: FieldValues): FormData => {
  // extract price and discount from values
  const { price, discount, selectedUserIds, endTime, startTime, ...rest } =
    values

  // extract values to encode
  //TODO: Fix lat and lng
  const valuesToEncode: Omit<
    FieldValues,
    'price' | 'discount' | 'selectedUserIds' | 'endTime' | 'startTime'
  > = { ...rest }

  const formData = new FormData()

  Object.keys(valuesToEncode).forEach((key) => {
    // append media
    if (key === 'courseMedia') {
      const mediaFiles = Array.isArray(values[key])
        ? values[key]
        : [values[key]]
      mediaFiles.forEach((file: File) => {
        formData.append('course_media[]', file)
      })
      return
    }

    if (key === 'teachingType') {
      const teachingTypeVlaue =
        values[key] === TeachingTypeFilterEnum.NO_TYPE ? 0 : values[key]
      formData.append(toSnakeCase(key), teachingTypeVlaue)
      if (values.startTime) {
        formData.append(toSnakeCase('startTime'), values['startTime'])
      }
      if (values.endTime) {
        formData.append(toSnakeCase('endTime'), values['endTime'])
      }
    } else if (key === 'isPaid') {
      formData.append(toSnakeCase(key), values[key])
      if (Number(values[key]) === 1) {
        formData.append(toSnakeCase('price'), values['price'])
        formData.append(toSnakeCase('discount'), values['discount'])
      }
    } else if (key === 'isPublic') {
      formData.append(toSnakeCase(key), values[key])
      if (Number(values[key]) === 0) {
        formData.append(
          toSnakeCase('selectedUserIds'),
          values['selectedUserIds'],
        )
      }
    } else {
      formData.append(toSnakeCase(key), values[key])
    }
  })
  return formData
}

export const transformFetchCourseForDesignerResponse = (
  response: ItemDetailsResponse<CourseForDesignerApi>,
): ItemDetailsResponse<CourseForDesigner> => {
  const { data } = response

  let sectionsMedias = decodeSectionsMedia(data.steps)
  return {
    message: response.message,
    data: {
      id: data.id,
      title: data.title,
      description: data.description,
      categoryId: data.category_id,
      languageId: data.language_id,
      isPaid: data.is_paid,
      price: Number(data.price),
      discount: Number(data.discount),
      facilitatorId: data.facilitator_id,
      isPublic: data.is_public,
      latitude: data.latitude,
      longitude: data.longitude,
      link: data.link,
      teachingType: data.teaching_type === 0 ? 3 : data.teaching_type,
      subscribers: data.subscribers,
      sequential: data.sequential,
      startTime: data.start_time,
      endTime: data.end_time,
      courseMedia: `${ConfigEnv.MEDIA_BASE_URL}/${data.media[0]?.file_name}`,
      sections:
        data.steps.length > 0
          ? data.steps.map((step) => transformCourseSection(step))
          : DEFAULT_SECTIONS,
      media: sectionsMedias,
    },
  }
}

const transformCourseSection = (sectionApi: ApiStep): Section => {
  return {
    databaseId: sectionApi.id,
    title: sectionApi.title,
    description: sectionApi.description,
    duration: Number(sectionApi.duration),
    hasQuiz: sectionApi?.quiz?.questions?.length > 0 ? 1 : 0,
    // TODO: add external urls
    externalUrls: [],
    quiz:
      sectionApi?.quiz?.questions?.length > 0
        ? {
            id: sectionApi.quiz.id,
            questions:
              sectionApi.quiz.questions.length > 0
                ? sectionApi.quiz.questions.map((question) =>
                    transformQuestionSection(question),
                  )
                : [],
          }
        : {
            id: 0,
            questions: [],
          },
  }
}

export const transformQuestionSection = (
  questionApi: ApiQuestion,
): Question => {
  const { id, is_valid, question, type, answers } = questionApi
  return {
    id: id,
    type: decodeQuestionType(type.toString()),
    question: question,
    isValid: is_valid,
    answers:
      answers.length > 0
        ? answers.map((answer) => ({
            id: answer.id,
            answer: answer.answer,
            isValid: answer.is_valid,
          }))
        : [],
  }
}

export const decodeSectionsMedia = (
  sections: ApiStep[],
): Record<number, File[]> => {
  let sectionsMedias: Record<number, File[]> = {}

  sections.forEach((step, index) => {
    sectionsMedias[index] = step.media.map((media) => {
      const newGeneratedFile = new File(
        [media.file_name],
        `${ConfigEnv.MEDIA_BASE_URL}/${media.file_name}`,
        {
          type: media.mime_type,
        },
      )

      return newGeneratedFile
    })
  })

  return sectionsMedias
}
