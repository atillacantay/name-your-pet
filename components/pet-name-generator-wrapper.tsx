import FeaturesSection from "./features-section";
import Header from "./header";
import PetNameGenerator from "./pet-name-generator";

export default function PetNameGeneratorWrapper() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      <div className="max-w-4xl mx-auto">
        <Header />

        <PetNameGenerator />

        <FeaturesSection />
      </div>
    </div>
  );
}
