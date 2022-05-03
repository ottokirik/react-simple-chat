import { selector } from 'recoil'
import { activeConversationAtom, contactsAtom, conversationsAtom, clientIdAtom } from './atoms'

export const conversationsSelector = selector({
  key: 'fullContacts',
  get: ({ get }) => {
    const conversations = get(conversationsAtom)
    const contacts = get(contactsAtom)
    const id = get(clientIdAtom)

    return conversations.map((conversation) => {
      const recipients = conversation.recipients.map((recipient) => {
        const contact = contacts.find((contact) => contact.id === recipient)
        const name = (contact && contact.name) || recipient

        return { id: recipient, name }
      })

      const messages = conversation.messages.map((message) => {
        const contact = contacts.find((contact) => contact.id === message.sender)
        const name = (contact && contact.name) || message.sender

        const fromMe = id === message.sender

        return { ...message, senderName: name, fromMe }
      })

      return { ...conversation, recipients, messages }
    })
  },
})

export const activeConversationSelector = selector({
  key: 'activeConversationSelector',
  get: ({ get }) => {
    const activeConversationId = get(activeConversationAtom)
    const conversations = get(conversationsSelector)

    return conversations[activeConversationId]
  },
})
