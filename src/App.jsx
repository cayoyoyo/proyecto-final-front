import "./App.css";
import "./pages/ProductosPage/ProductosPage.css"
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";

import Navbar from "./components/Navbar/Navbar";
import IsPrivate from "./components/IsPrivate/IsPrivate";
import IsAnon from "./components/IsAnon/IsAnon";


import ProductosPage from "./pages/ProductosPage/ProductListPage";
import ProductosDetailPage from "./pages/ProductosPage/ProductDetailPage";
import EditProductForm from "./components/EditProductForm/EditProductForm";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


function App() {
  return (
    <div className="App">
      <Navbar />


      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/profile"
          element={
            <IsPrivate>
              <ProfilePage />
            </IsPrivate>
          }
        />

        <Route
          path="/signup"
          element={
            <IsAnon>
              <SignupPage />
            </IsAnon>
          }
        />
        <Route
          path="/login"
          element={
            <IsAnon>
              <LoginPage />
            </IsAnon>
          }
        />

        <Route path="/product" element={
          <IsPrivate>
            <ProductosPage />
          </IsPrivate>
        } />

        <Route path="/product/:id" element={
          <IsPrivate>
            <ProductosDetailPage />
          </IsPrivate>

        } />


        <Route path="/product/:id/edit" element={
          <IsPrivate>
            <EditProductForm />
          </IsPrivate>
        } />




      </Routes>


    </div>
  );
}

export default App;
