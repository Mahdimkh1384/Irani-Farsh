import Landing from "@/Components/Landing/Landing";
import SectionHeader from "@/Components/SectionHeader/SectionHeader";
import CategoryBox from "@/Components/CategoryBox/CategoryBox";
import Slider from "@/Components/Slider/Slider";
import CustomerClub from "@/Components/CustomerClub/CustomerClub";


export default function Home() {
  return (
    <>
      <Landing />
      <CategoryBox />
      <SectionHeader title="جدیدترین ها" />
      <Slider />
      <CategoryBox />
      <SectionHeader title="فرش های ماشینی" />
      <Slider />
      <CustomerClub/>
    </>
  );
}
