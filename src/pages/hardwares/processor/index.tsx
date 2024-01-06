import { useEffect, useState } from "react";
import { HardwareCard } from "../components/HardwaresCard";
import { HardwareProps } from "../components/HardwaresCard";
import { NavHeader } from "../components/NavHeader";

import { useCheck } from "../../../context/Check";

export function Processor() {
  const [processor, setProcessor] = useState<HardwareProps[]>([]);
  const { response } = useCheck();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_PUPPETEER_URL}/processor/${response}`)
      .then((response) => response.json())
      .then((data) => setProcessor(data));
  }, []);

  if (processor.length < 1) return <p>Carregando...</p>;

  return (
    <div className=" max-w-7xl flex justify-around flex-wrap gap-4 bg-tranparent">
      <NavHeader />
      {processor?.map((res, index) => (
        <HardwareCard key={index} {...res} />
      ))}
    </div>
  );
}
