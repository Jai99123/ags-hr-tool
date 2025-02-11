import { motion } from "framer-motion";
import { Users, FileText, ClipboardCheck, Download, Edit, UserPlus, Link, Upload, Mail } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
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
import { Input } from "@/components/ui/input";
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
  assignedManager?: string;
}

interface Manager {
  id: string;
  name: string;
  email: string;
  department: string;
  assignedPositions: string[];
}

interface CandidateOnboarding {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  position: string;
  hiringStatus: "pending" | "confirmed" | "completed";
  joiningDate: string;
  documents: {
    idProof?: File;
    experienceCertificates?: File;
    educationalQualifications?: File;
  };
  onboardingLink?: string;
  documentStatus: "not_submitted" | "submitted" | "verified" | "completed";
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

  const [managers, setManagers] = useState<Manager[]>([
    {
      id: "1",
      name: "Michael Scott",
      email: "michael.scott@company.com",
      department: "Technology",
      assignedPositions: ["Senior Developer"],
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah.johnson@company.com",
      department: "Design",
      assignedPositions: ["UX Designer"],
    },
  ]);

  const [editingManager, setEditingManager] = useState<string | null>(null);
  const [newManagerName, setNewManagerName] = useState("");
  const [newManagerEmail, setNewManagerEmail] = useState("");

  const [candidateOnboarding, setCandidateOnboarding] = useState<CandidateOnboarding[]>([
    {
      id: "1",
      fullName: "John Doe",
      email: "john@example.com",
      phoneNumber: "+1234567890",
      position: "Senior Developer",
      hiringStatus: "pending",
      joiningDate: "2024-03-01",
      documents: {},
      documentStatus: "not_submitted"
    },
    {
      id: "2",
      fullName: "Jane Smith",
      email: "jane@example.com",
      phoneNumber: "+1987654321",
      position: "UX Designer",
      hiringStatus: "confirmed",
      joiningDate: "2024-03-15",
      documents: {},
      documentStatus: "submitted"
    }
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
      case "interviewing": return "secondary";
      case "rejected": return "destructive";
      case "hired": return "default";
      default: return "default";
    }
  };

  const downloadResume = (application: Application) => {
    if (application.resumeUrl) {
      toast.success(`Downloading resume for ${application.candidateName}`);
    } else {
      toast.error("No resume available for this candidate");
    }
  };

  const handleManagerEdit = (managerId: string) => {
    const manager = managers.find(m => m.id === managerId);
    if (manager) {
      setEditingManager(managerId);
      setNewManagerName(manager.name);
      setNewManagerEmail(manager.email);
    }
  };

  const saveManagerEdit = (managerId: string) => {
    if (newManagerName.trim() && newManagerEmail.trim()) {
      setManagers(managers.map(manager =>
        manager.id === managerId 
          ? { ...manager, name: newManagerName, email: newManagerEmail } 
          : manager
      ));
      setEditingManager(null);
      setNewManagerName("");
      setNewManagerEmail("");
      toast.success("Manager information updated successfully");
    } else {
      toast.error("Please fill in both name and email");
    }
  };

  const assignToManager = (applicationId: string, managerId: string) => {
    const manager = managers.find(m => m.id === managerId);
    const application = applications.find(a => a.id === applicationId);
    
    if (manager && application) {
      setManagers(managers.map(m =>
        m.id === managerId
          ? { ...m, assignedPositions: [...m.assignedPositions, application.position] }
          : m
      ));
      setApplications(applications.map(app =>
        app.id === applicationId ? { ...app, assignedManager: manager.name } : app
      ));
      toast.success(`Application assigned to ${manager.name}`);
    }
  };

  const generateOnboardingLink = (candidateId: string) => {
    const uniqueLink = `https://onboarding.company.com/${candidateId}-${Date.now()}`;
    setCandidateOnboarding(candidates =>
      candidates.map(candidate =>
        candidate.id === candidateId
          ? { ...candidate, onboardingLink: uniqueLink }
          : candidate
      )
    );
    toast.success("Onboarding link generated successfully");
  };

