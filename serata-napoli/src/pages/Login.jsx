import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
    Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles,
    Facebook, Chrome, AlertCircle
} from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.email) {
            newErrors.email = 'Email obbligatoria';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email non valida';
        }

        if (!formData.password) {
            newErrors.password = 'Password obbligatoria';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password troppo corta';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            // On success, set login state and redirect to home
            localStorage.setItem('isLoggedIn', 'true');
            navigate('/');
        }, 1500);
    };

    const handleSocialLogin = (provider) => {
        // Handle social login
        console.log(`Login with ${provider}`);
    };

    return (
        <main className="min-h-screen bg-[#050816] text-white">
            <Navigation />

            <section className="relative mt-20 px-4 py-12">
                <div className="mx-auto max-w-md">

                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-2 rounded-full bg-orange-500/20 border border-orange-500/30 px-4 py-2 text-sm text-orange-300 mb-6">
                            <Sparkles size={15} />
                            Bentornato
                        </div>
                        <h1 className="text-3xl font-black text-white mb-2">Accedi al tuo account</h1>
                        <p className="text-white/60">Scopri i migliori locali di Napoli</p>
                    </div>

                    {/* Social Login */}
                    <div className="space-y-3 mb-6">
                        <button
                            onClick={() => handleSocialLogin('google')}
                            className="w-full flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-white hover:bg-white/10 transition-colors"
                        >
                            <Chrome size={20} />
                            Continua con Google
                        </button>

                        <button
                            onClick={() => handleSocialLogin('facebook')}
                            className="w-full flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-white hover:bg-white/10 transition-colors"
                        >
                            <Facebook size={20} />
                            Continua con Facebook
                        </button>
                    </div>

                    {/* Divider */}
                    <div className="flex items-center gap-4 mb-6">
                        <div className="flex-1 h-px bg-white/10"></div>
                        <span className="text-white/40 text-sm">oppure</span>
                        <div className="flex-1 h-px bg-white/10"></div>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-white/70 mb-2">
                                Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                    className={`w-full rounded-xl border bg-white/5 py-3 pl-10 pr-4 text-white placeholder:text-white/30 focus:border-orange-400/50 focus:outline-none transition-colors ${errors.email ? 'border-red-400/50' : 'border-white/10'
                                        }`}
                                    placeholder="test@example.com"
                                />
                            </div>
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                                    <AlertCircle size={14} />
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-white/70 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={(e) => handleInputChange('password', e.target.value)}
                                    className={`w-full rounded-xl border bg-white/5 py-3 pl-10 pr-12 text-white placeholder:text-white/30 focus:border-orange-400/50 focus:outline-none transition-colors ${errors.password ? 'border-red-400/50' : 'border-white/10'
                                        }`}
                                    placeholder="password123"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                                    <AlertCircle size={14} />
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 text-sm">
                                <input
                                    type="checkbox"
                                    checked={formData.rememberMe}
                                    onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
                                    className="rounded border-white/20 bg-white/10 text-orange-500 focus:ring-orange-500"
                                />
                                <span className="text-white/70">Ricordami</span>
                            </label>

                            <button
                                type="button"
                                className="text-sm text-orange-400 hover:text-orange-300"
                            >
                                Password dimenticata?
                            </button>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex items-center justify-center gap-2 rounded-xl bg-orange-500 py-4 font-semibold text-white hover:bg-orange-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    Accedi
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Sign Up Link */}
                    <p className="text-center mt-6 text-white/60">
                        Non hai un account?{' '}
                        <Link
                            to="/register"
                            className="text-orange-400 hover:text-orange-300 font-semibold"
                        >
                            Registrati
                        </Link>
                    </p>

                </div>
            </section>

            <Footer />
        </main>
    );
}