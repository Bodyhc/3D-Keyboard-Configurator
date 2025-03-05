import KeyboardCustomizer from "@/components/keyboard-customizer";
import { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <>
        <Toaster position="top-right" reverseOrder={false} />
        <KeyboardCustomizer />
      </>
    </main>
  );
}
