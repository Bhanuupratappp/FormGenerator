import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Forms from "./pages/Forms";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FormDetail from "./pages/FormDetail";
import Form from "./pages/Form";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Forms />} />
        <Route path="/forms/create" element={<Form />} />
        <Route path="/forms/:formId/details" element={<FormDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
