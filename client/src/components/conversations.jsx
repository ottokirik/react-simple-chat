import { List, ListItem, ListItemButton } from '@mui/material'
import { useRecoilValue, useRecoilState } from 'recoil'
import { activeConversationAtom } from '../state/atoms'
import { conversationsSelector } from '../state/selectors'

export const Conversations = () => {
  const conversationsList = useRecoilValue(conversationsSelector)
  const [selectedConversation, setActiveConversation] = useRecoilState(activeConversationAtom)

  const handleClick = (index) => () => setActiveConversation(index)

  return (
    <List>
      {conversationsList.map(({ recipients }, index) => (
        <ListItemButton selected={index === selectedConversation} key={index} onClick={handleClick(index)}>
          <ListItem>{recipients.map((recipient) => recipient.name).join(', ')}</ListItem>
        </ListItemButton>
      ))}
    </List>
  )
}
