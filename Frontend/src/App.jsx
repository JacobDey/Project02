import { 
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import Menu from './pages/Menu';

const DummyPage = () => <div>Test Passssge</div>;


const App = () => {
  console.log("App component rendered");

  return <DummyPage />;

  // return (
  //   <BrowserRouter>
  //     <Routes>
  //       <Route path='/restaurant' element={<Menu />} />
  //       <Route path='/dummy' element={<DummyPage />} />
  //     </Routes>
  //   </BrowserRouter>
  // );
};

export default App;