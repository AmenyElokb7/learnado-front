import { useState } from 'react'
import {
  Avatar,
  Collapse,
  DialogProps,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  Stack,
  Typography,
} from '@mui/material'

import { BLUE } from '@config/colors/colors'
import { StyledButton, StyledExpandIcon } from './courseModules.style'
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'

import play from '@assets/logo/play.svg'
import { CourseModuleProps } from './courseModule.type'
import { useNavigate } from 'react-router-dom'
import CourseModuleDetails from './courseModuleDetails/CourseModuleDetails'
import { PATHS } from '@config/constants/paths'

function CourseModule({
  title,
  media,
  duration,
  section,
  courseId,
  sectionId,
}: CourseModuleProps) {
  const [scroll, setScroll] = useState<DialogProps['scroll']>('paper')
  const [isOpened, setIsOpened] = useState(false)
  const [open, setOpen] = useState(false)

  const navigate = useNavigate()

  const handleClose = () => setOpen(false)

  const handleOpenDialog = (scrollType: DialogProps['scroll']) => () => {
    navigate(`${PATHS.COURSES.ROOT}/${courseId}/${sectionId}`)
    setOpen(true)
    setScroll(scrollType)
  }

  const onCollapseClick = () => setIsOpened((prev) => !prev)

  return (
    <Stack spacing={1}>
      <Stack
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        p={1}
        sx={{
          background: BLUE.light,
          borderRadius: '5px',
          cursor: 'pointer',
        }}
        onClick={onCollapseClick}>
        <Typography variant="h6">{title}</Typography>
        <Stack direction={'row'} spacing={1} alignItems={'center'}>
          <Typography variant="body2">{duration}</Typography>
          <IconButton>
            <StyledExpandIcon
              isopened={
                isOpened
                  ? GLOBAL_VARIABLES.TRUE_STRING
                  : GLOBAL_VARIABLES.FALSE_STRING
              }
            />
          </IconButton>
        </Stack>
      </Stack>
      <Collapse in={isOpened} timeout={700}>
        <Stack>
          <List>
            {media.map((item, index) => (
              <Stack p={1}>
                <Grid container>
                  <ListItem key={index}>
                    <Grid item sm={10} lg={11} md={10}>
                      <Stack direction={'row'} alignItems={'center'}>
                        <Avatar
                          variant="rounded"
                          sx={{ width: 20, height: 20 }}
                          src={play}
                        />
                        <StyledButton
                          onClick={handleOpenDialog('body')}
                          variant="text">
                          {item.title}
                        </StyledButton>
                      </Stack>
                    </Grid>
                  </ListItem>
                </Grid>
                <Divider />
              </Stack>
            ))}
          </List>
        </Stack>
      </Collapse>
      <Stack width={700}>
        <CourseModuleDetails
          open={open}
          onClose={handleClose}
          scroll={scroll}
          section={section}
        />
      </Stack>
    </Stack>
  )
}

export default CourseModule
