
import { motion } from "framer-motion";
import { Users, FileText, ClipboardCheck, Download } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import OpenPositions from "@/components/OpenPositions";
import MetricCard from "@/components/MetricCard";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

interface Application {
  id: string;
  candidateName: string;
  email: string;
  position: string;
  status: "new" | "shortlisted" | "interviewing" | "rejected" | "hired";
  applicationDate: string;
  resumeUrl?: string;
}

const HR = () => {
  const [applications, setApplications] = useState<Application[]>([
    {
      id: "1",
      candidateName: "John Doe",
      email: "john@example.com",
      position: "Senior Developer",
      status: "new",
      applicationDate: "2024-02-11",
      resumeUrl: "#",
    },
    {
      id: "2",
      candidateName: "Jane Smith",
      email: "jane@example.com",
      position: "UX Designer",
      status: "shortlisted",
      applicationDate: "2024-02-10",
      resumeUrl: "#",
    },
  ]);

  const handleStatusChange = (applicationId: string, newStatus: Application['status']) => {
    setApplications(applications.map(app => 
      app.id === applicationId ? { ...app, status: newStatus } : app
    ));
    toast.success("Application status updated successfully");
  };

  const getStatusBadgeVariant = (status: Application['status']) => {
    switch (status) {
      case "new": return "default";
      case "shortlisted": return "secondary";
      case "interviewing": return "warning";
      case "rejected": return "destructive";
      case "hired": return "success";
      default: return "default";
    }
  };

  const downloadResume = (application: Application) => {
    if (application.resumeUrl) {
      // In a real app, this would download the actual resume
      toast.success(`Downloading resume for ${application.candidateName}`);
    } else {
      toast.error("No resume available for this candidate");
    }
  };

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
              value={applications.length.toString()}
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
              <CardTitle>Applications Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Candidate</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Application Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {applications.map((application) => (
                      <TableRow key={application.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{application.candidateName}</div>
                            <div className="text-sm text-gray-500">{application.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>{application.position}</TableCell>
                        <TableCell>{application.applicationDate}</TableCell>
                        <TableCell>
                          <Select
                            defaultValue={application.status}
                            onValueChange={(value: Application['status']) => 
                              handleStatusChange(application.id, value)
                            }
                          >
                            <SelectTrigger className="w-[140px]">
                              <SelectValue>
                                <Badge variant={getStatusBadgeVariant(application.status)}>
                                  {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                                </Badge>
                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="new">New</SelectItem>
                              <SelectItem value="shortlisted">Shortlisted</SelectItem>
                              <SelectItem value="interviewing">Interviewing</SelectItem>
                              <SelectItem value="rejected">Rejected</SelectItem>
                              <SelectItem value="hired">Hired</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => downloadResume(application)}
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Resume
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

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
