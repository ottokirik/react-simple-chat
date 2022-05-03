import { Grid, Button, Dialog, Tab, Typography, Box } from '@mui/material'
import { useState } from 'react'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Conversations, Contacts } from '.'
import { useRecoilState, useRecoilValue } from 'recoil'
import { clientIdAtom, modalOpenAtom } from '../state/atoms'
import { ConversationModal, ContactModal } from '.'

const CONVERSATIONS_KEY = 'conversations'
const CONTACTS_KEY = 'contacts'

export const Sidebar = () => {
  const [tab, setTab] = useState('1')
  const [isModalOpen, setIsModalOpen] = useRecoilState(modalOpenAtom)

  const id = useRecoilValue(clientIdAtom)

  const handleTabChange = (event, newTab) => setTab(newTab)
  const handleModalOpen = () => setIsModalOpen(true)
  const handleModalClose = () => setIsModalOpen(false)

  return (
    <Grid container height="100vh" flexDirection="column">
      <Grid sx={{ overflow: 'auto' }} item flexGrow="1">
        <TabContext value={tab}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleTabChange}>
              <Tab label={CONVERSATIONS_KEY} value="1" />
              <Tab label={CONTACTS_KEY} value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Conversations />
          </TabPanel>
          <TabPanel value="2">
            <Contacts />
          </TabPanel>
        </TabContext>
      </Grid>
      <Grid sx={{ mx: 1, my: 2, textAlign: 'center' }} item>
        <Typography variant="overline">Your Id is: {id}</Typography>
        <Button fullWidth variant="contained" onClick={handleModalOpen}>
          New {tab === '1' ? 'Conversation' : 'Contact'}
        </Button>
      </Grid>
      <Dialog open={isModalOpen} onClose={handleModalClose} fullWidth maxWidth="sm">
        {tab === '1' ? <ConversationModal /> : <ContactModal />}
      </Dialog>
    </Grid>
  )
}
