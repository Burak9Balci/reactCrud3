import Header from "./Header";
import Card from "./Cards";
import BackgroundContext from "../../../contexts/backgroundContext";
import { useContext, useEffect } from "react";
const Dashboard = () => {
  const { setBackgroundColor } = useContext(BackgroundContext); // Context'ten fonksiyonu al

  useEffect(() => {
    // Dashboard sayfasına giriş yapıldığında arkaplanı siyah yap
    setBackgroundColor("black");

    // Sayfadan çıkarken arkaplan rengini tekrar eski haline döndür
    return () => {
      setBackgroundColor("white"); // Diğer sayfalar için beyaz yap
    };
  }, [setBackgroundColor]);
  return (
    <>
      <Header />
      <Card />
    </>
  );
};
export default Dashboard;
