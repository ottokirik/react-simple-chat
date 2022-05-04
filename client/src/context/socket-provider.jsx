import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { clientIdAtom, conversationsAtom } from '../state/atoms'
import { io } from 'socket.io-client'

const SocketContext = createContext()
const socketUrl = 'ws://localhost:5000'

const isArraysEqual = (a = [], b = []) => {
  if (a.length !== b.length) return false

  const newA = [...a]
  const newB = [...b]

  newA.sort()
  newB.sort()

  return newA.every((element, index) => {
    return element === newB[index]
  })
}

export const useSocket = () => useContext(SocketContext)

export const SocketProvider = ({ children }) => {
  const id = useRecoilValue(clientIdAtom)
  const [socket, setSocket] = useState(null)

  const [conversations, setConversations] = useRecoilState(conversationsAtom)

  useEffect(() => {
    const newSocket = io(socketUrl, { query: { id }, transports: ['websocket'] })
    setSocket(newSocket)
  }, [id])

  const addNewMessages = useCallback(
    ({ recipients, sender, message }) => {
      const activeConversation = conversations.findIndex((conversation) => {
        return isArraysEqual(conversation?.recipients, recipients)
      })

      if (activeConversation === -1) {
        setConversations((prevConversations) => [...prevConversations, { recipients, messages: [{ sender, message }] }])
      } else {
        setConversations((prevConversations) =>
          prevConversations.reduce((acc, conversation, index) => {
            if (index === activeConversation)
              return [...acc, { ...conversation, messages: [...conversation.messages, { sender, message }] }]
            return [...acc, { ...conversation }]
          }, [])
        )
      }
    },
    [conversations, setConversations]
  )

  useEffect(() => {
    if (!socket) return

    socket.on('receive-message', addNewMessages)

    return () => socket.off('receive-message')
  }, [socket, addNewMessages])

  useEffect(() => () => socket?.close(), [socket])

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
}
