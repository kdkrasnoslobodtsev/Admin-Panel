import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import AccountBoard from './scenes/accountBoard';
import Enter from './scenes/enter';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/*' element={<Enter/>}/>
        {!!sessionStorage.getItem('token') && <Route path='/home/*' element={<AccountBoard/>}/>}
      </Routes>
    </div>
  )
}

export default App;
