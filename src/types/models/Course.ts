import { Media } from './Media'
import { User } from './User'
import { Language } from './Language'
import { TeachingTypeFilterEnum } from '@config/enums/teachingType.enum'
import { Section } from '@features/courses/addCourse/sectionForm/module/Module.type'
import { Module } from './Module'

export interface Course {
  id: number
  title: string
  category: number
  description: string
  language_id: number
  language: Language
  isPaid: boolean
  price: string
  discount: string
  duration: string
  isPublic: boolean
  isSequential: boolean
  teachingType: number
  startTime?: string
  endTime?: string
  lat?: number | null
  long?: number | null
  createdAt: string
  facilitator: Partial<User>
  sections: Module[]
  media: Media[]
  lessonsCount: number
  subscribedUsersCount: number
}

export interface CourseForDesigner {
  id?: number
  title: string
  description: string
  categoryId: number
  languageId: number
  isPaid: 0 | 1
  price: number
  discount: number
  facilitatorId: number
  isPublic: 0 | 1
  latitude?: number | null
  longitude?: number | null
  link?: string
  teachingType: TeachingTypeFilterEnum
  subscribers: number[]
  sequential: 0 | 1
  startTime?: string
  endTime?: string
  sections: Section[]
  courseMedia: File
  media?: Record<string, File[]>
  externalUrls?: {
    url: string
    title: string
  }[]
}
