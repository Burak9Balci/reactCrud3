import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ApiService from "../../services/ApiService";
import Product from "../../models/Product";
import { useNavigate } from "react-router-dom";

const api = new ApiService("http://localhost:3000");

const ProductAdd = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await api.getAll("categories");
        setCategories(categories);
      } catch (error) {
        alert("Kategoriler getirilemedi");
      }
    };
    fetchCategories();
  }, []);

  // Formik setup
  const formik = useFormik({
    initialValues: {
      productName: "",
      price: "",
      categoryId: "",
    },
    validationSchema: Yup.object({
      productName: Yup.string().required("Ürün ismi zorunludur"),
      price: Yup.number()
        .required("Fiyat zorunludur")
        .positive("Fiyat sıfırdan büyük olmalıdır"),
      categoryId: Yup.string().required("Kategori seçilmelidir"),
    }),
    onSubmit: async (values) => {
      const newProduct = new Product(
        values.productName,
        +values.price,
        values.categoryId
      );

      try {
        await api.makePost("products", newProduct);
        alert("Ürün Eklendi");
        formik.resetForm();
        navigate("/products");
      } catch (error) {
        alert(`Ürün eklenirken bir hata oldu: ${error}`);
      }
    },
  });

  return (
    <form className="product-form" onSubmit={formik.handleSubmit}>
      <div className="form-group">
        <label htmlFor="productName">Ürün ismi</label>
        <input
          type="text"
          id="productName"
          name="productName"
          placeholder="Ürün ismini girin"
          value={formik.values.productName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={
            formik.touched.productName && formik.errors.productName
              ? "input-error"
              : ""
          }
        />
        {formik.touched.productName && formik.errors.productName && (
          <div className="error-message">{formik.errors.productName}</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="price">Fiyat</label>
        <input
          type="text"
          id="price"
          name="price"
          placeholder="Fiyat girin"
          value={formik.values.price}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={
            formik.touched.price && formik.errors.price ? "input-error" : ""
          }
        />
        {formik.touched.price && formik.errors.price && (
          <div className="error-message">{formik.errors.price}</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="categoryId">Kategori</label>
        <select
          id="categoryId"
          name="categoryId"
          value={formik.values.categoryId}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={
            formik.touched.categoryId && formik.errors.categoryId
              ? "input-error"
              : ""
          }
        >
          <option value="">Kategori seçin</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.categoryName}
            </option>
          ))}
        </select>
        {formik.touched.categoryId && formik.errors.categoryId && (
          <div className="error-message">{formik.errors.categoryId}</div>
        )}
      </div>

      <button type="submit" className="submit-btn">
        Gönder
      </button>
    </form>
  );
};

export default ProductAdd;
