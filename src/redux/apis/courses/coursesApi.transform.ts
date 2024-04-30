import { transformPaginationResponse } from '@redux/apis/transform'
import { PaginationResponse } from 'types/interfaces/Pagination'
import { Course, CourseForDesigner } from 'types/models/Course'
import { ApiPaginationResponse } from '../type'
import {
  ApiQuestion,
  ApiStep,
  CourseApi,
  CourseCertificate,
  CourseCertificateApi,
  CourseForDesignerApi,
  SingleCourseResponseData,
} from './coursesApi.type'
import { generatePictureSrc, toSnakeCase } from '@utils/helpers/string.helpers'

import { Module } from 'types/models/Module'
import { transformMedia } from '../transform'
import {
  transformDuration,
  transformDateFormat,
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
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'
import { QuestionTypeEnum } from '@config/enums/questionType.enum'

export const transformFetchCoursesResponse = (
  response: ApiPaginationResponse<CourseApi>,
): PaginationResponse<Course> => {
  if (response.meta) {
    return {
      ...transformPaginationResponse(response),
      data: transformCourses(response.data),
    }
  }
  return {
    message: response.message,
    data: transformCourses(response.data),
    meta: {
      currentPage: GLOBAL_VARIABLES.PAGINATION.FIRST_PAGE,
      perPage: GLOBAL_VARIABLES.PAGINATION.ROWS_PER_PAGE,
      total: GLOBAL_VARIABLES.PAGINATION.TOTAL_ITEMS,
      count: GLOBAL_VARIABLES.PAGINATION.TOTAL_ITEMS,
    },
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
    startTime: course.start_time,
    isActive: course?.is_active === 1,
    endTime: course.end_time,
    lat: course.latitude,
    long: course.longitude,
    createdAt: transformDateFormat(course.created_at),
    lessonsCount: course.lessons_count,
    subscribedUsersCount: course.subscribed_users_count,
    isSubscribed: Number(course?.is_subscribed) === 1,
    isCompleted: Number(course?.is_completed) === 1,
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
    duration: String(module.duration),
    courseId: module.course_id,
    createdAt: transformDateFormat(module.created_at),
    media: transformMedia(module.media),
    hasQuiz: module?.quiz?.questions?.length > 0 ? 1 : 0,
    quiz:
      module?.quiz?.questions?.length > 0
        ? {
            id: module.quiz.id,
            timeLeft: module.quiz.time_left,
            questions: module.quiz.questions.map((question) => ({
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
          }
        : {
            id: 0,
            questions: [
              {
                question: GLOBAL_VARIABLES.EMPTY_STRING,
                type: QuestionTypeEnum.BINARY,
                isValid: 0,
                answers: [],
              },
            ],
          },
  }))
}
export const encodeCourse = (values: FieldValues): FormData => {
  // extract price and discount from values
  const { price, discount, subscribers, endTime, startTime, ...rest } = values

  // extract values to encode
  //TODO: Fix lat and lng
  const valuesToEncode: Omit<
    FieldValues,
    'price' | 'discount' | 'subscribers' | 'endTime' | 'startTime'
  > = { ...rest }

  const formData = new FormData()

  Object.keys(valuesToEncode).forEach((key) => {
    // append media
    if (key === 'courseMedia') {
      formData.append('course_media', values[key])
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
        formData.append(toSnakeCase('selectedUserIds'), values['subscribers'])
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
      isActive: data.is_active,
      latitude: data.latitude,
      longitude: data.longitude,
      link: data.link,
      teachingType: data.teaching_type === 0 ? 3 : data.teaching_type,
      subscribers: data.subscribers.map((subscriber) => subscriber.id),
      sequential: data.sequential,
      startTime: data.start_time,
      endTime: data.end_time,
      courseMedia: new File(
        [data.media[0].file_name],
        data.media[0]?.file_name,

        {
          type: data.media[0].mime_type,
        },
      ),
      sections:
        data.steps.length > 0
          ? data.steps.map((step) => transformCourseSection(step))
          : DEFAULT_SECTIONS,
      media: sectionsMedias,
      externalUrls: data?.external_urls?.map((externalUrl) => ({
        url: externalUrl.url,
        title: externalUrl.title,
      })),
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
    media: sectionApi.media.map((media) => ({
      id: media.id,
      modelId: media.model_id,
      fileName: media.file_name,
      title: GLOBAL_VARIABLES.EMPTY_STRING,
      mimeType: media.mime_type,
    })),
    externalUrls: sectionApi.media.map((media) => ({
      id: media.id,
      url: media.external_url || GLOBAL_VARIABLES.EMPTY_STRING,
      title: media.title,
    })),
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
            questions: [
              {
                question: GLOBAL_VARIABLES.EMPTY_STRING,
                type: QuestionTypeEnum.BINARY,
                isValid: 0,
                answers: [],
              },
            ],
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
        : [
            {
              answer: GLOBAL_VARIABLES.EMPTY_STRING,
              isValid: 0,
            },
            {
              answer: GLOBAL_VARIABLES.EMPTY_STRING,
              isValid: 0,
            },
          ],
  }
}

export const decodeSectionsMedia = (
  sections: ApiStep[],
): Record<number, File[]> => {
  let sectionsMedias: Record<number, File[]> = {}

  sections.forEach((step, index) => {
    if (!step.media) return
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

export const transformCourseCerificate = (
  data: CourseCertificateApi,
): CourseCertificate => {
  return {
    id: data.id,
    courseTitle: data.course.title,
    downloadUrl: data.download_url,
  }
}

export const transformCourseCerificates = (
  data: CourseCertificateApi[],
): CourseCertificate[] => {
  return data.map((certificate) => transformCourseCerificate(certificate))
}

export const transformCourseCerificatesResponse = (
  response: ApiPaginationResponse<CourseCertificateApi>,
): PaginationResponse<CourseCertificate> => {
  return {
    message: response.message,
    data: transformCourseCerificates(response.data),
    meta: {
      currentPage: GLOBAL_VARIABLES.PAGINATION.FIRST_PAGE,
      perPage: GLOBAL_VARIABLES.PAGINATION.ROWS_PER_PAGE,
      total: GLOBAL_VARIABLES.PAGINATION.TOTAL_ITEMS,
      count: GLOBAL_VARIABLES.PAGINATION.TOTAL_ITEMS,
    },
  }
}
