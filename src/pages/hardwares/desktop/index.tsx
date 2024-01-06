import { useEffect, useState } from "react";
import { HardwareCard } from "../components/HardwaresCard";
import { HardwareProps } from "../components/HardwaresCard";
import { NavHeader } from "../components/NavHeader";

export function Desktop() {
  const [desktop, setDesktop] = useState<HardwareProps[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_PUPPETEER_URL}/desktop`)
      .then((response) => response.json())
      .then((data) => setDesktop(data));
  }, []);

  if (desktop.length < 1) return <p>Carregando...</p>;

  return (
    <div className=" max-w-7xl flex justify-around flex-wrap gap-4 bg-tranparent">
      <NavHeader />
      {desktop?.map((res, index) => (
        <HardwareCard key={index} {...res} />
      ))}
    </div>
  );
}
