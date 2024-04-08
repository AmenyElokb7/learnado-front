import { transformPaginationResponse } from '@redux/apis/transform'
import { PaginationResponse } from 'types/interfaces/Pagination'
import { Course } from 'types/models/Course'
import { ApiPaginationResponse } from '../type'
import { CourseApi, SingleCourseResponseData } from './coursesApi.type'
import { generatePictureSrc } from '@utils/helpers/string.helpers'
import { ModuleApi } from '../modules/moduleApi'
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
    modules: transformCourseModules(course.steps),
    media: transformMedia(course.media),
  }
}

export const transformCourseModules = (modules: ModuleApi[]): Module[] => {
  return modules.map((module) => ({
    id: module.id,
    title: module.title,
    description: module.description,
    duration: transformDuration(module.duration),
    courseId: module.course_id,
    createdAt: transformDateFormat(module.created_at),
    media: transformMedia(module.media),
    // TODO: add quiz later
  }))
}
