import ReportPage from './components/ReportPage';
import HomePage from './components/HomePage';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import BookView from './components/BookView';

function App() {

  return (
    <>
      <div style={{ backgroundColor: "powderblue", height: "100vh", display: "flex", overflow: "auto"}}>
          <div className='appContainer'>
            <Routes>
                <Route path="/authorPanel" element={<ReportPage></ReportPage>}></Route>
                <Route path="/bookPanel" element={<BookView></BookView>}></Route>
                <Route path="/" element={<HomePage></HomePage>}></Route>
            </Routes>
          </div>
      </div>
    </>
  );
}

export default App;