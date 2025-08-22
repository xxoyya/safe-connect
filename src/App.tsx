// src/App.tsx
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Edu from "./pages/Edu";
import Data from "./pages/Data";
import Self from "./pages/Self";
import Result from "./pages/Result";
import Chat from "./pages/Chat";
import "./App.css";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edu" element={<Edu />} />
          <Route path="/data" element={<Data />} />
          <Route path="/self" element={<Self />} />
          <Route path="/result" element={<Result />} />
          <Route path="/chat" element={<Chat />} />
          <Route
            path="*"
            element={<div style={{ padding: 24 }}>Not Found</div>}
          />
        </Routes>
      </main>
      <Footer />
    </>
  );
}