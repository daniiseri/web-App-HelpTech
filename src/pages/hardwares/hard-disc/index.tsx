import { useEffect, useState } from "react";
import { HardwareCard } from "../components/HardwaresCard";
import { HardwareProps } from "../components/HardwaresCard";
import { NavHeader } from "../components/NavHeader";

export function HardDisc() {
  const [hardDisc, setHardDisc] = useState<HardwareProps[]>([]);

  useEffect(() => {
    fetch("https://api-puppeteer.herokuapp.com/hard-disc")
      .then((response) => response.json())
      .then((data) => setHardDisc(data));
  }, []);

  if (hardDisc.length < 1) return <p>Carregando...</p>;

  return (
    <div className=" max-w-7xl flex justify-around flex-wrap gap-4 bg-tranparent">
      <NavHeader />
      {hardDisc?.map((res, index) => (
        <HardwareCard key={index} {...res} />
      ))}
    </div>
  );
}
