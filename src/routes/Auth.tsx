import { Routes, Route } from "react-router-dom";
import { Alternative } from "../pages/alternative";
import { Category } from "../pages/category";
import { Cooler } from "../pages/hardwares/cooler";
import { Desktop } from "../pages/hardwares/desktop";
import { HardDisc } from "../pages/hardwares/hard-disc";
import { Memory } from "../pages/hardwares/memory";
import { Motherboard } from "../pages/hardwares/motherboard";
import { Processor } from "../pages/hardwares/processor";
import { VideoCard } from "../pages/hardwares/video-card";
import { NotFound } from "../pages/notFound";
import { ProfileCheck } from "../pages/profile-check";
import { Quest } from "../pages/quest";

import { useCheck } from "../context/Check";
import { Home } from "../pages/home";
import { Profile } from "../pages/profile";
import { useAuth } from "../context/Auth";

export function Auth() {
  const { roles } = useAuth();
  const { response } = useCheck();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="profile" element={<Profile />} />
      {roles?.find(({ description }) => description === "Admin") && (
        <>
          <Route path="/category" element={<Category />} />
          <Route path="/quest" element={<Quest />} />
          <Route path="/alternative" element={<Alternative />} />
        </>
      )}
      <Route path="/profile-check" element={<ProfileCheck />} />
      <Route path="/processor" element={<Processor />} />
      <Route path="/hard-disc" element={<HardDisc />} />
      <Route path="/memory" element={<Memory />} />
      {response > 2 && <Route path="/video-card" element={<VideoCard />} />}
      <Route path="/cooler" element={<Cooler />} />
      <Route path="/motherboard" element={<Motherboard />} />
      <Route path="/desktop" element={<Desktop />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
