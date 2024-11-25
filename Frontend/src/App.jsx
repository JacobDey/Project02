import { 
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import Menu from './pages/Menu';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/restaurant' element={<Menu />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
