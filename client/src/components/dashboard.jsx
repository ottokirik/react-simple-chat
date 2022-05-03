import { Grid } from '@mui/material'
import { useRecoilValue } from 'recoil'
import { Sidebar, ActiveConversation } from '.'
import { activeConversationAtom } from '../state/atoms'

export const Dashboard = () => {
  const activeConversation = useRecoilValue(activeConversationAtom)

  return (
    <Grid container spacing={2}>
      <Grid item xs={3} sx={{ borderRight: 1, borderColor: 'divider' }}>
        <Sidebar />
      </Grid>
      <Grid item xs={9}>
        {activeConversation !== null && <ActiveConversation />}
      </Grid>
    </Grid>
  )
}
