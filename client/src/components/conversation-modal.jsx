import { DialogTitle, DialogContent, Typography, FormControl, Button, FormControlLabel, Checkbox } from '@mui/material'
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil'
import { contactsAtom, modalOpenAtom, conversationsAtom, activeConversationAtom } from '../state/atoms'
import { useState } from 'react'

export const ConversationModal = () => {
  const contacts = useRecoilValue(contactsAtom)
  const [selectedContact, setSelectedContact] = useState([])

  const setActiveConversation = useSetRecoilState(activeConversationAtom)
  const openModal = useSetRecoilState(modalOpenAtom)
  const [conversations, setConversations] = useRecoilState(conversationsAtom)

  const handleChange = (contactId) => (event) => {
    const {
      target: { checked },
    } = event

    setSelectedContact((prevState) => {
      if (checked) return [...prevState, contactId]
      else return prevState.filter((id) => id !== contactId)
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setConversations((prevConversations) => [...prevConversations, { recipients: selectedContact, messages: [] }])

    setActiveConversation(conversations.length)

    openModal(false)
  }
  return (
    <>
      <DialogTitle>
        <Typography>Start Conversation</Typography>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth>
            {contacts.map((contact) => (
              <FormControlLabel
                key={contact.id}
                control={<Checkbox onChange={handleChange(contact.id)} />}
                label={contact.name}
              />
            ))}
            <Button type="submit">Start conversation</Button>
          </FormControl>
        </form>
      </DialogContent>
    </>
  )
}
