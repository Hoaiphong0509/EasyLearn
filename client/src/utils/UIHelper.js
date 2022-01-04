import { TOAST } from 'constants/AppConstants'
import Toast from 'components/Toast'
import ReactDOM from 'react-dom'
import { isServer } from './AppUltils'

export const showToast = ({ message, type }) => {
  if (isServer) return
  const node = document.getElementById(TOAST)
  const onclose = () => {
    ReactDOM.unmountComponentAtNode(node)
  }
  ReactDOM.render(
    <Toast message={message} type={type} onClose={onclose} />,
    node
  )
}
