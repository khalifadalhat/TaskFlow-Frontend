'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { register, clearError } from '@/app/features/auth/authSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Mail, Lock, User, Shield } from 'lucide-react';
import { toast } from 'sonner';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';

const registerSchema = z
  .object({
    firstName: z.string().min(2, 'First name must be at least 2 characters'),
    lastName: z.string().min(2, 'Last name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { isLoading, error, success, needsVerification, verificationEmail } = useAppSelector(
    state => state.auth
  );

  const {
    register: registerForm,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const password = watch('password');

  useEffect(() => {
    if (success && needsVerification && verificationEmail) {
      toast('Please check your email for verification OTP.', {
        className: 'bg-green-600 text-white',
      });
      router.push(`/verify-email?email=${encodeURIComponent(verificationEmail)}`);
    }
  }, [success, needsVerification, verificationEmail, router]);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const onSubmit = async (data: RegisterFormData) => {
    const { confirmPassword, ...registrationData } = data;
    const result = await dispatch(register(registrationData));

    if (register.rejected.match(result)) {
      toast(result.payload as string, {
        className: 'bg-red-600 text-white',
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-gray-50 to-gray-100">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-lg">
              <span className="text-xl font-bold text-white">TF</span>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center">Admin Registration</CardTitle>
          <CardDescription className="text-center">
            Create an admin account to access the dashboard
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <div className="relative">
                  <User className="absolute w-4 h-4 text-gray-400 left-3 top-3" />
                  <Input
                    id="firstName"
                    placeholder="John"
                    className="pl-10"
                    disabled={isLoading}
                    {...registerForm('firstName')}
                  />
                </div>
                {errors.firstName && (
                  <p className="text-sm text-red-500">{errors.firstName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <div className="relative">
                  <User className="absolute w-4 h-4 text-gray-400 left-3 top-3" />
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    className="pl-10"
                    disabled={isLoading}
                    {...registerForm('lastName')}
                  />
                </div>
                {errors.lastName && (
                  <p className="text-sm text-red-500">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute w-4 h-4 text-gray-400 left-3 top-3" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  className="pl-10"
                  disabled={isLoading}
                  {...registerForm('email')}
                />
              </div>
              {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute w-4 h-4 text-gray-400 left-3 top-3" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10"
                  disabled={isLoading}
                  {...registerForm('password')}
                />
              </div>
              {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
              <p className="text-xs text-gray-500">Must be at least 6 characters</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute w-4 h-4 text-gray-400 left-3 top-3" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10"
                  disabled={isLoading}
                  {...registerForm('confirmPassword')}
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
              )}
            </div>

            <div className="p-4 border border-blue-100 rounded-lg bg-blue-50">
              <div className="flex items-start">
                <Shield className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-800">Admin Registration</h4>
                  <p className="mt-1 text-sm text-blue-600">
                    You will receive a verification OTP via email after registration. Your account
                    will be activated once verified.
                  </p>
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating Account...
                </>
              ) : (
                'Create Admin Account'
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-blue-600 hover:underline">
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
