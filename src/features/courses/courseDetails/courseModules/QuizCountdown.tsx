import { useState, useEffect } from 'react'
import { Stack, Typography } from '@mui/material'
import timer from '@assets/logo/icon-02.svg'
import { useTranslation } from 'react-i18next'

interface QuizCountdownProps {
  timeLeftInSeconds: number
}

export default function QuizCountdown({
  timeLeftInSeconds,
}: QuizCountdownProps) {
  const [timeLeft, setTimeLeft] = useState(timeLeftInSeconds)
  const { t } = useTranslation()

  useEffect(() => {
    if (timeLeft <= 0) {
      return
    }
    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1)
    }, 1000)

    return () => clearInterval(timerId)
  }, [])

  const formatTimeLeft = () => {
    const hours = Math.floor(timeLeft / 3600)
    const minutes = Math.floor((timeLeft % 3600) / 60)
    const seconds = timeLeft % 60
    return `${hours < 10 ? '0' + hours : hours}:${
      minutes < 10 ? '0' + minutes : minutes
    }:${seconds < 10 ? '0' + seconds : seconds}`
  }

  return (
    <Stack direction={'row'} alignItems={'center'} spacing={2}>
      <img src={timer} alt={t('section.quiz.time_left')} />
      <Typography fontWeight={'medium'}>
        {t('section.quiz.next_attempt')} {formatTimeLeft()}
      </Typography>
    </Stack>
  )
}
