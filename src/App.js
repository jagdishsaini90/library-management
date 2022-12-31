import React, { Suspense, lazy } from "react";
import { CircularProgress } from "@mui/material";
import { Route, Routes } from "react-router-dom";
const IssueBook = lazy(() => import("./Components/books/issueBook"));
const Login = lazy(() => import("./Components/auth/login"));
const SignUp = lazy(() => import("./Components/auth/signup"));
const PrivateRoute = lazy(() => import("./Components/auth/privateRoute"));
const Home = lazy(() => import("./Components/dashboard/home"));
const UploadBooks = lazy(() =>
  import("./Components/books/uploadBook/uploadBook")
);
const BookPage = lazy(() => import("./Components/books/singleBook/book"));
const SearchPage = lazy(() => import("./Components/dashboard/searchPage"));
const NotFoundPage = lazy(() => import("./Components/error/404page"));

function App() {
  return (
    <div>
      <Routes>
        <Route
          path="/login"
          element={
            <Suspense fallback={<CircularProgress />}>
              <Login />
            </Suspense>
          }
        />

        <Route
          path="/signup"
          element={
            <Suspense fallback={<CircularProgress />}>
              <SignUp />
            </Suspense>
          }
        />

        <Route
          path="/"
          element={
            <Suspense fallback={<CircularProgress />}>
              <PrivateRoute />
            </Suspense>
          }
        >
          <Route
            path="/"
            element={
              <Suspense fallback={<CircularProgress />}>
                <Home />
              </Suspense>
            }
          />

          <Route
            path="/upload-book"
            element={
              <Suspense fallback={<CircularProgress />}>
                <UploadBooks />
              </Suspense>
            }
          />
          <Route
            path="/issue-book"
            element={
              <Suspense fallback={<CircularProgress />}>
                <IssueBook />
              </Suspense>
            }
          />
          <Route
            path="/books/search/:query"
            element={
              <Suspense fallback={<CircularProgress />}>
                <SearchPage />
              </Suspense>
            }
          />
          <Route
            path="/books/:id"
            element={
              <Suspense fallback={<CircularProgress />}>
                <BookPage />
              </Suspense>
            }
          />
        </Route>

        <Route
          path="*"
          element={
            <Suspense fallback={<CircularProgress />}>
              <NotFoundPage />
            </Suspense>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
