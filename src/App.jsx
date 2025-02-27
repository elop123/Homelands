import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainLayout } from "./layout/MainLayout";
import { FrontPage} from './pages/FrontPage'
import { LoginPage } from "./pages/LoginPage";
import { HousesPage } from "./pages/HousesPage";
import { HousesDetailsPage } from "./pages/HousesDetailsPage";
import './App.css'
import { AdministrationPage } from "./pages/AdministrationPage";
import { SearchPage } from "./pages/SearchPage";


function App() {
  return (
   
    <Router>
      <Routes>
      <Route path="/" element={<MainLayout />}>
      <Route index element={<FrontPage />} />
      <Route path="houses" element={<HousesPage />} />
      <Route path="houses/:id" element={<HousesDetailsPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="administration" element={<AdministrationPage />} />
      <Route path="search/:keyword" element={<HousesPage />} />
      </Route>
      </Routes>
    </Router>
  );
}

export default App;