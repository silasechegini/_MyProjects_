import {ChatEngine} from 'react-chat-engine';
import LoginForm from './components/LoginForm'
import ChatFeed from './components/ChatFeed';
import './App.css';

const App = () => {

  if (!localStorage.getItem('username')) return < LoginForm />
  return (
    <ChatEngine
      height="100vh"
      projectID="e78b3fc4-b46a-4518-8814-dc5384123473"
      userName={localStorage.getItem('username')}
      userSecret={localStorage.getItem('password')}
      renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
    />
  )
}

export default App;