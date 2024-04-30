export interface CourseCardMediaProps {
  image: string
  coursePrice: string
  discount: string
  isPaid: boolean
  isEnrolled?: boolean
  isCompleted?: boolean
  handleEnroll: () => void
  handleCompleteCourse: () => void
  handleBuyCourse: () => void
}
