import { BrowserRouter, Routes, Route } from "react-router";
import BaseLayout from "./pages/BaseLayout";
import LoginPage from "./pages/LoginPage";
import ProductsPage from "./pages/ProductsPage";
import CreateProductPage from "./pages/CreateProductPage";
import EditProductPage from "./pages/EditProductPage";
import UploadImagePage from "./pages/UploadImagePage";
import CategoriesPage from "./pages/CategoriesPage";
import AddUserPage from "./pages/AddUserPage";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<BaseLayout />}>
            <Route path="/" element={<ProductsPage />} />
            <Route path="/add" element={<CreateProductPage />} />
            <Route path="/edit/:id" element={<EditProductPage />} />
            <Route path="/upload/:id" element={<UploadImagePage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/add-user" element={<AddUserPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
