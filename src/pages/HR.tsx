import { motion } from "framer-motion";
import { Users, FileText, ClipboardCheck, Edit, UserPlus, Upload, Download, Calendar, Phone, Mail } from "lucide-react";
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

interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  status: "new" | "shortlisted" | "interviewing" | "rejected" | "hired";
  joiningDate: string;
  notes?: string;
  documents: {
    id: string;
    name: "PAN CARD" | "AADHAR CARD" | "Resume";
    type: string;
    url: string;
  }[];
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

  const [candidates, setCandidates] = useState<Candidate[]>([
    {
      id: "1",
      name: "Alice Johnson",
      email: "alice@example.com",
      phone: "+1 234 567 8901",
      position: "Senior Developer",
      status: "new",
      joiningDate: "2024-03-01",
      notes: "",
      documents: [
        {
          id: "doc1",
          name: "Resume",
          type: "pdf",
          url: "#"
        }
      ]
    }
  ]);

  const [editingManager, setEditingManager] = useState<string | null>(null);
  const [newManagerName, setNewManagerName] = useState("");
  const [newManagerEmail, setNewManagerEmail] = useState("");

  const [editingCandidate, setEditingCandidate] = useState<string | null>(null);
  const [newCandidateData, setNewCandidateData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    joiningDate: "",
    notes: ""
  });

  const handleStatusChange = (applicationId: string, newStatus: Application['status']) => {
    setApplications(applications.map(app => 
      app.id === applicationId ? { ...app, status: newStatus } : app
    ));
    toast.success("Application status updated successfully");
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

  const handleCandidateEdit = (candidateId: string) => {
    const candidate = candidates.find(c => c.id === candidateId);
    if (candidate) {
      setEditingCandidate(candidateId);
      setNewCandidateData({
        name: candidate.name,
        email: candidate.email,
        phone: candidate.phone,
        position: candidate.position,
        joiningDate: candidate.joiningDate,
        notes: candidate.notes || ""
      });
    }
  };

  const saveCandidateEdit = (candidateId: string) => {
    if (newCandidateData.name && newCandidateData.email) {
      setCandidates(candidates.map(candidate =>
        candidate.id === candidateId
          ? {
              ...candidate,
              ...newCandidateData
            }
          : candidate
      ));
      setEditingCandidate(null);
      toast.success("Candidate information updated successfully");
    } else {
      toast.error("Please fill in all required fields");
    }
  };

  const handleDocumentUpload = (candidateId: string, documentType: "PAN CARD" | "AADHAR CARD" | "Resume") => {
    const newDocument = {
      id: `doc${Date.now()}`,
      name: documentType,
      type: "pdf",
      url: "#"
    };

    setCandidates(candidates.map(candidate =>
      candidate.id === candidateId
        ? {
            ...candidate,
            documents: [...candidate.documents.filter(d => d.name !== documentType), newDocument]
          }
        : candidate
    ));
    
    toast.success(`${documentType} uploaded successfully`);
  };

  const downloadDocument = (document: Candidate['documents'][0]) => {
    toast.success(`Downloading ${document.name}`);
  };

  const handleAssignCandidate = (managerId: string, candidateEmail: string) => {
    const manager = managers.find(m => m.id === managerId);
    if (manager) {
      const emailContent = `
        Dear ${manager.name},
        
        A new candidate has been assigned to you for review.
        Candidate Email: ${candidateEmail}
        
        Please review their application and provide your feedback.
        
        Best regards,
        HR Team
      `;
      
      toast.success(`Assignment notification sent to ${manager.email}`);
      console.log('Email content:', emailContent);
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
                      <TableHead>Assign Candidate</TableHead>
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
                            manager.email
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
                          <div className="flex gap-2">
                            <Input
                              placeholder="Candidate email"
                              type="email"
                              className="max-w-[200px]"
                              onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                  handleAssignCandidate(manager.id, e.currentTarget.value);
                                  e.currentTarget.value = '';
                                }
                              }}
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                const input = document.querySelector(`input[type="email"]`) as HTMLInputElement;
                                if (input && input.value) {
                                  handleAssignCandidate(manager.id, input.value);
                                  input.value = '';
                                }
                              }}
                            >
                              <Mail className="w-4 h-4" />
                            </Button>
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
        </motion.div>
      </main>
    </div>
  );
};

export default HR;
