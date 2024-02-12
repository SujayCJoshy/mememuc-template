import './App.css';
import LandingPage from './Pages/MainPage/MainPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import OverviewPage from './Pages/Overview/OverviewPage';
import EditorPage from './Pages/Editor/EditorPage';
import ProfilePage from './Pages/Profile/ProfilePage';
import SingleViewPage from './Pages/Singleview/SingleViewPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/memes" element={<OverviewPage />} />
        <Route path="/editor" element={<EditorPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/single-view" element={<SingleViewPage />} />
        <Route path="/single-view/:id" element={<SingleViewPage />} />
      </Routes>
    </>
  );
}

export default App;
