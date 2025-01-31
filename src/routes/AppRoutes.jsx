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
import NotFound from "";
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
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
export default AppRoutes;
// 24. satırdaki route farazi olarak yalnış bir url girildiğinde bizi bir 404 not found sayfasına yönlendirir tabi bu sayfa nın açılması gerekli
