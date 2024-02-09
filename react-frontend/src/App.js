import './App.css';
import LandingPage from './Pages/MainPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import OverViewPage from './Pages/View/OverViewPage';
import EditorPage from './Pages/Editor/EditorPage';
import ProfilePage from './Pages/Profile/ProfilePage';
import SingleViewPage from './Pages/View/SingleViewPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/memes" element={<OverViewPage />} />
        <Route path="/editor" element={<EditorPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/single-view" element={<SingleViewPage />} />
        <Route path="/single-view/:id" element={<SingleViewPage />} />
      </Routes>
    </>
  );
}

export default App;
