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
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader2, UserPlus, Filter } from 'lucide-react';
import api from '@/app/services/authApi';
import { toast } from 'sonner';

export default function AdminTasksPage() {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [taskRes, userRes] = await Promise.all([
        api.get('/tasks'),
        api.get('/users?limit=100'),
      ]);
      setTasks(taskRes.data);
      setUsers(userRes.data.users);
    } catch (error) {
      toast.error('Failed to fetch global tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAssigneeChange = async (taskId, userId) => {
    try {
      await api.put(`/tasks/${taskId}`, { assignee: userId });
      toast.success('Task reassigned');
      fetchData();
    } catch (error) {
      toast.error('Update failed');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold dark:text-white">Global Task Registry</h1>
      </div>

      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task Title</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Assignee</TableHead>
                <TableHead className="text-right">Reassign</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="py-10 text-center">
                    <Loader2 className="mx-auto animate-spin" />
                  </TableCell>
                </TableRow>
              ) : (
                tasks.map(task => (
                  <TableRow key={task._id}>
                    <TableCell className="font-medium dark:text-gray-200">{task.title}</TableCell>
                    <TableCell className="dark:text-gray-400">
                      {task.project?.name || 'N/A'}
                    </TableCell>
                    <TableCell>
                      <Badge variant={task.priority === 'high' ? 'destructive' : 'secondary'}>
                        {task.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {task.assignee
                        ? `${task.assignee.firstName} ${task.assignee.lastName}`
                        : 'Unassigned'}
                    </TableCell>
                    <TableCell className="text-right">
                      <Select onValueChange={val => handleAssigneeChange(task._id, val)}>
                        <SelectTrigger className="w-[150px] ml-auto">
                          <SelectValue placeholder="Change User" />
                        </SelectTrigger>
                        <SelectContent>
                          {users.map(u => (
                            <SelectItem key={u._id} value={u._id}>
                              {u.firstName} {u.lastName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
