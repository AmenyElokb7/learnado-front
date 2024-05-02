import BodyCard from '@components/cards/bodyCard/BodyCard'
import Calendar from '@features/calendar/Calendar'

function CalendarPage() {
  return <BodyCard title="calendar" children={<Calendar />} />
}

export default CalendarPage
