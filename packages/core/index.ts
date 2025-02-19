import { makeInStaller } from '@vant4-kit/utils'
import components from './components'
import '@vant4-kit/theme/index.css'

const installer = makeInStaller(components)

export * from '../components'
export default installer