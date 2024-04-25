import BodyCard from '@components/cards/bodyCard/BodyCard'
import InstructorCalendar from '@features/instructors/instructorCalendar/InstructorCalendar'

function CalendarPage() {
  return <BodyCard title="calendar" children={<InstructorCalendar />} />
}

export default CalendarPage
