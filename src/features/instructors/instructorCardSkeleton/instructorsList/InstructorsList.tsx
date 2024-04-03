import InstructorCard from '@features/instructors/InstructorCard/InstructorCard'
import { useTranslation } from 'react-i18next'
import { InstructorsListProps } from './instructorsList.type'
import NoDataFound from '@components/noDataFound/NoDataFound'
import InstructorsListSkeleton from './instructorsListSkeleton/InstructorsListSkeleton'

function InstructorsList({ instructors, isLoading }: InstructorsListProps) {
  const { t } = useTranslation()
  if (instructors?.length === 0)
    return <NoDataFound message={t('home.no_course_found')} />

  if (isLoading) return <InstructorsListSkeleton />

  return (
    <>
      {Boolean(instructors) &&
        instructors?.map((instructor) => (
          <InstructorCard
            key={instructor.id}
            name={`${instructor.firstName} ${instructor.lastName}`}
            courseCount={instructor?.coursesCount || 0}
            email={instructor.email}
            role={t('course.instructor')}
            imageUrl={instructor?.media[0]?.fileName}
            isLoading={isLoading}
          />
        ))}
    </>
  )
}

export default InstructorsList
