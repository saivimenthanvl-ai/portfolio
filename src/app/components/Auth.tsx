import { motion } from 'motion/react';
import { useState } from 'react';
import { Mail, Lock, User, X, Github } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';

export function Auth() {
  const [showAuth, setShowAuth] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert(isLogin ? 'Login functionality would go here!' : 'Sign up functionality would go here!');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSocialLogin = (provider: string) => {
    alert(`${provider} login would redirect to OAuth flow!`);
  };

  return (
    <section id="auth" className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-4xl mb-8">Get Started</h2>
          <p className="text-slate-600 text-lg mb-12 max-w-2xl mx-auto">
            Want to stay updated with my latest projects and achievements? Sign up for exclusive access!
          </p>

          {!showAuth ? (
            <div className="flex justify-center gap-4">
              <Button
                size="lg"
                onClick={() => {
                  setShowAuth(true);
                  setIsLogin(true);
                }}
                className="bg-slate-900 text-white hover:bg-slate-800"
              >
                Login
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => {
                  setShowAuth(true);
                  setIsLogin(false);
                }}
                className="border-slate-900 text-slate-900 hover:bg-slate-50"
              >
                Sign Up
              </Button>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="max-w-md mx-auto"
            >
              <Card className="relative">
                <button
                  onClick={() => setShowAuth(false)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 transition-colors z-10"
                >
                  <X size={20} />
                </button>
                
                <CardHeader>
                  <CardTitle className="text-2xl">{isLogin ? 'Welcome Back' : 'Create Account'}</CardTitle>
                  <CardDescription>
                    {isLogin
                      ? 'Login to access your dashboard'
                      : 'Sign up to get started'}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  {/* Social Login Buttons */}
                  <div className="space-y-3 mb-6">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => handleSocialLogin('Google')}
                    >
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      Continue with Google
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => handleSocialLogin('Apple')}
                    >
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                      </svg>
                      Continue with Apple
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => handleSocialLogin('Microsoft')}
                    >
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 23 23">
                        <path fill="#f35325" d="M1 1h10v10H1z"/>
                        <path fill="#81bc06" d="M12 1h10v10H12z"/>
                        <path fill="#05a6f0" d="M1 12h10v10H1z"/>
                        <path fill="#ffba08" d="M12 12h10v10H12z"/>
                      </svg>
                      Continue with Microsoft
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => handleSocialLogin('LinkedIn')}
                    >
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="#0A66C2">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      Continue with LinkedIn
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => handleSocialLogin('GitHub')}
                    >
                      <Github className="w-5 h-5 mr-2" />
                      Continue with GitHub
                    </Button>
                  </div>

                  <div className="relative my-6">
                    <Separator />
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-xs text-slate-500">
                      OR
                    </span>
                  </div>

                  {/* Email/Password Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium text-slate-700">
                          Full Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                          <Input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={handleChange}
                            className="pl-10"
                            required={!isLogin}
                          />
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-slate-700">
                        Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="you@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="password" className="text-sm font-medium text-slate-700">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                        <Input
                          id="password"
                          name="password"
                          type="password"
                          placeholder="••••••••"
                          value={formData.password}
                          onChange={handleChange}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <Button type="submit" className="w-full bg-slate-900 text-white hover:bg-slate-800">
                      {isLogin ? 'Login' : 'Sign Up'}
                    </Button>
                  </form>

                  <div className="mt-4 text-center text-sm text-slate-600">
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button
                      onClick={() => setIsLogin(!isLogin)}
                      className="text-slate-900 font-medium hover:underline"
                    >
                      {isLogin ? 'Sign Up' : 'Login'}
                    </button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
