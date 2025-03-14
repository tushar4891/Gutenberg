import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./component/Home";
import { BookList } from "./component/BookList";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" and element={<Home />} />
          <Route path="/books/:category" element={<BookList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
