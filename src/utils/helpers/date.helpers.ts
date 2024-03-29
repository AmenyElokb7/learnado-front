import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
dayjs.extend(duration)

export const transformCourseDuration = (durationInMinutes: number): string => {
  const dur = dayjs.duration(durationInMinutes, 'minutes')
  const hours = dur.hours()
  const minutes = dur.minutes()
  return `${hours > 0 ? `${hours}h` : GLOBAL_VARIABLES.EMPTY_STRING}${
    hours > 0 && minutes > 0
      ? GLOBAL_VARIABLES.SINGLE_SPACE
      : GLOBAL_VARIABLES.EMPTY_STRING
  }${minutes > 0 ? `${minutes}m` : GLOBAL_VARIABLES.EMPTY_STRING}`
}
