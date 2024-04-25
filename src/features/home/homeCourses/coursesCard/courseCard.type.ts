export interface CourseCardProps {
  id: number
  image: string
  instructorName: string
  instructorAvatar: string
  courseTitle: string
  isPaid: boolean
  coursePrice: string
  discount: string
  hasDiscount?: boolean
  lessonsCount: number
  duration: string
  createdAt: string
  isDesigner?: boolean
  isInstructor?: boolean
  width?: string
  navigateToEditCoursePage?: (id: number) => void
}
