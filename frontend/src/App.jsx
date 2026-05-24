import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Chat from "./pages/Chat";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  return (
    <Routes>

      <Route
        path="/"
        element={<Navigate to="/chat" />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/chat"
        element={
          <ProtectedRoute>
            <Chat />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;