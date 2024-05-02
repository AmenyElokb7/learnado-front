import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import allLocales from '@fullcalendar/core/locales-all'
import { useGetInstructorCoursesQuery } from '@redux/apis/courses/coursesApi'
import usePagination from 'src/hooks/usePagination'
import { useNavigate } from 'react-router-dom'
import { PATHS } from '@config/constants/paths'
import FallbackLoader from '@components/fallback/FallbackLoader'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { InstructorCalendarContainer } from './InstructorCalendar.style'

const InstructorCalendar = () => {
  const { queryParams } = usePagination()
  const { i18n } = useTranslation()
  const navigate = useNavigate()
  const [locale, setLocale] = useState(i18n.language)
  const { isLoading, data } = useGetInstructorCoursesQuery({
    ...queryParams,
    pagination: false,
  })

  const events = data?.data?.map((course) => ({
    id: String(course.id),
    title: course.title,
    start: course.startTime ? course.startTime : undefined,
    end: course.endTime ? course.endTime : undefined,
    extendedProps: {
      ...course,
    },
  }))

  const handleEventClick = ({ event }: any) => {
    navigate(PATHS.DASHBOARD.INSTRUCTOR.MY_COURSES + '/' + event.id)
  }

  useEffect(() => {
    const handleLanguageChange = () => {
      setLocale(i18n.language)
    }
    i18n.on('languageChanged', handleLanguageChange)
    return () => {
      i18n.off('languageChanged', handleLanguageChange)
    }
  }, [i18n])
  if (isLoading) return <FallbackLoader />
  return (
    <InstructorCalendarContainer>
      <FullCalendar
        eventTimeFormat={{
          hour: '2-digit',
          minute: '2-digit',
        }}
        headerToolbar={{
          start: 'title',
          center: 'dayGridMonth,timeGridWeek,timeGridDay',
          end: 'today prev,next',
        }}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locales={allLocales}
        locale={locale}
        events={events || []}
        eventClick={handleEventClick}
        dayMaxEvents={2}
      />
    </InstructorCalendarContainer>
  )
}

export default InstructorCalendar
