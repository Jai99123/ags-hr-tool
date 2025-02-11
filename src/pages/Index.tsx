
import { useState } from "react";
import { Users, Briefcase, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import MetricCard from "@/components/MetricCard";
import IdeasForm from "@/components/IdeasForm";
import Header from "@/components/Header";
import OpenPositions from "@/components/OpenPositions";
import LearningDashboard from "@/components/learning/LearningDashboard";

const Index = () => {
  const [showPositions, setShowPositions] = useState(false);
  const [showLearning, setShowLearning] = useState(false);

  const handlePositionsClick = () => {
    setShowPositions(true);
    setShowLearning(false);
    console.log("Viewing positions");
  };

  const handleLearnersClick = () => {
    setShowLearning(true);
    setShowPositions(false);
    console.log("Viewing learning resources");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      
      <main className="container pt-24 pb-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          <MetricCard
            title="Total Employees"
            value="248"
            icon={<Users className="w-6 h-6 text-primary" />}
          />
          
          <MetricCard
            title="AGS Career"
            value="12"
            icon={<Briefcase className="w-6 h-6 text-primary" />}
            onClick={handlePositionsClick}
          />
          
          <MetricCard
            title="Active Learners"
            value="156"
            icon={<BookOpen className="w-6 h-6 text-primary" />}
            onClick={handleLearnersClick}
          />
        </motion.div>

        {showPositions ? (
          <div className="mt-8">
            <OpenPositions />
          </div>
        ) : showLearning ? (
          <div className="mt-8">
            <LearningDashboard />
          </div>
        ) : (
          <div className="mt-8">
            <IdeasForm />
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
