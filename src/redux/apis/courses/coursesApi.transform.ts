import { PaginationResponse } from 'types/interfaces/Pagination'
import { Course } from 'types/models/Course'
import { ApiPaginationResponse } from '../type'
import { CourseApi } from './coursesApi.type'
import { generatePictureSrc } from '@utils/helpers/string.helpers'
import { ModuleApi } from '../modules/moduleApi'
import { Module } from 'types/models/Module'
import { transformMedia } from '../transform'

export const transformFetchCoursesResponse = (
  response: ApiPaginationResponse<CourseApi>,
): PaginationResponse<Course> => {
  return {
    message: response.message,
    meta: {
      currentPage: response.meta.current_page,
      perPage: response.meta.per_page,
      total: response.meta.total,
    },
    data: transformCourses(response.data),
  }
}

const transformCourses = (data: CourseApi[]): Course[] => {
  return data.map((course) => ({
    id: course.id,
    title: course.title,
    category: course.category_id,
    description: course.description,
    language: course.language_id,
    isPaid: course.is_paid === 1,
    price: course.price,
    discount: course.discount,
    duration: course.duration,
    isPublic: course.is_public === 1,
    isSequential: course.is_sequential === 1,
    teachingType: course.teaching_type,
    startTime: course.start_time,
    endTime: course.end_time,
    lat: course.latitude,
    long: course.longitude,
    createdAt: course.created_at,
    lessonsCount: course.lessons_count,
    facilitator: {
      id: course.facilitator.id,
      firstName: course.facilitator.first_name,
      lastName: course.facilitator.last_name,
      media: course.facilitator.media.length
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
  }))
}

export const transformCourseModules = (modules: ModuleApi[]): Module[] => {
  return modules.map((module) => ({
    id: module.id,
    title: module.title,
    description: module.description,
    duration: module.duration,
    courseId: module.course_id,
    // TODO: format date
    createdAt: module.created_at,
    media: transformMedia(module.media),
    // TODO: add quiz later
  }))
}
