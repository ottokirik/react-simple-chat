import { atom, DefaultValue } from 'recoil'

const LOCAL_STORAGE_CLIENT_ID = 'CLIENT_ID'
const LOCAL_STORAGE_CLIENT_CONTACTS = 'CLIENT_CONTACTS'
const LOCAL_STORAGE_CLIENT_RECIPIENTS = 'CLIENT_RECIPIENTS'

export const clientIdAtom = atom({
  key: 'clientId',
  default: '',
  effects: [
    ({ onSet, setSelf }) => {
      const storedId = localStorage.getItem(LOCAL_STORAGE_CLIENT_ID)

      if (storedId !== null) setSelf(JSON.parse(storedId))

      onSet((newClientId) => {
        if (newClientId instanceof DefaultValue) localStorage.removeItem(LOCAL_STORAGE_CLIENT_ID)
        else localStorage.setItem(LOCAL_STORAGE_CLIENT_ID, JSON.stringify(newClientId))
      })
    },
  ],
})

export const modalOpenAtom = atom({
  key: 'modalOpen',
  default: false,
})

export const contactsAtom = atom({
  key: 'contacts',
  default: [],
  effects: [
    ({ onSet, setSelf }) => {
      const storedContacts = localStorage.getItem(LOCAL_STORAGE_CLIENT_CONTACTS)

      if (storedContacts !== null) setSelf(JSON.parse(storedContacts))

      onSet((newContactsList) => {
        if (newContactsList instanceof DefaultValue) localStorage.removeItem(LOCAL_STORAGE_CLIENT_CONTACTS)
        else localStorage.setItem(LOCAL_STORAGE_CLIENT_CONTACTS, JSON.stringify(newContactsList))
      })
    },
  ],
})

export const conversationsAtom = atom({
  key: 'conversations',
  default: [],
  effects: [
    ({ onSet, setSelf }) => {
      const storedRecipients = localStorage.getItem(LOCAL_STORAGE_CLIENT_RECIPIENTS)

      if (storedRecipients !== null) setSelf(JSON.parse(storedRecipients))

      onSet((newContactsList) => {
        if (newContactsList instanceof DefaultValue) localStorage.removeItem(LOCAL_STORAGE_CLIENT_RECIPIENTS)
        else localStorage.setItem(LOCAL_STORAGE_CLIENT_RECIPIENTS, JSON.stringify(newContactsList))
      })
    },
  ],
})

export const activeConversationAtom = atom({
  key: 'activeConversation',
  default: null,
})
