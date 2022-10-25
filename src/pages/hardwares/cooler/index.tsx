import { useEffect, useState } from "react";
import { HardwareCard } from "../components/HardwaresCard";
import { HardwareProps } from "../components/HardwaresCard";
import { NavHeader } from "../components/NavHeader";

export function Cooler() {
  const [cooler, setCooler] = useState<HardwareProps[]>([]);

  useEffect(() => {
    fetch("https://api-puppeteer.herokuapp.com/cooler")
      .then((response) => response.json())
      .then((data) => setCooler(data));
  }, []);

  if (cooler.length < 1) return <p>Carregando...</p>;

  return (
    <div className=" max-w-7xl flex justify-around flex-wrap gap-4 bg-tranparent">
      <NavHeader />
      {cooler?.map((res, index) => (
        <HardwareCard key={index} {...res} />
      ))}
    </div>
  );
}
