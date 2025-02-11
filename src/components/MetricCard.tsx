
import { motion } from "framer-motion";
import { Card } from "./ui/card";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  onClick?: () => void;
}

const MetricCard = ({ title, value, icon, onClick }: MetricCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        className={`p-6 backdrop-blur-sm bg-card/90 hover:shadow-lg transition-all duration-300 ${
          onClick ? "cursor-pointer" : ""
        }`}
        onClick={onClick}
      >
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-lg">{icon}</div>
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <h3 className="text-2xl font-semibold mt-1">{value}</h3>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default MetricCard;
