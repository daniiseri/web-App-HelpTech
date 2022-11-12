import { Route, Routes } from "react-router-dom";

import { Home } from "../pages/home";
import { Register } from "../pages/register";
import { Login } from "../pages/login";
import { Processor } from "../pages/hardwares/processor";
import { HardDisc } from "../pages/hardwares/hard-disc";
import { Memory } from "../pages/hardwares/memory";
import { VideoCard } from "../pages/hardwares/video-card";
import { Cooler } from "../pages/hardwares/cooler";
import { Motherboard } from "../pages/hardwares/motherboard";
import { Desktop } from "../pages/hardwares/desktop";
import { NotFound } from "../pages/notFound";

export function NoAuth() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/processor" element={<Processor />} />
      <Route path="/hard-disc" element={<HardDisc />} />
      <Route path="/memory" element={<Memory />} />
      <Route path="/video-card" element={<VideoCard />} />
      <Route path="/cooler" element={<Cooler />} />
      <Route path="/motherboard" element={<Motherboard />} />
      <Route path="/desktop" element={<Desktop />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
