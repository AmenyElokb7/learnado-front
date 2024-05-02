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

import { BLUE, GREY } from '@config/colors/colors'
import { StyledButton, StyledExpandIcon } from './courseModules.style'
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'

import play from '@assets/logo/play.svg'
import { CourseModuleProps } from './courseModule.type'
import { useNavigate } from 'react-router-dom'
import CourseModuleDetails from './courseModuleDetails/CourseModuleDetails'
import { PATHS } from '@config/constants/paths'
import { getUserFromLocalStorage } from '@utils/localStorage/storage'
import { useTranslation } from 'react-i18next'
import PsychologyAltOutlinedIcon from '@mui/icons-material/PsychologyAltOutlined'
import CourseQuizDetails from './courseModuleDetails/courseQuizDetails/CourseQuizDetails'
import QuizCountdown from './QuizCountdown'

function CourseModule({
  title,
  media,
  duration,
  section,
  courseId,
  sectionId,
  isEnrolled,
}: CourseModuleProps) {
  const [scroll, setScroll] = useState<DialogProps['scroll']>('paper')
  const [isOpened, setIsOpened] = useState(false)
  const [open, setOpen] = useState(false)
  const [openQuiz, setOpenQuiz] = useState(false)

  const { t } = useTranslation()

  const navigate = useNavigate()

  const handleClose = () => setOpen(false)

  const handleOpenDialog = (scrollType: DialogProps['scroll']) => () => {
    navigate(`${PATHS.COURSES.ROOT}/${courseId}/${sectionId}`)
    setOpen(true)
    setScroll(scrollType)
  }

  const handleOpenQuizDialog = () => {
    setOpenQuiz(true)
  }

  const onCollapseClick = () => setIsOpened((prev) => !prev)

  const isAuthenticated = getUserFromLocalStorage()
  const timeLeft = section?.quiz.timeLeft ?? 0
  console.log(timeLeft, 'timeLeft')
  return (
    <>
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
            <Typography variant="body2">
              {duration} {t('common.minutes')}
            </Typography>
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
        <Collapse in={isOpened} timeout={200}>
          <Stack>
            <List>
              {media.map((item, index) => (
                <Stack key={index}>
                  <Grid container>
                    <ListItem>
                      <Grid item sm={12}>
                        <Stack direction={'row'} alignItems={'center'}>
                          <Avatar
                            variant="rounded"
                            sx={{ width: 20, height: 20 }}
                            src={play}
                          />

                          <StyledButton
                            disabled={!isEnrolled ? true : false}
                            onClick={
                              isAuthenticated
                                ? handleOpenDialog('body')
                                : () => {
                                    navigate(
                                      `/${PATHS.AUTH.ROOT}/${PATHS.AUTH.LOGIN}`,
                                    )
                                  }
                            }
                            variant="text">
                            {item.title}
                          </StyledButton>
                        </Stack>
                        <Divider color={GREY.light} />
                      </Grid>
                    </ListItem>
                  </Grid>
                </Stack>
              ))}
              {(section?.quiz?.questions?.length ?? 0) > 1 && (
                <ListItem>
                  {timeLeft > 0 ? (
                    <QuizCountdown timeLeftInSeconds={timeLeft} />
                  ) : (
                    <Stack direction={'row'} alignItems={'center'}>
                      <PsychologyAltOutlinedIcon />
                      <StyledButton
                        onClick={handleOpenQuizDialog}
                        disabled={!isEnrolled || timeLeft > 0 ? true : false}>
                        <Typography
                          fontWeight={'medium'}
                          sx={{
                            '&:hover': {
                              textDecoration: 'none',
                              color: 'primary',
                            },
                          }}>
                          {t('section.quiz.quiz')}
                        </Typography>
                      </StyledButton>
                    </Stack>
                  )}
                </ListItem>
              )}
            </List>
          </Stack>
        </Collapse>

        <CourseQuizDetails
          open={openQuiz}
          onClose={() => setOpenQuiz(false)}
          section={section}
        />
      </Stack>
      <Stack>
        <CourseModuleDetails
          open={open}
          onClose={handleClose}
          scroll={scroll}
          section={section}
        />
      </Stack>
    </>
  )
}

export default CourseModule
