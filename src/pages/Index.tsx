
import { useState } from "react";
import { Users, Briefcase, BookOpen, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import MetricCard from "@/components/MetricCard";
import IdeasForm from "@/components/IdeasForm";
import Header from "@/components/Header";
import OpenPositions from "@/components/OpenPositions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Index = () => {
  const [showPositions, setShowPositions] = useState(false);
  const [userRole, setUserRole] = useState<"HR" | "Manager" | null>(null);
  const [currentEmail, setCurrentEmail] = useState("");

  const handlePositionsClick = () => {
    setShowPositions(true);
    console.log("Viewing positions");
  };

  const handleLearnersClick = () => {
    console.log("Viewing learning resources");
  };

  const handleRoleChange = (value: "HR" | "Manager") => {
    setUserRole(value);
    toast.success(`Switched to ${value} dashboard`);
  };

  const handleEmailUpdate = () => {
    if (!currentEmail) {
      toast.error("Please enter an email address");
      return;
    }
    toast.success("Email updated successfully");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      
      <main className="container pt-24 pb-8">
        <div className="mb-8">
          <Card className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div className="flex items-center gap-4">
                <ShieldCheck className="w-6 h-6 text-primary" />
                <div>
                  <h2 className="text-xl font-semibold">Role Selection</h2>
                  <p className="text-sm text-gray-500">Choose your dashboard view</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <Select onValueChange={handleRoleChange}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="HR">HR Dashboard</SelectItem>
                    <SelectItem value="Manager">Manager Dashboard</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={currentEmail}
                    onChange={(e) => setCurrentEmail(e.target.value)}
                    className="w-full sm:w-[250px]"
                  />
                  <Button onClick={handleEmailUpdate}>Update</Button>
                </div>
              </div>
            </div>
          </Card>
        </div>

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
            title="Open Positions"
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
        ) : (
          <div className="mt-8">
            <IdeasForm />
          </div>
        )}

        {userRole && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8"
          >
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                {userRole === "HR" ? "HR Dashboard" : "Manager Dashboard"}
              </h2>
              <div className="space-y-4">
                {userRole === "HR" ? (
                  <>
                    <p className="text-gray-600">
                      Welcome to the HR Dashboard. Here you can:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                      <li>View and manage all open positions</li>
                      <li>Assign managers to positions</li>
                      <li>Review applications</li>
                      <li>Manage the recruitment process</li>
                    </ul>
                  </>
                ) : (
                  <>
                    <p className="text-gray-600">
                      Welcome to the Manager Dashboard. Here you can:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                      <li>View assigned positions</li>
                      <li>Review applications for your positions</li>
                      <li>Upload and manage resumes</li>
                      <li>Track candidate status</li>
                    </ul>
                  </>
                )}
              </div>
            </Card>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default Index;
