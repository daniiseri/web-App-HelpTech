import { AboutUs } from "./components/AboutUs";
import { Motivation } from "./components/Motivation";

export function Home() {
  return (
    <div className="flex flex-col gap-8">
      <AboutUs />
      <Motivation />
    </div>
  );
}
