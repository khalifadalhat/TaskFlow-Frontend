'use client';

import { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  FolderKanban,
  CheckSquare,
  AlertTriangle,
  Clock,
  TrendingUp,
  Calendar,
  PlusCircle,
  BarChart3,
  Loader2,
} from 'lucide-react';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';

export default function MemberDashboard() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);
  const { data, isLoading, error } = useAppSelector(
    state => state.memberDashboard || { data: null, isLoading: false, error: null }
  );

  useEffect(() => {}, [dispatch]);

  if (!user) return null;

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

  // Mock data until you connect the real API
  const mockData = {
    myProjects: 3,
    activeProjects: 2,
    myTasks: 12,
    completedTasks: 8,
    overdueTasks: 2,
    tasksDueThisWeek: 5,
    completionRate: 67,
  };

  const {
    myProjects,
    activeProjects,
    myTasks,
    completedTasks,
    overdueTasks,
    tasksDueThisWeek,
    completionRate,
  } = mockData;

  const mainStats = [
    {
      title: 'My Projects',
      value: myProjects,
      subtext: `${activeProjects} currently active`,
      icon: FolderKanban,
      color: 'text-blue-600 bg-blue-50',
      href: '/member/projects',
    },
    {
      title: 'My Tasks',
      value: myTasks,
      subtext: `${completedTasks} completed`,
      icon: CheckSquare,
      color: 'text-green-600 bg-green-50',
      href: '/member/tasks',
    },
    {
      title: 'Overdue Tasks',
      value: overdueTasks,
      subtext: 'Need attention',
      icon: AlertTriangle,
      color: 'text-red-600 bg-red-50',
      href: '/member/tasks?filter=overdue',
    },
    {
      title: 'Due This Week',
      value: tasksDueThisWeek,
      subtext: 'Upcoming deadlines',
      icon: Clock,
      color: 'text-orange-600 bg-orange-50',
      href: '/member/tasks?filter=this-week',
    },
  ];

  const quickActions = [
    { label: 'New Task', icon: PlusCircle, href: '/member/tasks/new' },
    { label: 'New Project', icon: FolderKanban, href: '/member/projects/new' },
    { label: 'View Calendar', icon: Calendar, href: '/member/calendar' },
    { label: 'My Progress', icon: BarChart3, href: '/member/analytics' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold">Welcome back, {user.firstName}!</h1>
        <p className="mt-2 text-gray-600">
          Here&apos;s an overview of your work and upcoming tasks.
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
                <p className="mt-1 text-xs text-gray-600">{stat.subtext}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Progress & Quick Actions */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Task Completion Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Task Completion</CardTitle>
            <CardDescription>Your progress this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-gray-600">Overall completion rate</p>
                <p className="text-3xl font-bold">{completionRate}%</p>
              </div>
              <div className="flex items-center gap-2 text-green-600">
                <TrendingUp className="w-8 h-8" />
                <span className="text-lg font-semibold">+12%</span>
              </div>
            </div>
            <div className="mt-6">
              <div className="w-full h-3 bg-gray-200 rounded-full">
                <div
                  className="h-3 transition-all duration-500 bg-green-600 rounded-full"
                  style={{ width: `${completionRate}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Get started quickly</CardDescription>
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
      </div>

      {/* Recent Activity Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest updates across projects</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
                <CheckSquare className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Completed task: Update landing page design</p>
                <p className="text-xs text-gray-500">2 hours ago • Project: Marketing Site</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-full">
                <FolderKanban className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">New project assigned: Mobile App Redesign</p>
                <p className="text-xs text-gray-500">Yesterday • Manager: Sarah Chen</p>
              </div>
            </div>
            {/* Add more as needed */}
          </div>
          <div className="mt-6">
            <Button variant="outline" className="w-full">
              View All Activity
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
