import { useState } from 'react'
import {
  Avatar,
  Collapse,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  Stack,
  Typography,
} from '@mui/material'

import { BLUE } from '@config/colors/colors'
import { StyledExpandIcon } from './courseModules.style'
import CustomLink from '@components/customLink/CustomLink'
import { PATHS } from '@config/constants/paths'
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'

import play from '@assets/logo/play.svg'
import { CourseModuleProps } from './courseModule.type'

function CourseModule({ title, media, duration }: CourseModuleProps) {
  const [isOpened, setIsOpened] = useState(false)

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
                        <CustomLink
                          isActive={false}
                          to={`${PATHS.COURSES}/${item.id}`}
                          label={item.title}
                        />
                      </Stack>
                    </Grid>
                    <Grid item sm={2} lg={1} md={2}>
                      <Typography variant="body2">{duration}</Typography>
                    </Grid>
                  </ListItem>
                </Grid>

                <Divider />
              </Stack>
            ))}
          </List>
        </Stack>
      </Collapse>
    </Stack>
  )
}

export default CourseModule
