import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../services/ApiService";

const ListCategory = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const navigate = useNavigate();
  const api = new ApiService("http://localhost:3000");
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await api.getAll("categories");
        setCategories(data);
      } catch (error) {
        alert("categoriler getirlimedi");
      }
    };
    fetchCategories();
  }, []);

  const handleDeleteClick = async () => {
    if (categories.length === 0) {
      alert("category yaratmadan bu işelemi yapamazsın");
      return;
    }
    if (selectedCategoryIds.length === 0) {
      alert("silmek için bir kategory seçin");
      return;
    }
    try {
      for (const id of selectedCategoryIds) {
        await api.makeDelete("categories", id);
      }
      alert("Category Sİlindi");
      setCategories((prev) =>
        prev.filter((category) => !selectedCategoryIds.includes(category.id))
      );
      setSelectedCategoryIds([]);
    } catch (error) {
      alert("category silinemedi");
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedCategoryIds((prev) => {
      if (prev.includes(id)) {
        // Eğer id zaten seçilmişse
        return prev.filter((categoryId) => categoryId !== id);
      } else {
        // Eğer id seçili değilse
        return [...prev, id];
      }
    });
  };

  const handleUpdateClick = () => {
    if (categories.length === 0) {
      alert("category yaratmadan bu işelemi yapamazsın");
      return;
    }
    selectedCategoryIds.length === 1
      ? navigate(`/categories/Update/${selectedCategoryIds}`)
      : alert("lütfen sadece 1 category seçiniz");
  };

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>CategoryName</th>
          <th>Description</th>
          <th>
            <button onClick={() => navigate("/categories/Add")}>
              Ekleme Yapmak için Tıkla
            </button>
          </th>
          <th>
            <button onClick={handleUpdateClick}>
              Güncelleme yapmak için Tıkla
            </button>
          </th>
          <th>
            <button onClick={handleDeleteClick}>Silmek için Tıkla</button>
          </th>
          <th>Selector</th>
        </tr>
      </thead>
      <tbody>
        {categories.map((category) => {
          return (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.categoryName}</td>
              <td>{category.description}</td>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxChange(category.id)}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
export default ListCategory;
