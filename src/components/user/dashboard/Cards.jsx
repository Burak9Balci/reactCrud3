import ApiService from "../../../services/ApiService";
//import ApiService from "@services/ApiService"; // Alias ı bütün denemelerime rağmen çalıştıramadım
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Cards = () => {
  const api = new ApiService("http://localhost:3000");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await api.getAll("categories");
        const productsData = await api.getAll("products");
        setCategories(categoriesData);
        setProducts(productsData);
      } catch (error) {
        console.error("Veriler alınırken hata oluştu:", error);
      }
    };
    fetchData();
  }, []); // boş parantezz koydukki sayfa render edildiğinde birkez çalışsın oda hata yoksa
  return (
    <main className="container">
      <Link to="/categories">
        <h3>Categories</h3>
      </Link>
      <div className="flex white-text">
        {categories.map((category) => (
          <div key={category.id} className="card categoryCard">
            <h3>Category Id : {category.id}</h3>
            <p>Category Adı : {category.categoryName}</p>
            <p>Category Açıklaması : {category.description}</p>
          </div>
        ))}
      </div>
      <Link to="/products">
        <h3>Products</h3>
      </Link>
      <div className="flex white-text">
        {products.map((product) => (
          <div key={product.id} className="card productCard">
            <h3>Ürünü ID : {product.id}</h3>
            <p>Ürün ismi : {product.productName}</p>
            <p>Fiyat : {product.price}</p>
            <p>Category ID : {product.categoryId}</p>
          </div>
        ))}
      </div>
    </main>
  );
}; //Link bize proje içinde bir sayfaya yönlendirmemizi sağlıyor
export default Cards;
