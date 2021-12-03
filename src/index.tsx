import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import About from "./components/About";
import AdminSignup from "./components/AdminSignup";
import AllPosts from "./components/AllPosts";
import AllPostsAdmin from "./components/AllPostsAdmin";
import EditPost from "./components/EditPost";
import ErrorMessage from "./components/ErrorMessage";
import Header from "./components/Header";
import Login from "./components/Login";
import Logout from "./components/Logout";
import NewPost from "./components/NewPost";
import Post from "./components/Post";
import RequireAdmin from "./components/RequireAdmin";
import Signup from "./components/Signup";
import { AuthProvider } from "./hooks/useAuth";
import "./index.scss";
import reportWebVitals from "./reportWebVitals";
export const BASE_URL = "https://blog-i3b.herokuapp.com";

ReactDOM.render(
    <Router>
        <AuthProvider>
            <Header />
            <Routes>
                <Route path="/" element={<AllPosts />}></Route>
                <Route path="/posts/:postId" element={<Post />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/signup" element={<Signup />}></Route>
                <Route path="/logout" element={<Logout />}></Route>
                <Route path="/becomeadmin" element={<AdminSignup />}></Route>
                <Route path="/about" element={<About />}></Route>
                <Route path="/admin" element={<RequireAdmin />}>
                    <Route path="/admin/" element={<AllPostsAdmin />}></Route>
                    <Route path="/admin/new" element={<NewPost />}></Route>
                    <Route
                        path="/admin/posts/:postId/edit"
                        element={<EditPost />}
                    ></Route>
                </Route>
                <Route
                    path="/*"
                    element={<ErrorMessage message="404 Page not found" />}
                ></Route>
            </Routes>
        </AuthProvider>
    </Router>,
    document.getElementById("root")
);
reportWebVitals();
