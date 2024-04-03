import { Stack } from '@mui/material'
import {
  StyledAvatar,
  StyledRectangularCard,
  StyledRectangularCardContent,
} from './instructorCard.style'
import { CustomRectangularCardProps } from './instructorCard.type'
import {
  InstructorJob,
  InstructorTitle,
} from '@features/home/homeCourses/coursesCard/courseCard.style'
import LabelWithIcon from '@components/labelWithIcon/LabelWithIcon'
import { Email } from '@mui/icons-material'
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined'

const InstructorCard = ({
  name,
  role,
  courseCount,
  email,
  imageUrl,
}: CustomRectangularCardProps) => {
  return (
    <StyledRectangularCard>
      <Stack
        direction={{ lg: 'row', sm: 'column' }}
        alignItems={{ sm: 'center', lg: 'flex-start' }}>
        <StyledAvatar src={imageUrl} alt={name} />
        <Stack
          alignItems={{ sm: 'center', lg: 'flex-start' }}
          spacing={2}
          p={3}>
          <InstructorTitle>{name}</InstructorTitle>
          <InstructorJob>{role}</InstructorJob>
          <StyledRectangularCardContent>
            <LabelWithIcon
              icon={<MenuBookOutlinedIcon />}
              label={courseCount.toString()}
            />
            <LabelWithIcon icon={<Email />} label={email} />
          </StyledRectangularCardContent>
        </Stack>
      </Stack>
    </StyledRectangularCard>
  )
}

export default InstructorCard
