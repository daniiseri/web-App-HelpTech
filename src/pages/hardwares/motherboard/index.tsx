import { useEffect, useState } from "react";
import { HardwareCard } from "../components/HardwaresCard";
import { HardwareProps } from "../components/HardwaresCard";
import { NavHeader } from "../components/NavHeader";

export function Motherboard() {
  const [motherboard, setMotherboard] = useState<HardwareProps[]>([]);

  useEffect(() => {
    fetch("https://api-puppeteer.herokuapp.com/motherboard")
      .then((response) => response.json())
      .then((data) => setMotherboard(data));
  }, []);

  if (motherboard.length < 1) return <p>Carregando...</p>;

  return (
    <div className=" max-w-7xl flex justify-around flex-wrap gap-4 bg-tranparent">
      <NavHeader />
      {motherboard?.map((res, index) => (
        <HardwareCard key={index} {...res} />
      ))}
    </div>
  );
}
