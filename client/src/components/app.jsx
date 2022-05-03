import { useRecoilValue } from 'recoil'
import { clientIdAtom } from '../state/atoms'
import { Login, Dashboard } from '.'

export const App = () => {
  const id = useRecoilValue(clientIdAtom)
  return id ? <Dashboard /> : <Login />
}
