import "./App.css";
import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./layouts/ProtectedRoute";

function App() {
  return (
    <ProtectedRoute role={undefined}>
      <MainLayout></MainLayout>
    </ProtectedRoute>
  );
}

export default App;
