/* eslint-disable react-hooks/static-components */
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
    User, Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles,
    Facebook, Chrome, AlertCircle, Check
} from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false,
        newsletter: true
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState(1);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const validateStep1 = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Nome obbligatorio';
        } else if (formData.name.trim().length < 2) {
            newErrors.name = 'Nome troppo corto';
        }

        if (!formData.email) {
            newErrors.email = 'Email obbligatoria';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email non valida';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep2 = () => {
        const newErrors = {};

        if (!formData.password) {
            newErrors.password = 'Password obbligatoria';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password deve essere di almeno 8 caratteri';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
            newErrors.password = 'Password deve contenere maiuscola, minuscola e numero';
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Conferma password obbligatoria';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Le password non coincidono';
        }

        if (!formData.acceptTerms) {
            newErrors.acceptTerms = 'Devi accettare i termini di servizio';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (step === 1 && validateStep1()) {
            setStep(2);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateStep2()) return;

        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            // On success, redirect to home
            navigate('/');
        }, 2000);
    };

    const handleSocialRegister = (provider) => {
        // Handle social registration
        console.log(`Register with ${provider}`);
    };

    const PasswordStrength = ({ password }) => {
        const getStrength = (pwd) => {
            let strength = 0;
            if (pwd.length >= 8) strength++;
            if (/[a-z]/.test(pwd)) strength++;
            if (/[A-Z]/.test(pwd)) strength++;
            if (/\d/.test(pwd)) strength++;
            if (/[^A-Za-z\d]/.test(pwd)) strength++;
            return strength;
        };

        const strength = getStrength(password);
        const labels = ['Molto debole', 'Debole', 'Buona', 'Forte', 'Molto forte'];
        const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];

        return password ? (
            <div className="mt-2">
                <div className="flex gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                        <div
                            key={i}
                            className={`h-1 flex-1 rounded-full ${i < strength ? colors[strength - 1] : 'bg-white/20'
                                }`}
                        />
                    ))}
                </div>
                <p className={`text-xs ${strength >= 3 ? 'text-green-400' : 'text-orange-400'}`}>
                    {labels[strength - 1] || 'Inserisci password'}
                </p>
            </div>
        ) : null;
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
                            Unisciti a noi
                        </div>
                        <h1 className="text-3xl font-black text-white mb-2">Crea il tuo account</h1>
                        <p className="text-white/60">Inizia la tua avventura notturna a Napoli</p>
                    </div>

                    {/* Progress Indicator */}
                    <div className="flex items-center justify-center gap-2 mb-8">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 1 ? 'bg-orange-500 text-white' : 'bg-white/10 text-white/40'
                            }`}>
                            1
                        </div>
                        <div className={`w-8 h-1 ${step >= 2 ? 'bg-orange-500' : 'bg-white/10'}`} />
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 2 ? 'bg-orange-500 text-white' : 'bg-white/10 text-white/40'
                            }`}>
                            2
                        </div>
                    </div>

                    {/* Social Register */}
                    <div className="space-y-3 mb-6">
                        <button
                            onClick={() => handleSocialRegister('google')}
                            className="w-full flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-white hover:bg-white/10 transition-colors"
                        >
                            <Chrome size={20} />
                            Registrati con Google
                        </button>

                        <button
                            onClick={() => handleSocialRegister('facebook')}
                            className="w-full flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-white hover:bg-white/10 transition-colors"
                        >
                            <Facebook size={20} />
                            Registrati con Facebook
                        </button>
                    </div>

                    {/* Divider */}
                    <div className="flex items-center gap-4 mb-6">
                        <div className="flex-1 h-px bg-white/10"></div>
                        <span className="text-white/40 text-sm">oppure</span>
                        <div className="flex-1 h-px bg-white/10"></div>
                    </div>

                    {/* Registration Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Step 1: Basic Info */}
                        {step === 1 && (
                            <>
                                {/* Name */}
                                <div>
                                    <label className="block text-sm font-medium text-white/70 mb-2">
                                        Nome completo
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => handleInputChange('name', e.target.value)}
                                            className={`w-full rounded-xl border bg-white/5 py-3 pl-10 pr-4 text-white placeholder:text-white/30 focus:border-orange-400/50 focus:outline-none transition-colors ${errors.name ? 'border-red-400/50' : 'border-white/10'
                                                }`}
                                            placeholder="Il tuo nome"
                                        />
                                    </div>
                                    {errors.name && (
                                        <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                                            <AlertCircle size={14} />
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

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
                                            placeholder="tua@email.com"
                                        />
                                    </div>
                                    {errors.email && (
                                        <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                                            <AlertCircle size={14} />
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                {/* Next Button */}
                                <button
                                    type="button"
                                    onClick={handleNext}
                                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-orange-500 py-4 font-semibold text-white hover:bg-orange-400 transition-colors"
                                >
                                    Continua
                                    <ArrowRight size={18} />
                                </button>
                            </>
                        )}

                        {/* Step 2: Password & Terms */}
                        {step === 2 && (
                            <>
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
                                            placeholder="••••••••"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60"
                                        >
                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                    <PasswordStrength password={formData.password} />
                                    {errors.password && (
                                        <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                                            <AlertCircle size={14} />
                                            {errors.password}
                                        </p>
                                    )}
                                </div>

                                {/* Confirm Password */}
                                <div>
                                    <label className="block text-sm font-medium text-white/70 mb-2">
                                        Conferma password
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                                        <input
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            value={formData.confirmPassword}
                                            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                                            className={`w-full rounded-xl border bg-white/5 py-3 pl-10 pr-12 text-white placeholder:text-white/30 focus:border-orange-400/50 focus:outline-none transition-colors ${errors.confirmPassword ? 'border-red-400/50' : 'border-white/10'
                                                }`}
                                            placeholder="••••••••"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60"
                                        >
                                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                    {formData.confirmPassword && formData.password === formData.confirmPassword && (
                                        <p className="mt-1 text-sm text-green-400 flex items-center gap-1">
                                            <Check size={14} />
                                            Password confermate
                                        </p>
                                    )}
                                    {errors.confirmPassword && (
                                        <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                                            <AlertCircle size={14} />
                                            {errors.confirmPassword}
                                        </p>
                                    )}
                                </div>

                                {/* Terms & Newsletter */}
                                <div className="space-y-4">
                                    <label className="flex items-start gap-3 text-sm">
                                        <input
                                            type="checkbox"
                                            checked={formData.acceptTerms}
                                            onChange={(e) => handleInputChange('acceptTerms', e.target.checked)}
                                            className="mt-0.5 rounded border-white/20 bg-white/10 text-orange-500 focus:ring-orange-500"
                                        />
                                        <span className="text-white/70">
                                            Accetto i{' '}
                                            <Link to="/terms" className="text-orange-400 hover:text-orange-300">
                                                termini di servizio
                                            </Link>{' '}
                                            e l'{' '}
                                            <Link to="/privacy" className="text-orange-400 hover:text-orange-300">
                                                informativa privacy
                                            </Link>
                                        </span>
                                    </label>
                                    {errors.acceptTerms && (
                                        <p className="text-sm text-red-400 flex items-center gap-1">
                                            <AlertCircle size={14} />
                                            {errors.acceptTerms}
                                        </p>
                                    )}

                                    <label className="flex items-center gap-3 text-sm">
                                        <input
                                            type="checkbox"
                                            checked={formData.newsletter}
                                            onChange={(e) => handleInputChange('newsletter', e.target.checked)}
                                            className="rounded border-white/20 bg-white/10 text-orange-500 focus:ring-orange-500"
                                        />
                                        <span className="text-white/70">
                                            Iscriviti alla newsletter per ricevere aggiornamenti sui migliori locali
                                        </span>
                                    </label>
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
                                            Crea account
                                            <ArrowRight size={18} />
                                        </>
                                    )}
                                </button>

                                {/* Back Button */}
                                <button
                                    type="button"
                                    onClick={() => setStep(1)}
                                    className="w-full flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-3 text-white hover:bg-white/10 transition-colors"
                                >
                                    Torna indietro
                                </button>
                            </>
                        )}
                    </form>

                    {/* Sign In Link */}
                    <p className="text-center mt-6 text-white/60">
                        Hai già un account?{' '}
                        <Link
                            to="/login"
                            className="text-orange-400 hover:text-orange-300 font-semibold"
                        >
                            Accedi
                        </Link>
                    </p>

                </div>
            </section>

            <Footer />
        </main>
    );
}