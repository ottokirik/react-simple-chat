import { Box, Chip, Typography } from '@mui/material'
import { useCallback } from 'react'
import { useRecoilValue } from 'recoil'
import { activeConversationSelector } from '../state/selectors'

export const MessagesContent = () => {
  const { messages } = useRecoilValue(activeConversationSelector)
  const lastMessageIndex = messages.length - 1

  const setRef = useCallback((node) => {
    if (!node) return
    node.scrollIntoView({ smooth: true })
  }, [])

  return (
    <Box marginRight={2} sx={{ display: 'flex', flexDirection: 'column' }}>
      {messages.map(({ message, fromMe, senderName }, index) => (
        <Box key={index} my={1} textAlign={fromMe ? 'right' : 'left'} ref={lastMessageIndex === index ? setRef : null}>
          <Typography variant="overline" mx={1}>
            {fromMe ? 'You' : senderName}
          </Typography>
          <Chip label={message} color="primary" variant={fromMe ? 'filled' : 'outlined'} />
        </Box>
      ))}
    </Box>
  )
}
