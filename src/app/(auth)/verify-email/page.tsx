'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { verifyEmail, resendVerificationOTP } from '@/app/features/auth/authSlice';
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
import { Loader2, Mail, Shield, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const dispatch = useAppDispatch();

  const { isLoading, error, success } = useAppSelector(state => state.auth);

  const [otp, setOtp] = useState('');
  const [resendLoading, setResendLoading] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (success) {
      toast('Your email has been verified successfully.');
      setTimeout(() => router.push('/admin'), 1500);
    }
  }, [success, router]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast('Please enter a valid 6-digit OTP');
      return;
    }

    await dispatch(verifyEmail({ email, otp }));
  };

  const handleResendOTP = async () => {
    setResendLoading(true);
    setResendSuccess(false);

    try {
      const result = await dispatch(resendVerificationOTP(email));

      if (resendVerificationOTP.fulfilled.match(result)) {
        setResendSuccess(true);
        setCountdown(60);
        toast('A new verification OTP has been sent to your email.');
      }
    } finally {
      setResendLoading(false);
    }
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setOtp(value.slice(0, 6));
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-linear-to-br from-gray-50 to-gray-100">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center">Verify Your Email</CardTitle>
          <CardDescription className="text-center">
            Enter the 6-digit OTP sent to your email
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="w-4 h-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {resendSuccess && (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <AlertDescription className="text-green-700">
                A new OTP has been sent to your email.
              </AlertDescription>
            </Alert>
          )}

          <div className="p-4 border border-blue-100 rounded-lg bg-blue-50">
            <div className="flex items-start">
              <Mail className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-800">Verification Required</h4>
                <p className="mt-1 text-sm text-blue-600">
                  We&apos;ve sent a 6-digit verification code to:
                </p>
                <p className="mt-2 text-sm font-medium text-blue-800">{email}</p>
                <p className="mt-1 text-xs text-blue-500">The code will expire in 10 minutes.</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleVerify} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="otp">Enter OTP</Label>
              <Input
                id="otp"
                type="text"
                value={otp}
                onChange={handleOtpChange}
                placeholder="000000"
                maxLength={6}
                className="text-2xl tracking-widest text-center"
                disabled={isLoading}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading || otp.length !== 6}>
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Verifying...
                </>
              ) : (
                'Verify Email'
              )}
            </Button>
          </form>

          <div className="text-center">
            <Button
              type="button"
              variant="link"
              onClick={handleResendOTP}
              disabled={resendLoading || countdown > 0}
              className="text-blue-600">
              {resendLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : countdown > 0 ? (
                `Resend OTP in ${countdown}s`
              ) : (
                'Resend OTP'
              )}
            </Button>
          </div>
        </CardContent>

        <CardFooter className="flex justify-center">
          <Button variant="ghost" onClick={() => router.push('/login')}>
            Back to Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
