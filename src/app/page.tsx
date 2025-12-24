'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  CheckCircle,
  Users,
  BarChart3,
  FolderKanban,
  Shield,
  Clock,
  ArrowRight,
  Star,
  TrendingUp,
} from 'lucide-react';
import { useAuth } from './provider/auth-provider';

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const features = [
    {
      icon: <FolderKanban className="w-6 h-6" />,
      title: 'Project Management',
      description: 'Create, organize, and track projects with customizable workflows',
      color: 'text-blue-600 bg-blue-50',
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Team Collaboration',
      description: 'Assign tasks, share files, and communicate in real-time',
      color: 'text-green-600 bg-green-50',
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: 'Analytics & Insights',
      description: 'Track performance, generate reports, and make data-driven decisions',
      color: 'text-purple-600 bg-purple-50',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Role-Based Access',
      description: 'Admin, Manager, and Member roles with appropriate permissions',
      color: 'text-red-600 bg-red-50',
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Time Tracking',
      description: 'Log hours, track progress, and analyze productivity',
      color: 'text-yellow-600 bg-yellow-50',
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: 'Task Management',
      description: 'Create, assign, and track tasks with deadlines and priorities',
      color: 'text-indigo-600 bg-indigo-50',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Project Manager at TechCorp',
      content:
        'TaskFlow transformed how our team collaborates. The analytics dashboard is incredible!',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      role: 'CTO at StartupXYZ',
      content:
        'The role-based system saved us so much time. Our workflow is 40% more efficient now.',
      rating: 5,
    },
    {
      name: 'Emma Rodriguez',
      role: 'Team Lead at DesignCo',
      content: 'Intuitive interface, powerful features. Our team adoption was seamless.',
      rating: 4,
    },
  ];

  const stats = [
    { label: 'Active Projects', value: '10,000+' },
    { label: 'Teams Using', value: '5,000+' },
    { label: 'Tasks Completed', value: '2M+' },
    { label: 'Avg. Productivity Increase', value: '35%' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />

        <div className="container relative px-4 mx-auto sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="px-4 py-1 mb-4 text-sm font-semibold">
              <TrendingUp className="w-4 h-4 mr-2" />
              Trusted by 5,000+ teams worldwide
            </Badge>

            <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
              Streamline Your Team&apos;s
              <span className="block mt-2 text-blue-600">Project Management</span>
            </h1>

            <p className="max-w-2xl mx-auto mt-6 text-xl text-gray-600">
              A comprehensive role-based platform for admins, managers, and team members to
              collaborate, track progress, and drive productivity.
            </p>

            <div className="flex flex-col justify-center gap-4 mt-10 sm:flex-row">
              <Button size="lg" className="px-8" asChild>
                <Link href="/register">
                  Get Started Free
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>

              <Button size="lg" variant="outline" className="px-8" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
            </div>

            <div className="grid max-w-4xl grid-cols-2 gap-6 mx-auto mt-12 md:grid-cols-4">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{stat.value}</div>
                  <div className="mt-1 text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container px-4 mx-auto sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Everything You Need in One Platform
            </h2>
            <p className="max-w-3xl mx-auto mt-4 text-lg text-gray-600">
              Designed for modern teams with role-based workflows and powerful analytics
            </p>
          </div>

          <div className="grid gap-8 mt-16 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="transition-shadow duration-300 border-none shadow-lg hover:shadow-xl">
                <CardHeader>
                  <div className={`inline-flex p-3 rounded-lg ${feature.color}`}>
                    {feature.icon}
                  </div>
                  <CardTitle className="mt-4">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Role-Based Features */}
      <section className="py-20 bg-gray-50">
        <div className="container px-4 mx-auto sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Tailored Experience for Every Role
            </h2>
            <p className="max-w-3xl mx-auto mt-4 text-lg text-gray-600">
              Each role has a customized interface with tools designed for their specific needs
            </p>
          </div>

          <Tabs defaultValue="admin" className="max-w-6xl mx-auto mt-12">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="admin">Admin</TabsTrigger>
              <TabsTrigger value="manager">Manager</TabsTrigger>
              <TabsTrigger value="member">Team Member</TabsTrigger>
            </TabsList>

            <TabsContent value="admin" className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="grid gap-8 md:grid-cols-2">
                    <div>
                      <h3 className="mb-4 text-xl font-semibold">Administrator Dashboard</h3>
                      <ul className="space-y-3">
                        {[
                          'Comprehensive analytics dashboard',
                          'User and team management',
                          'System configuration',
                          'Performance monitoring',
                          'Advanced reporting tools',
                          'Role and permission management',
                        ].map((item, index) => (
                          <li key={index} className="flex items-center">
                            <CheckCircle className="w-5 h-5 mr-3 text-green-500" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex items-center justify-center p-4 bg-gray-100 rounded-lg">
                      <div className="text-center">
                        <BarChart3 className="w-16 h-16 mx-auto mb-4 text-blue-600" />
                        <p className="text-sm text-gray-600">Real-time analytics and insights</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="manager" className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="grid gap-8 md:grid-cols-2">
                    <div>
                      <h3 className="mb-4 text-xl font-semibold">Manager Workspace</h3>
                      <ul className="space-y-3">
                        {[
                          'Project creation and management',
                          'Task assignment and tracking',
                          'Team performance monitoring',
                          'Workload balancing tools',
                          'Progress reporting',
                          'Resource allocation',
                        ].map((item, index) => (
                          <li key={index} className="flex items-center">
                            <CheckCircle className="w-5 h-5 mr-3 text-green-500" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex items-center justify-center p-4 bg-gray-100 rounded-lg">
                      <div className="text-center">
                        <FolderKanban className="w-16 h-16 mx-auto mb-4 text-green-600" />
                        <p className="text-sm text-gray-600">Project and task management</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="member" className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="grid gap-8 md:grid-cols-2">
                    <div>
                      <h3 className="mb-4 text-xl font-semibold">Team Member Interface</h3>
                      <ul className="space-y-3">
                        {[
                          'Personal task dashboard',
                          'Time logging and tracking',
                          'Task status updates',
                          'Collaboration tools',
                          'Progress visualization',
                          'Notification system',
                        ].map((item, index) => (
                          <li key={index} className="flex items-center">
                            <CheckCircle className="w-5 h-5 mr-3 text-green-500" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex items-center justify-center p-4 bg-gray-100 rounded-lg">
                      <div className="text-center">
                        <CheckCircle className="w-16 h-16 mx-auto mb-4 text-purple-600" />
                        <p className="text-sm text-gray-600">Task management and tracking</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container px-4 mx-auto sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Trusted by Teams Worldwide
            </h2>
          </div>

          <div className="grid gap-8 mt-12 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-none shadow-lg">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < testimonial.rating
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="mb-6 italic text-gray-600">&ldquo;{testimonial.content}&rdquo;</p>
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
                      <span className="font-semibold text-blue-600">
                        {testimonial.name
                          .split(' ')
                          .map(n => n[0])
                          .join('')}
                      </span>
                    </div>
                    <div className="ml-4">
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-gray-500">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="container px-4 mx-auto text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Ready to Transform Your Team&apos;s Productivity?
          </h2>
          <p className="max-w-2xl mx-auto mt-4 text-xl text-blue-100">
            Join thousands of teams who have streamlined their workflow with TaskFlow
          </p>

          <div className="flex flex-col justify-center gap-4 mt-10 sm:flex-row">
            <Button size="lg" variant="secondary" className="px-8" asChild>
              <Link href="/register">
                Start Free Trial
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="px-8 text-white bg-transparent border-white hover:bg-white/10"
              asChild>
              <Link href="/login">Schedule Demo</Link>
            </Button>
          </div>

          <p className="mt-6 text-sm text-blue-200">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-white bg-gray-900">
        <div className="container px-4 mx-auto sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center justify-center w-8 h-8 bg-white rounded-lg">
                  <span className="font-bold text-blue-600">TF</span>
                </div>
                <span className="text-xl font-bold">TaskFlow</span>
              </div>
              <p className="text-gray-400">
                Streamlining team collaboration and project management for modern organizations.
              </p>
            </div>

            <div>
              <h4 className="mb-4 font-semibold">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/features" className="hover:text-white">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-white">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/integrations" className="hover:text-white">
                    Integrations
                  </Link>
                </li>
                <li>
                  <Link href="/roadmap" className="hover:text-white">
                    Roadmap
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 font-semibold">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-white">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-white">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 font-semibold">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/privacy" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="hover:text-white">
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link href="/gdpr" className="hover:text-white">
                    GDPR
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 mt-8 text-sm text-center text-gray-400 border-t border-gray-800">
            <p>&copy; {new Date().getFullYear()} TaskFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
