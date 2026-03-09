import Image from "next/image";
import styles from "./page.module.css";
import Herosection from "@/Components/home/herosection";
import Cardsection from "@/Components/home/cardssecttion";
import AddFood from "./additem/page";

export default function Home() {
  return (
    <>
   <Herosection />
   <Cardsection/>
    </>
  );
}
