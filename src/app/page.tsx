import Trivia from "@/components/Trivia";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Fetch App",
  description: "Fetch App - Developed by Daniel Cikora",
};
export default function Home() {
  return (
    <main>
      <Trivia />
    </main>
  );
}
