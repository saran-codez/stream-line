import { Route, Routes, useLocation } from "react-router-dom";
import Applications from "./Applications/Applications";
import Home from "./Home/Home";
import LogInPage from "./Login/LogInPage";
import RecruiterPanel from "./RecruiterPanel/RecruiterPanel";
import RegisterPage from "./RegisterPage/RegisterPage";
import ResetPage from "./ResetPage/ResetPage";
import UserPanel from "./User/UserPanel";

const PageRoutes = () => {
  const location = useLocation();
  return (
    <Routes key={location}>
      <Route path="/" element={<LogInPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/reset" element={<ResetPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/recruiter" element={<RecruiterPanel />} />
      <Route path="/user" element={<UserPanel />} />
      <Route path="/recruiter/applications/:jobId" element={<Applications />} />
    </Routes>
  );
};
export default PageRoutes;
