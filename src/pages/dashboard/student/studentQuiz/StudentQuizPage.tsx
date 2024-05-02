import BodyCard from '@components/cards/bodyCard/BodyCard'
import StudentQuizTable from './studentQuizTable/StudentQuizTable'

function StudentQuizPage() {
  return (
    <BodyCard title="Quiz Attempts">
      <StudentQuizTable />
    </BodyCard>
  )
}

export default StudentQuizPage
