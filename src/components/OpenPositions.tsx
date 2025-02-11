import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { toast } from "sonner";
import { FileText, User, CheckCircle } from "lucide-react";

interface Position {
  id: string;
  jobId: string;
  title: string;
  description: string;
  status: "active" | "inactive";
  assignedManager: string;
  candidateStatus?: "pending" | "selected" | "rejected";
  feedback?: string;
}

interface NewPosition {
  jobId: string;
  title: string;
  description: string;
}

const OpenPositions = () => {
  const [positions, setPositions] = useState<Position[]>([
    {
      id: "1",
      jobId: "DEV-001",
      title: "Senior Developer",
      description: "We are looking for an experienced developer...",
      status: "active",
      assignedManager: "John Smith",
      candidateStatus: "pending",
    },
  ]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showNewPositionForm, setShowNewPositionForm] = useState(false);
  const [newPosition, setNewPosition] = useState<NewPosition>({
    jobId: "",
    title: "",
    description: "",
  });

  // Mock HR team check - in real app, this would come from auth
  const isHRTeam = true; // This would be connected to your auth state

  const handleStatusChange = (positionId: string, status: "active" | "inactive") => {
    setPositions(positions.map(pos => 
      pos.id === positionId ? { ...pos, status } : pos
    ));
    toast.success("Position status updated");
  };

  const handleCandidateStatusChange = (
    positionId: string,
    status: "pending" | "selected" | "rejected"
  ) => {
    setPositions(positions.map(pos => 
      pos.id === positionId ? { ...pos, candidateStatus: status } : pos
    ));
    toast.success("Candidate status updated");
  };

  const handleNewPositionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = (positions.length + 1).toString();
    setPositions([
      ...positions,
      {
        ...newPosition,
        id,
        status: "active",
        assignedManager: "",
      },
    ]);
    setNewPosition({ jobId: "", title: "", description: "" });
    setShowNewPositionForm(false);
    toast.success("New position added successfully!");
  };

  const handleApply = (positionId: string) => {
    toast.success("Internal application started! Please complete your profile.");
  };

  const handleAssignManager = (positionId: string) => {
    toast.success("Manager assigned successfully!");
  };

  const handleUploadResume = (positionId: string) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        toast.success(`Resume "${file.name}" uploaded successfully!`);
      }
    };
    input.click();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="p-6 backdrop-blur-sm bg-card/90">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Open Positions</h2>
          {isHRTeam && (
            <Button 
              variant="outline"
              onClick={() => setShowNewPositionForm(true)}
            >
              New Position
            </Button>
          )}
        </div>

        {showNewPositionForm && isHRTeam && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8 p-4 border rounded-lg"
          >
            <h3 className="text-lg font-semibold mb-4">Create New Position</h3>
            <form onSubmit={handleNewPositionSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Job ID</label>
                <Input
                  value={newPosition.jobId}
                  onChange={(e) => setNewPosition({ ...newPosition, jobId: e.target.value })}
                  placeholder="Enter Job ID (e.g., DEV-002)"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Title</label>
                <Input
                  value={newPosition.title}
                  onChange={(e) => setNewPosition({ ...newPosition, title: e.target.value })}
                  placeholder="Enter position title"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Job Description</label>
                <Textarea
                  value={newPosition.description}
                  onChange={(e) => setNewPosition({ ...newPosition, description: e.target.value })}
                  placeholder="Enter detailed job description (max 500 words)"
                  maxLength={500}
                  required
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit">Post Position</Button>
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => setShowNewPositionForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </motion.div>
        )}

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Job ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Manager</TableHead>
                <TableHead>Candidate Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {positions.map((position) => (
                <TableRow key={position.id}>
                  <TableCell>{position.jobId}</TableCell>
                  <TableCell>{position.title}</TableCell>
                  <TableCell>
                    <Select
                      defaultValue={position.status}
                      onValueChange={(value: "active" | "inactive") =>
                        handleStatusChange(position.id, value)
                      }
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>{position.assignedManager}</TableCell>
                  <TableCell>
                    <Select
                      defaultValue={position.candidateStatus || "pending"}
                      onValueChange={(value: "pending" | "selected" | "rejected") =>
                        handleCandidateStatusChange(position.id, value)
                      }
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="selected">Selected</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleApply(position.id)}
                        title="Apply as Internal Employee"
                      >
                        <User className="w-4 h-4" />
                      </Button>
                      {isHRTeam && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleAssignManager(position.id)}
                          title="Assign Manager"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleUploadResume(position.id)}
                        title="Upload Resume"
                      >
                        <FileText className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {editingId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 space-y-4"
          >
            <h3 className="text-lg font-semibold">Edit Position</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Job Description</label>
                <Textarea
                  className="mt-1"
                  placeholder="Enter detailed job description (max 500 words)"
                  maxLength={500}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Feedback</label>
                <Textarea
                  className="mt-1"
                  placeholder="Enter feedback for candidate (max 100 words)"
                  maxLength={100}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={() => setEditingId(null)}>Save Changes</Button>
                <Button variant="outline" onClick={() => setEditingId(null)}>
                  Cancel
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </Card>
    </motion.div>
  );
};

export default OpenPositions;
