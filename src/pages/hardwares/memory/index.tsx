import { useEffect, useState } from "react";
import { HardwareCard } from "../components/HardwaresCard";
import { HardwareProps } from "../components/HardwaresCard";
import { NavHeader } from "../components/NavHeader";

import { useCheck } from "../../../context/Check";

export function Memory() {
  const [memory, setMemory] = useState<HardwareProps[]>([]);
  const { response } = useCheck();

  useEffect(() => {
    fetch(`https://api-puppeteer.herokuapp.com/memory/${response}`)
      .then((response) => response.json())
      .then((data) => setMemory(data));
  }, []);

  if (memory.length < 1) return <p>Carregando...</p>;

  return (
    <div className=" max-w-7xl flex justify-around flex-wrap gap-4 bg-tranparent">
      <NavHeader />
      {memory?.map((res, index) => (
        <HardwareCard key={index} {...res} />
      ))}
    </div>
  );
}
