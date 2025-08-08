import Landing from "@/Components/Landing/Landing";
import SectionHeader from "@/Components/SectionHeader/SectionHeader";
import ProductBox from "@/Components/ProductBox/ProductBox";
import Slider from "@/Components/Slider/Slider";

export default function Home() {
  return (
    <>
      <Landing />
      <SectionHeader title="جدیدترین ها" />
      <Slider />
    </>
  );
}
