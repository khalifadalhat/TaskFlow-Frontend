'use client';

import { useEffect } from 'react';
import { fetchDashboardOverview } from '@/app/features/dashboard/dashboardSlice';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Users,
  FolderKanban,
  CheckSquare,
  AlertTriangle,
  TrendingUp,
  Clock,
  UserCheck,
  BarChart3,
  Calendar,
  Loader2,
} from 'lucide-react';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';

export default function AdminDashboard() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);
  const { data, isLoading, error } = useAppSelector(state => state.dashboard);
  useEffect(() => {
    dispatch(fetchDashboardOverview({ timeframe: 'month' }));
  }, [dispatch]);

  if (!user) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <p className="text-red-600">Error loading dashboard: {error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!data) return null;

  const { kpis, userAnalytics, projectAnalytics, taskAnalytics } = data;

  const mainStats = [
    {
      title: 'Total Users',
      value: kpis.totalUsers.toLocaleString(),
      change: `${userAnalytics.userGrowthRate}%`,
      subtext: `${userAnalytics.newUsers} new this month`,
      icon: Users,
      color: 'text-blue-600 bg-blue-50',
      href: '/admin/users',
    },
    {
      title: 'Active Projects',
      value: kpis.totalProjects.toLocaleString(),
      change: projectAnalytics.completionRate > 0 ? `${projectAnalytics.completionRate}%` : '0%',
      subtext: `${projectAnalytics.newProjects} new projects`,
      icon: FolderKanban,
      color: 'text-green-600 bg-green-50',
      href: '/admin/projects',
    },
    {
      title: 'Total Tasks',
      value: kpis.totalTasks.toLocaleString(),
      change: `${kpis.completedTasks} completed`,
      subtext: `${taskAnalytics.completionRate}% completion rate`,
      icon: CheckSquare,
      color: 'text-purple-600 bg-purple-50',
      href: '/admin/tasks',
    },
    {
      title: 'Overdue Items',
      value: (kpis.overdueTasks + kpis.overdueProjects).toLocaleString(),
      change: `${kpis.overdueTasks} tasks`,
      subtext: `${kpis.overdueProjects} projects`,
      icon: AlertTriangle,
      color: 'text-orange-600 bg-orange-50',
      href: '/admin/tasks?filter=overdue',
    },
  ];

  const quickActions = [
    { label: 'Add User', icon: Users, href: '/admin/users/new' },
    { label: 'Create Project', icon: FolderKanban, href: '/admin/projects/new' },
    { label: 'View Reports', icon: BarChart3, href: '/admin/analytics' },
    { label: 'Schedule', icon: Calendar, href: '/admin/settings/schedule' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold">Welcome back, {user.firstName}!</h1>
        <p className="mt-2 text-gray-600">
          Here&apos;s what&apos;s happening with your platform this month.
        </p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {mainStats.map((stat, index) => (
          <Link key={index} href={stat.href}>
            <Card className="transition-shadow cursor-pointer hover:shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <div className={`p-2 rounded-lg ${stat.color}`}>
                  <stat.icon className="w-4 h-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="mt-1 text-xs text-gray-600">{stat.change}</div>
                <div className="mt-1 text-xs text-gray-500">{stat.subtext}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Analytics Section */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* User Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Users by Role</CardTitle>
            <CardDescription>Role distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(userAnalytics.usersByRole).map(([role, count]) => (
                <div key={role} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium capitalize">{role}</span>
                  </div>
                  <span className="text-sm font-bold">{count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Project Status */}
        <Card>
          <CardHeader>
            <CardTitle>Projects by Status</CardTitle>
            <CardDescription>Current project states</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(projectAnalytics.projectsByStatus).map(([status, count]) => (
                <div key={status} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        status === 'completed'
                          ? 'bg-green-500'
                          : status === 'inProgress'
                          ? 'bg-blue-500'
                          : status === 'onHold'
                          ? 'bg-yellow-500'
                          : 'bg-gray-500'
                      }`}
                    />
                    <span className="text-sm capitalize">
                      {status.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                  </div>
                  <span className="text-sm font-bold">{count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Task Priority */}
        <Card>
          <CardHeader>
            <CardTitle>Tasks by Priority</CardTitle>
            <CardDescription>Priority distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(taskAnalytics.tasksByPriority).map(([priority, count]) => (
                <div key={priority} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        priority === 'critical'
                          ? 'bg-red-500'
                          : priority === 'high'
                          ? 'bg-orange-500'
                          : priority === 'medium'
                          ? 'bg-yellow-500'
                          : 'bg-green-500'
                      }`}
                    />
                    <span className="text-sm capitalize">{priority}</span>
                  </div>
                  <span className="text-sm font-bold">{count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions & Key Metrics */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common admin tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action, index) => (
                <Link key={index} href={action.href}>
                  <Button
                    variant="outline"
                    className="flex flex-col w-full h-24 gap-2 hover:border-blue-300 hover:bg-blue-50">
                    <action.icon className="w-6 h-6" />
                    <span>{action.label}</span>
                  </Button>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Key Metrics</CardTitle>
            <CardDescription>Important statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">Avg Tasks per User</span>
                </div>
                <span className="font-bold">{taskAnalytics.avgTasksPerUser.toFixed(1)}</span>
              </div>

              <div className="flex items-center justify-between py-2 border-b">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-orange-500" />
                  <span className="text-sm">Unassigned Tasks</span>
                </div>
                <span className="font-bold">{kpis.unassignedTasks}</span>
              </div>

              <div className="flex items-center justify-between py-2 border-b">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Task Completion Rate</span>
                </div>
                <span className="font-bold">{taskAnalytics.completionRate}%</span>
              </div>

              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2">
                  <FolderKanban className="w-4 h-4 text-blue-500" />
                  <span className="text-sm">Avg Project Duration</span>
                </div>
                <span className="font-bold">{projectAnalytics.avgProjectDuration} days</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Task Status Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Task Status Overview</CardTitle>
          <CardDescription>Current task distribution across all statuses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {Object.entries(taskAnalytics.tasksByStatus).map(([status, count]) => (
              <div key={status} className="p-4 border rounded-lg">
                <div className="text-sm text-gray-600 capitalize">
                  {status === 'todo' ? 'To Do' : status === 'inProgress' ? 'In Progress' : status}
                </div>
                <div className="mt-2 text-2xl font-bold">{count}</div>
                <div className="mt-1 text-xs text-gray-500">
                  {kpis.totalTasks > 0 ? `${((count / kpis.totalTasks) * 100).toFixed(1)}%` : '0%'}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle>System Overview</CardTitle>
          <CardDescription>Platform statistics and health</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Total Teams</span>
                <span className="text-lg font-bold">{kpis.totalTeams}</span>
              </div>
              <div className="text-xs text-gray-500">Active teams in system</div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Completion Rate</span>
                <span className="text-lg font-bold">{projectAnalytics.completionRate}%</span>
              </div>
              <div className="text-xs text-gray-500">Overall project completion</div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">User Growth</span>
                <span className="text-lg font-bold">+{userAnalytics.userGrowthRate}%</span>
              </div>
              <div className="text-xs text-gray-500">This month</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
