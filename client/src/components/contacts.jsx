import { List, ListItem } from '@mui/material'
import { useRecoilValue } from 'recoil'
import { contactsAtom } from '../state/atoms'

export const Contacts = () => {
  const contactsList = useRecoilValue(contactsAtom)

  return (
    <List>
      {contactsList.map((contact) => (
        <ListItem key={contact.id}>{contact.name}</ListItem>
      ))}
    </List>
  )
}
