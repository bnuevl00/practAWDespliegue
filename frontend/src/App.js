import "./App.css";
import Login from "./pages/login.js";
import Admin from "./pages/admin.js";
import NewFilm from "./pages/nueva.js";
import ModifyFilm from "./pages/modifyFilms.js";
import Modify from "./pages/modify.js";
import Remove from "./pages/borrar.js";
import AdminUsers from "./pages/administrarUsuario.js"
import User from "./pages/user";
import Show from "./pages/showFilms";
import Register from "./pages/signup"
import Contacto from "./pages/contact"
import Mensajes from "./pages/mensajes"
import Response from "./pages/response"

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/admin/:user/:idUser" element={<Admin />} />
          <Route path="/nueva/:type/:user/:idUser" element={<NewFilm />} />
          <Route path="/modifyFilms/:type/:user/:idUser" element={<ModifyFilm />} />
          <Route path="/modify/:idFilm/:user/:idUser" element={<Modify />} />
          <Route path="/borrar/:type/:user/:idUser" element={<Remove />} />
          <Route path="/administrarUsuarios/:user/:idUser" element={<AdminUsers />} />
          <Route path="/user/:user/:idUser" element={<User />} />
          <Route path="/show/:type/:mode/:user/:idUser" element={<Show />} />
          <Route path="/contact/:user/:idUser" element={<Contacto />} />
          <Route path="/messages" element={<Mensajes />} />
          <Route path="/response/:idMessage" element={<Response />} />
        </Routes>
      </Router>
    </LocalizationProvider>
  );
}

export default App;
