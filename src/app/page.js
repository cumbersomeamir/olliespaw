import HomeStoreOpening from "./components/HomeStoreOpening";
import ShopByPet from "./components/ShopByPet";
import CustomerFavorites from "./components/CustomerFavorites";
import FeaturedProducts from "./components/FeaturedProducts";
import LivePetGridFeed from "./components/LivePetGridFeed";
import SmartPicksAndFavorites from "./components/SmartPicksAndFavorites";
import FeaturedCategoriesAndBrands from "./components/FeaturedCategoriesAndBrands";
import OurStory from "./components/OurStory";
import OurValues from "./components/OurValues";
import QualityProcess from "./components/QualityProcess";
import WhyChooseUs from "./components/WhyChooseUs";
import Testimonials from "./components/Testimonials";
import ContactCTA from "./components/ContactCTA";
import ShippingGuarantee from "./components/ShippingGuarantee";
import Sustainability from "./components/Sustainability";
import Newsletter from "./components/Newsletter";

export default function Home() {
  return (
    <>
      <HomeStoreOpening />
      <ShopByPet />
      <CustomerFavorites />
      <FeaturedProducts />
      <LivePetGridFeed />
      <SmartPicksAndFavorites />
      <FeaturedCategoriesAndBrands />
      <OurStory />
      <OurValues />
      <QualityProcess />
      <WhyChooseUs />
      <Testimonials />
      <ContactCTA />
      <ShippingGuarantee />
      <Sustainability />
      <Newsletter />
    </>
  );
}
