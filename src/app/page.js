import HomeStoreOpening from "./components/HomeStoreOpening";
import HomePetCategories from "./components/HomePetCategories";
import ShopByPet from "./components/ShopByPet";
import CustomerFavorites from "./components/CustomerFavorites";
import FeaturedProducts from "./components/FeaturedProducts";
import SmartPicksAndFavorites from "./components/SmartPicksAndFavorites";
import FeaturedCategoriesAndBrands from "./components/FeaturedCategoriesAndBrands";

export default function Home() {
  return (
    <>
      <HomeStoreOpening />
      <HomePetCategories />
      <ShopByPet />
      <CustomerFavorites />
      <FeaturedProducts />
      <SmartPicksAndFavorites />
      <FeaturedCategoriesAndBrands />
    </>
  );
}
