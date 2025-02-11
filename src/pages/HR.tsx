
import { motion } from "framer-motion";
import { Users, FileText, ClipboardCheck } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import OpenPositions from "@/components/OpenPositions";
import MetricCard from "@/components/MetricCard";

const HR = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      
      <main className="container pt-24 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-3xl font-bold mb-8">HR Dashboard</h1>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
            <MetricCard
              title="Total Applications"
              value="45"
              icon={<FileText className="w-6 h-6 text-primary" />}
            />
            <MetricCard
              title="Active Positions"
              value="12"
              icon={<ClipboardCheck className="w-6 h-6 text-primary" />}
            />
            <MetricCard
              title="Total Employees"
              value="248"
              icon={<Users className="w-6 h-6 text-primary" />}
            />
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Open Positions</CardTitle>
            </CardHeader>
            <CardContent>
              <OpenPositions />
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
};

export default HR;
