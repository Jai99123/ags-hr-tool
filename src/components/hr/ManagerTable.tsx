import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Edit, Mail } from "lucide-react";

interface Manager {
  id: string;
  name: string;
  email: string;
  department: string;
  assignedPositions: string[];
}

type NewManager = {
  name: string;
  email: string;
  department: string;
  position: string;
}

interface ManagerTableProps {
  managers: Manager[];
  editingManager: string | null;
  newManagerName: string;
  newManagerEmail: string;
  isAddingManager: boolean;
  newManager: NewManager;
  onEdit: (managerId: string) => void;
  onSave: (managerId: string) => void;
  onNewManagerChange: (field: keyof NewManager, value: string) => void;
  onAddManager: () => void;
  onCancelAdd: () => void;
  onEmailManager: (email: string) => void;
  onNewManagerNameChange: (value: string) => void;
  onNewManagerEmailChange: (value: string) => void;
}

const ManagerTable = ({
  managers,
  editingManager,
  newManagerName,
  newManagerEmail,
  isAddingManager,
  newManager,
  onEdit,
  onSave,
  onNewManagerChange,
  onAddManager,
  onCancelAdd,
  onEmailManager,
  onNewManagerNameChange,
  onNewManagerEmailChange,
}: ManagerTableProps) => {
  return (
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
        {isAddingManager && (
          <TableRow>
            <TableCell>
              <Input
                placeholder="Manager name"
                value={newManager.name}
                onChange={(e) => onNewManagerChange("name", e.target.value)}
                className="max-w-[200px]"
              />
            </TableCell>
            <TableCell>
              <Input
                placeholder="Email address"
                type="email"
                value={newManager.email}
                onChange={(e) => onNewManagerChange("email", e.target.value)}
                className="max-w-[200px]"
              />
            </TableCell>
            <TableCell>
              <Input
                placeholder="Department"
                value={newManager.department}
                onChange={(e) => onNewManagerChange("department", e.target.value)}
                className="max-w-[200px]"
              />
            </TableCell>
            <TableCell>
              <Input
                placeholder="Position"
                value={newManager.position}
                onChange={(e) => onNewManagerChange("position", e.target.value)}
                className="max-w-[200px]"
              />
            </TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onAddManager}
                >
                  Save
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onCancelAdd}
                >
                  Cancel
                </Button>
              </div>
            </TableCell>
          </TableRow>
        )}
        {managers.map((manager) => (
          <TableRow key={manager.id}>
            <TableCell>
              {editingManager === manager.id ? (
                <Input
                  value={newManagerName}
                  onChange={(e) => onNewManagerNameChange(e.target.value)}
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
                  onChange={(e) => onNewManagerEmailChange(e.target.value)}
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
                {editingManager === manager.id ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onSave(manager.id)}
                  >
                    Save
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(manager.id)}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEmailManager(manager.email)}
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Email
                    </Button>
                  </>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ManagerTable;
