import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/auth/login";
import SignUp from "./Components/auth/signup";
import PrivateRoute from "./Components/auth/privateRoute";
import Home from "./Components/dashboard/home";
import UploadBooks from "./Components/books/uploadBook";
import BookPage from "./Components/books/book";
import SearchPage from "./Components/dashboard/searchPage";
import NotFoundPage from "./Components/error/404page";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/upload-book" element={<UploadBooks />} />
          <Route path="/books/search/:query" element={<SearchPage />} />
          <Route path="/books/:id" element={<BookPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
