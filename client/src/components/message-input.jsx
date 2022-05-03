import { FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { activeConversationAtom, clientIdAtom, conversationsAtom } from '../state/atoms'

export const MessageInput = () => {
  const [message, setMessage] = useState('')

  const handleChange = (event) => setMessage(event.target.value)

  const id = useRecoilValue(clientIdAtom)
  const setConversations = useSetRecoilState(conversationsAtom)
  const conversationId = useRecoilValue(activeConversationAtom)

  const handleSubmit = (event) => {
    event.preventDefault()

    if (message.trim() === '') return

    setConversations((prevConversations) =>
      prevConversations.reduce((acc, conversation, index) => {
        if (index === conversationId) {
          return [...acc, { ...conversation, messages: [...conversation.messages, { sender: id, message }] }]
        }
        return [...acc, { ...conversation }]
      }, [])
    )

    setMessage('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormControl sx={{ m: 1, width: '95%' }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-">Enter your message</InputLabel>
        <OutlinedInput
          id="outlined-adornment"
          value={message}
          onChange={handleChange}
          multiline
          endAdornment={
            <InputAdornment position="end">
              <IconButton edge="end" type="submit">
                <SendIcon />
              </IconButton>
            </InputAdornment>
          }
          label="Enter your message"
        />
      </FormControl>
    </form>
  )
}
