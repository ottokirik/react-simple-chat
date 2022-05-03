import { Grid } from '@mui/material'
import { MessageInput, MessagesContent } from '.'

export const ActiveConversation = () => {
  return (
    <Grid container flexDirection="column" flexWrap="nowrap" height="100vh" spacing={2}>
      <Grid item flexGrow="1" width="100%" overflow="auto" mt={2}>
        <MessagesContent />
      </Grid>
      <Grid item width="100%">
        <MessageInput />
      </Grid>
    </Grid>
  )
}
