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
import { Loader2, Trash2, Mail, ShieldCheck } from 'lucide-react';
import api from '@/app/services/authApi';

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'admin' | 'manager' | 'user';
  isVerified: boolean;
}

export default function UsersManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const roleParam = roleFilter !== 'all' ? `&role=${roleFilter}` : '';
      const response = await api.get(`/users?page=${pagination.page}&limit=10${roleParam}`);
      setUsers(response.data.users);
      setPagination(prev => ({ ...prev, totalPages: response.data.pages }));
    } catch (error) {
      console.error('Failed to fetch users', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [roleFilter, pagination.page]);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      await api.delete(`/users/${id}`);
      fetchUsers();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold dark:text-white">User Management</h1>
        <div className="flex gap-4">
          <Select
            onValueChange={val => {
              setRoleFilter(val);
              setPagination(p => ({ ...p, page: 1 }));
            }}>
            <SelectTrigger className="w-45">
              <SelectValue placeholder="Filter by Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="manager">Manager</SelectItem>
              <SelectItem value="user">User</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
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
                users.map(user => (
                  <TableRow key={user._id}>
                    <TableCell className="font-medium dark:text-gray-200">
                      {user.firstName} {user.lastName}
                    </TableCell>
                    <TableCell className="dark:text-gray-400">{user.email}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          user.role === 'admin'
                            ? 'destructive'
                            : user.role === 'manager'
                            ? 'default'
                            : 'secondary'
                        }>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {user.isVerified ? (
                        <Badge className="text-green-700 bg-green-100">Verified</Badge>
                      ) : (
                        <Badge className="text-yellow-700 bg-yellow-100">Pending</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500"
                        onClick={() => handleDelete(user._id)}>
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

      <div className="flex justify-center gap-2">
        <Button
          disabled={pagination.page === 1}
          onClick={() => setPagination(p => ({ ...p, page: p.page - 1 }))}>
          Previous
        </Button>
        <Button
          disabled={pagination.page === pagination.totalPages}
          onClick={() => setPagination(p => ({ ...p, page: p.page + 1 }))}>
          Next
        </Button>
      </div>
    </div>
  );
}
