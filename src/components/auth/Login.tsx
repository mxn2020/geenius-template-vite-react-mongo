import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signIn } from '../../lib/auth-client';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Alert, AlertDescription } from '../ui/alert';
import { Loader2, Github, Mail } from 'lucide-react';
import { Container } from '../../lib/dev-container';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn.email(
        { email, password },
        {
          onSuccess: () => {
            navigate('/dashboard');
          },
          onError: (error: any) => {
            setError(error.message || 'Login failed');
          }
        }
      );

      if (result.error) {
        setError(result.error.message || 'Login failed');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await signIn.social(
        { provider: "google" },
        {
          onSuccess: () => {
            navigate('/dashboard');
          },
          onError: (error: any) => {
            setError(error.message || 'Google login failed');
          }
        }
      );
    } catch (err) {
      setError('Google login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGithubLogin = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await signIn.social(
        { provider: "github" },
        {
          onSuccess: () => {
            navigate('/dashboard');
          },
          onError: (error: any) => {
            setError(error.message || 'GitHub login failed');
          }
        }
      );
    } catch (err) {
      setError('GitHub login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container componentId="login-page">
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <Container componentId="login-header">
              <CardTitle className="text-2xl text-center">Welcome back</CardTitle>
              <CardDescription className="text-center">
                Enter your email and password to sign in to your account
              </CardDescription>
            </Container>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <Container componentId="login-error">
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              </Container>
            )}

            <Container componentId="social-login-buttons">
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  onClick={handleGoogleLogin}
                  disabled={isLoading}
                  className="w-full"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Google
                </Button>
                <Button
                  variant="outline"
                  onClick={handleGithubLogin}
                  disabled={isLoading}
                  className="w-full"
                >
                  <Github className="h-4 w-4 mr-2" />
                  GitHub
                </Button>
              </div>
            </Container>

            <Container componentId="login-divider">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>
            </Container>

            <Container componentId="login-form">
              <form onSubmit={handleEmailLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    disabled={isLoading}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    'Sign in'
                  )}
                </Button>
              </form>
            </Container>

            <Container componentId="login-footer">
              <div className="text-center text-sm">
                <span className="text-muted-foreground">
                  Don't have an account?{' '}
                </span>
                <Link 
                  to="/register" 
                  className="text-primary hover:underline font-medium"
                >
                  Sign up
                </Link>
              </div>
            </Container>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
};