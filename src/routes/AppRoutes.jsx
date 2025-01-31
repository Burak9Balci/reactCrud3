import { Routes, Route } from "react-router-dom";
import CategoryAdd from "../components/category/CategoryAdd";
import CategoryUpdate from "../components/category/CategoryUpdate";
import CategoryList from "../components/category/CategoryList";
import ProductAdd from "../components/product/ProductAdd";
import ProductList from "../components/product/ProductList";
import ProductUpdate from "../components/product/ProductUpdate";
import Home from "../components/user/Home";
import Dashboard from "../components/user/dashboard/Dashboard";
import Profile from "../components/user/Profile";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/categories/Add" element={<CategoryAdd />} />
      <Route path="/categories/Update/:id" element={<CategoryUpdate />} />
      <Route path="/categories" element={<CategoryList />} />
      <Route path="/products/Add" element={<ProductAdd />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/dashboard/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/products/Update/:id" element={<ProductUpdate />} />
    </Routes>
  );
};
export default AppRoutes;
