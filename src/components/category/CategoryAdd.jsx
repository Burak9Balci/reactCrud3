import { useFormik } from "formik";
import * as Yup from "yup";
import ApiService from "../../services/ApiService";
import { useNavigate } from "react-router-dom";
import Category from "../../models/Category";

const api = new ApiService("http://localhost:3000");

const CategoryAdd = () => {
  const navigate = useNavigate();
  // useFormik hook'unun kullanımı
  const formik = useFormik({
    initialValues: {
      categoryName: "", // Kategori adAı başlangıç değeri
      description: "", // Açıklama başlangıç değeri
    },
    validationSchema: Yup.object({
      categoryName: Yup.string().required("Kategori adı zorunludur"),
      description: Yup.string().required("Açıklama zorunludur"),
    }),
    onSubmit: async (value) => {
      const newCategory = new Category(value.categoryName, value.description);
      try {
        await api.makePost("categories", newCategory);
        alert("Kategori başarıyla eklendi!");
        formik.resetForm();
        navigate("/categories");
      } catch (error) {
        Alert("ekleme yapılırken hata oldu");
      }

      // Burada form verileri API'ye gönderilebilir
    },
  });

  return (
    <div className="form-container">
      <form onSubmit={formik.handleSubmit} className="form">
        <div>
          <label htmlFor="categoryName" className="">
            Kategori Adı
          </label>
          <input
            id="categoryName"
            name="categoryName"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.categoryName}
            className={"textbox"}
            placeholder="Kategori adını girin"
          />
          {formik.touched.categoryName && formik.errors.categoryName ? (
            <p className="">{formik.errors.categoryName}</p>
          ) : null}
        </div>

        <div className="">
          <label htmlFor="description" className="">
            Açıklama
          </label>
          <input
            id="description"
            name="description"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
            className={`textbox`}
            placeholder="Açıklama girin"
          />
          {formik.touched.description && formik.errors.description ? (
            <p className="">{formik.errors.description}</p>
          ) : null}
        </div>

        <div>
          <button type="submit" className="">
            Ekle
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoryAdd;
