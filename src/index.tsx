import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./components/auth/AuthProvider";
import { AppStateProvider } from "./components/state/AppStateProvider";
import reportWebVitals from "./reportWebVitals";
import { Layout } from "./components/layout/Layout";
import { LoginPage } from "./components/pages";
import { NoMatchPage } from "./components/pages/NoMatchPage";
import { PostsPage } from "./components/pages/posts/PostsPage";
import { Posts } from "./components/pages/posts/Posts";
import "./static/reset.css";
import "./static/main.css";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <AppStateProvider>
        <BrowserRouter basename="/posts-manager">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Navigate to="/posts" replace />} />
              <Route path="posts" element={<PostsPage />}>
                <Route path=":userId" element={<Posts />} />
              </Route>
              <Route path="login" element={<LoginPage />} />
              <Route path="*" element={<NoMatchPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppStateProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root"),
);

reportWebVitals();
