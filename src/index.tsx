import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import About from "./components/About";
import AllPosts from "./components/AllPosts";
import Header from "./components/Header";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Post from "./components/Post";
import Signup from "./components/Signup";
import { AuthProvider } from "./hooks/useAuth";
import "./index.scss";
import reportWebVitals from "./reportWebVitals";
export const BASE_URL = "http://localhost:3000";

ReactDOM.render(
    <Router>
        <AuthProvider>
            <Header />
            <Routes>
                {/* <Route path="/" element={<AllPosts />}></Route> */}
                <Route path="/" element={<AllPosts />}></Route>
                <Route path="/posts/:postId" element={<Post />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/signup" element={<Signup />}></Route>
                <Route path="/logout" element={<Logout />}></Route>

                <Route path="/about" element={<About />}></Route>
            </Routes>
        </AuthProvider>
    </Router>,
    document.getElementById("root")
);
reportWebVitals();
