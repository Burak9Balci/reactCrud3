import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../services/ApiService";

const ProductList = () => {
  const api = new ApiService();
  const navigate = useNavigate();
  const [selectedIds, setSelectedProductIds] = useState([]);
  const [products, setproducts] = useState([]);
  useEffect(() => {
    const getCategories = async () => {
      try {
        const products = await api.getAll("products");
        setproducts(products);
      } catch (error) {
        alert("product lar getirilemedi");
      }
    };
    getCategories();
  }, []);
  const handleDelete = async () => {
    if (selectedIds.length === 0) {
      alert("checkbox seç");
      return;
    }
    try {
      for (const id of selectedIds) {
        await api.makeDelete("products", id);
      }
      setproducts((prev) => {
        return prev.filter((product) => {
          return !selectedIds.includes(product.id);
        });
      });
      setSelectedProductIds([]);
    } catch (error) {
      alert("Silemedin");
    }
  };
  const handleCheckbox = (id) => {
    setSelectedProductIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((productId) => {
          productId !== id;
        });
      } else {
        return [...prev, id];
      }
    });
  };
  const handleUpdate = () => {
    if (selectedIds.length === 0) {
      alert("checkBox secin");
      return;
    }
    if (selectedIds.length > 1) {
      alert("sadece 1 tane checkbox seç");
    }
    navigate(`/products/Update/${selectedIds}`);
  };
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>ProductName</th>
          <th>Price</th>
          <th>Catogory ID</th>
          <th>
            <button onClick={() => navigate("/products/Add")}>Ekleme</button>
          </th>
          <th>
            <button onClick={handleUpdate}>Güncelleme</button>
          </th>
          <th>
            <button onClick={handleDelete}>Sil</button>
          </th>
          <th>Selector</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => {
          return (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.productName}</td>
              <td>{product.price}</td>
              <td>{product.categoryId}</td>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <input
                  type="checkbox"
                  onChange={() => handleCheckbox(product.id)}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
export default ProductList;
