import { useEffect, useState } from "react";
import { HardwareCard } from "../components/HardwaresCard";
import { HardwareProps } from "../components/HardwaresCard";
import { NavHeader } from "../components/NavHeader";

export function VideoCard() {
  const [videoCard, setVideoCard] = useState<HardwareProps[]>([]);

  useEffect(() => {
    fetch("https://api-puppeteer.herokuapp.com/video-card")
      .then((response) => response.json())
      .then((data) => setVideoCard(data));
  }, []);

  if (videoCard.length < 1) return <p>Carregando...</p>;

  return (
    <div className=" max-w-7xl flex justify-around flex-wrap gap-4 bg-tranparent ">
      <NavHeader />
      {videoCard?.map((res, index) => (
        <HardwareCard key={index} {...res} />
      ))}
    </div>
  );
}