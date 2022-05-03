import { Box, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Button } from '@mui/material'
import LoginIcon from '@mui/icons-material/Login'
import { useSetRecoilState } from 'recoil'
import { clientIdAtom } from '../state/atoms'
import { v4 as uuidV4 } from 'uuid'
import { useState } from 'react'

export const Login = () => {
  const [id, setId] = useState('')
  const setClientId = useSetRecoilState(clientIdAtom)

  const handleChange = (event) => setId(event.target.value)

  const handleSubmit = (event) => {
    event.preventDefault()
    setClientId(id)
  }

  const handleCreateNewId = () => setClientId(uuidV4())

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <form onSubmit={handleSubmit}>
        <FormControl sx={{ m: 1, width: '30vw' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-">Enter your Id</InputLabel>
          <OutlinedInput
            id="outlined-adornment"
            value={id}
            onChange={handleChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton edge="end" type="submit">
                  <LoginIcon />
                </IconButton>
              </InputAdornment>
            }
            label="Enter your Id"
          />
          <Button sx={{ marginY: 2 }} variant="outlined" onClick={handleCreateNewId}>
            Create A new Id
          </Button>
        </FormControl>
      </form>
    </Box>
  )
}
