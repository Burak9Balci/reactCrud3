import { useFormik } from "formik";
import * as Yup from "yup";
import ApiService from "../../services/ApiService";
import { useNavigate, useParams } from "react-router-dom";
import Category from "../../models/Category";

const api = new ApiService("http://localhost:3000");

const CategoryUpdate = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  // useFormik hook'unun kullanımı
  const formik = useFormik({
    initialValues: {
      categoryName: "", // Kategori adAı başlangıç değeri Eğer istenilirse tıklandığında butana değiştirmke istediğim değerlerin gözükmesi şü şekilde yapıla bilinir apiden id yardımıyla o vaeri çekilir value kısımlarına backtickler yardımıyla yazılır
      description: "", // Açıklama başlangıç değeri
    },
    validationSchema: Yup.object({
      categoryName: Yup.string().required("Kategori adı zorunludur"),
      description: Yup.string().required("Açıklama zorunludur"),
    }),
    onSubmit: async (value) => {
      const newCategory = new Category(value.categoryName, value.description);
      try {
        await api.makePut("categories", id, newCategory);
        alert("Kategori başarıyla güncellendi!");
        formik.resetForm();
        navigate("/categories");
      } catch (error) {
        Alert("güncelleme yapılırken hata oldu");
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

export default CategoryUpdate;
