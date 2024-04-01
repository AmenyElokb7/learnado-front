import { Media } from './Media'
import { User } from './User'
import { Module } from './Module'
import { Category } from './Category'
import { Language } from './Language'

export interface Course {
  id: number
  title: string
  category: Category
  description: string
  language: Language
  isPaid: boolean
  price: number
  discount: number
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
  modules: Module[]
  media: Media[]
  lessonsCount: number
}
