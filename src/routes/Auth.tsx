import { Routes, Route } from "react-router-dom";
import { Alternative } from "../pages/alternative";
import { Category } from "../pages/category";
import { NotFound } from "../pages/notFound";
import { ProfileCheck } from "../pages/profile-check";
import { Quest } from "../pages/quest";

export function Auth() {
  return (
    <Routes>
      <Route path="/category" element={<Category />} />
      <Route path="/quest" element={<Quest />} />
      <Route path="/alternative" element={<Alternative />} />
      <Route path="/profile-check" element={<ProfileCheck />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
