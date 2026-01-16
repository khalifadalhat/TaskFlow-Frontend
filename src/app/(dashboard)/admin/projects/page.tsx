'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, UserCog, ExternalLink, Trash2 } from 'lucide-react';
import api from '@/app/services/authApi';
import { toast } from 'sonner';

interface Project {
  _id: string;
  name: string;
  status: 'pending' | 'in_progress' | 'completed';
  manager:
    | {
        _id: string;
        firstName: string;
        lastName: string;
      }
    | string;
  startDate: string;
}

interface Manager {
  _id: string;
  firstName: string;
  lastName: string;
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [managers, setManagers] = useState<Manager[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const projectRes = await api.get('/projects');
      const managerRes = await api.get('/users?role=manager');

      setProjects(projectRes.data);
      setManagers(managerRes.data.users);
    } catch (error) {
      toast.error('Failed to load project data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAssignManager = async (projectId: string, managerId: string) => {
    try {
      await api.put(`/projects/${projectId}`, { manager: managerId });
      toast.success('Manager reassigned successfully');
      fetchData();
    } catch (error) {
      toast.error('Failed to update manager');
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-700',
      in_progress: 'bg-blue-100 text-blue-700',
      completed: 'bg-green-100 text-green-700',
    };
    return (
      <Badge className={styles[status as keyof typeof styles]}>{status.replace('_', ' ')}</Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold dark:text-white">All Projects</h1>
        <Button onClick={() => (window.location.href = '/admin/projects/new')}>
          Create New Project
        </Button>
      </div>

      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle>Global Project Oversight</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Current Manager</TableHead>
                <TableHead>Assign New Manager</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="py-10 text-center">
                    <Loader2 className="w-8 h-8 mx-auto text-blue-600 animate-spin" />
                  </TableCell>
                </TableRow>
              ) : (
                projects.map(project => (
                  <TableRow key={project._id}>
                    <TableCell className="font-medium dark:text-gray-200">{project.name}</TableCell>
                    <TableCell>{getStatusBadge(project.status)}</TableCell>
                    <TableCell className="dark:text-gray-400">
                      {typeof project.manager === 'object'
                        ? `${project.manager.firstName} ${project.manager.lastName}`
                        : 'Unassigned'}
                    </TableCell>
                    <TableCell>
                      <Select
                        onValueChange={val => handleAssignManager(project._id, val)}
                        defaultValue={
                          typeof project.manager === 'object' ? project.manager._id : undefined
                        }>
                        <SelectTrigger className="h-8 w-50">
                          <SelectValue placeholder="Select Manager" />
                        </SelectTrigger>
                        <SelectContent>
                          {managers.map(m => (
                            <SelectItem key={m._id} value={m._id}>
                              {m.firstName} {m.lastName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="space-x-2 text-right">
                      <Button variant="ghost" size="icon">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-red-500">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
