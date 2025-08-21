import { LocaleSwitcher } from "@/components/locale-switcher";
import PetNameGeneratorWrapper from "@/components/pet-name-generator-wrapper";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-end mb-6">
          <LocaleSwitcher />
        </div>
        <PetNameGeneratorWrapper />
      </div>
    </div>
  );
}
