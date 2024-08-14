import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminMain from './components/AdminMain';
import Login from './components/Login';
import AdminHeader from './components/Admin/Header';
import GradeManager from './components/Admin/GradeManager';
import Main from './components/Admin/Main'
import StudentMain from './components/Student/StudentMain'
import StudentManager from './components/Student/StudentManager'
import StudentRegister from './components/StudentRegister';
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<AdminMain />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Main />} />
          <Route path="/grades/*" element={<GradeManager />} />
          <Route path="/student/*" element={<StudentManager />} />
          <Route path="/StudentRegister" element={<StudentRegister/>}/>
          <Route path="/student" element={<StudentMain/>}/>
          {/* Add other routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}
///Users/g.jayaaltrin/Documents/myproject1/src/components/StudentRegister.css
export default App;
