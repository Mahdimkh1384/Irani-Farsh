import Landing from "@/Components/Landing/Landing";
import SectionHeader from "@/Components/SectionHeader/SectionHeader";
import CategoryBox from "@/Components/CategoryBox/CategoryBox";
import Slider from "@/Components/Slider/Slider";
import CustomerClub from "@/Components/CustomerClub/CustomerClub";


export default function Home() {
  return (
    <>
      <Landing />
      <CategoryBox firstItem={0} lastItem={4}/>
      <SectionHeader title="جدیدترین ها" />
      <Slider />
      <CategoryBox firstItem={4} lastItem={8} />
      <SectionHeader title="فرش های ماشینی" />
      <Slider />
      <CustomerClub />
    </>
  );
}
