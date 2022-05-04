import { Button, DialogContent, DialogTitle, FormControl, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { contactsAtom, modalOpenAtom } from '../state/atoms'

export const ContactModal = () => {
  const [name, setName] = useState('')
  const [id, setId] = useState('')

  const openModal = useSetRecoilState(modalOpenAtom)
  const addNewContact = useSetRecoilState(contactsAtom)

  const handleChange = (setter) => (event) => setter(event.target.value.toLowerCase())

  const handleSubmit = (event) => {
    event.preventDefault()
    addNewContact((prevContactsList) => [...prevContactsList, { id, name }])

    openModal(false)
  }

  return (
    <>
      <DialogTitle>
        <Typography>Create New Contact</Typography>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth>
            <TextField
              type="text"
              label="Id"
              required
              fullWidth
              sx={{ my: 2 }}
              value={id}
              onChange={handleChange(setId)}
            />
            <TextField
              type="text"
              label="Name"
              required
              fullWidth
              sx={{ my: 2 }}
              value={name}
              onChange={handleChange(setName)}
            />
            <Button type="submit">Save Contact</Button>
          </FormControl>
        </form>
      </DialogContent>
    </>
  )
}