  const updateDocumentStatus = (candidateId: string, status: CandidateOnboarding['documentStatus']) => {
    setCandidateOnboarding(candidates =>
      candidates.map(candidate =>
        candidate.id === candidateId
          ? { ...candidate, documentStatus: status }
          : candidate
      )
    );
    toast.success("Document status updated successfully");
  };

  const sendNotification = (candidateId: string, type: 'document' | 'reminder') => {
    const candidate = candidateOnboarding.find(c => c.id === candidateId);
    if (candidate) {
      toast.success(`${type === 'document' ? 'Document submission confirmation' : 'Joining reminder'} sent to ${candidate.email}`);
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
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
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
              title="New Hires"
              value="5"
              icon={<UserPlus className="w-6 h-6 text-primary" />}
            />
            <MetricCard
              title="Total Employees"
              value="248"
              icon={<Users className="w-6 h-6 text-primary" />}
            />
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Manager Assignment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Manager Name</TableHead>
                      <TableHead>Email Address</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Assigned Positions</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {managers.map((manager) => (
                      <TableRow key={manager.id}>
                        <TableCell>
                          {editingManager === manager.id ? (
                            <Input
                              value={newManagerName}
                              onChange={(e) => setNewManagerName(e.target.value)}
                              className="max-w-[200px]"
                              placeholder="Manager name"
                            />
                          ) : (
                            manager.name
                          )}
                        </TableCell>
                        <TableCell>
                          {editingManager === manager.id ? (
                            <Input
                              value={newManagerEmail}
                              onChange={(e) => setNewManagerEmail(e.target.value)}
                              className="max-w-[200px]"
                              placeholder="Email address"
                              type="email"
                            />
                          ) : (
                            <span className="text-sm text-muted-foreground hover:text-foreground cursor-pointer">
                              {manager.email}
                            </span>
                          )}
                        </TableCell>
                        <TableCell>{manager.department}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-2">
                            {manager.assignedPositions.map((position, index) => (
                              <Badge key={index} variant="secondary">
                                {position}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          {editingManager === manager.id ? (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => saveManagerEdit(manager.id)}
                            >
                              Save
                            </Button>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleManagerEdit(manager.id)}
                            >
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </Button>
                          )}
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
              <CardTitle>Candidate Onboarding</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Candidate Details</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Hiring Status</TableHead>
                      <TableHead>Joining Date</TableHead>
                      <TableHead>Documents</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {candidateOnboarding.map((candidate) => (
                      <TableRow key={candidate.id}>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="font-medium">{candidate.fullName}</div>
                            <div className="text-sm text-muted-foreground">{candidate.email}</div>
                            <div className="text-sm text-muted-foreground">{candidate.phoneNumber}</div>
                          </div>
                        </TableCell>
                        <TableCell>{candidate.position}</TableCell>
                        <TableCell>
                          <Select
                            value={candidate.hiringStatus}
                            onValueChange={(value: CandidateOnboarding['hiringStatus']) => {
                              setCandidateOnboarding(candidates =>
                                candidates.map(c =>
                                  c.id === candidate.id
                                    ? { ...c, hiringStatus: value }
                                    : c
                                )
                              );
                            }}
                          >
                            <SelectTrigger className="w-[140px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="confirmed">Confirmed</SelectItem>
                              <SelectItem value="completed">Completed</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>{candidate.joiningDate}</TableCell>
                        <TableCell>
                          <Select
                            value={candidate.documentStatus}
                            onValueChange={(value: CandidateOnboarding['documentStatus']) => 
                              updateDocumentStatus(candidate.id, value)
                            }
                          >
                            <SelectTrigger className="w-[140px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="not_submitted">Not Submitted</SelectItem>
                              <SelectItem value="submitted">Submitted</SelectItem>
                              <SelectItem value="verified">Verified</SelectItem>
                              <SelectItem value="completed">Completed</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => generateOnboardingLink(candidate.id)}
                            >
                              <Link className="w-4 h-4 mr-2" />
                              Generate Link
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => sendNotification(candidate.id, 'document')}
                            >
                              <Mail className="w-4 h-4 mr-2" />
                              Send Email
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
};

export default HR;
