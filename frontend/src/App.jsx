
import { BrowserRouter  as Router} from 'react-router-dom';
import Header from './Components/Header/Header';
import Login from './Components/Login/Login';

function App() {
  return (
    <Router>
       <Header />
       <Login />
    </Router>
  )
}

export default App
