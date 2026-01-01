'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { registerUser } from '@/services/authService';

export default function RegisterForm() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const [validationErrors, setValidationErrors] = useState({
        email: '',
        username: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setValidationErrors(prev => ({ ...prev, [name]: '' }));
        setError('');
    };

    const validateForm = (): boolean => {
        const errors = { email: '', username: '', password: '' };

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            errors.email = 'Please enter a valid email address';
        }

        if (formData.username.trim().length === 0) {
            errors.username = 'Username is required';
        }

        if (formData.password.length < 8) {
            errors.password = 'Password must be at least 8 characters';
        }

        setValidationErrors(errors);
        return !errors.email && !errors.username && !errors.password;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);
        setError('');

        try {
            await registerUser(formData);
            setSuccess(true);

            setTimeout(() => {
                router.push('/');
            }, 2000);
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Registration failed. Please try again.';
            setError(errorMessage);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#D5ECD4] flex justify-center items-center p-5">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white/80 border border-gray-200 rounded-xl p-8 shadow-lg"
            >
                <h2 className="text-3xl font-semibold text-[#2D5D7B] text-center mb-8">
                    Create Account
                </h2>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg p-3 mb-6 text-sm">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="bg-green-500/10 border border-green-500/20 text-green-500 rounded-lg p-3 mb-6 text-sm">
                        Registration successful! Redirecting to login...
                    </div>
                )}

                <div className="mb-5">
                    <label htmlFor="email" className="block text-[#2D5D7B] font-medium mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={loading || success}
                        required
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg
                                   text-gray-800 placeholder-gray-400 focus:outline-none
                                   focus:border-[#2D5D7B] focus:ring-1 focus:ring-[#2D5D7B]
                                   disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    {validationErrors.email && (
                        <span className="block text-red-500 text-xs mt-1">
                            {validationErrors.email}
                        </span>
                    )}
                </div>

                <div className="mb-5">
                    <label htmlFor="username" className="block text-[#2D5D7B] font-medium mb-2">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        disabled={loading || success}
                        required
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg
                                   text-gray-800 placeholder-gray-400 focus:outline-none
                                   focus:border-[#2D5D7B] focus:ring-1 focus:ring-[#2D5D7B]
                                   disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    {validationErrors.username && (
                        <span className="block text-red-500 text-xs mt-1">
                            {validationErrors.username}
                        </span>
                    )}
                </div>

                <div className="mb-6">
                    <label htmlFor="password" className="block text-[#2D5D7B] font-medium mb-2">
                        Password
                    </label>
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            disabled={loading || success}
                            autoComplete="new-password"
                            required
                            className="w-full px-4 py-3 pr-12 bg-white border border-gray-300 rounded-lg
                                       text-gray-800 placeholder-gray-400 focus:outline-none
                                       focus:border-[#2D5D7B] focus:ring-1 focus:ring-[#2D5D7B]
                                       disabled:opacity-50 disabled:cursor-not-allowed [&::-ms-reveal]:hidden [&::-ms-clear]:hidden"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            disabled={loading || success}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500
                                       hover:text-[#2D5D7B] transition disabled:opacity-50"
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-5 h-5"
                            >
                                {showPassword ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                    {validationErrors.password && (
                        <span className="block text-red-500 text-xs mt-1">
                            {validationErrors.password}
                        </span>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={loading || success}
                    className="w-full py-3 bg-[#D5ECD4] text-[#2D5D7B] font-bold rounded-lg
                               hover:bg-[#C3DAC3] transition disabled:opacity-50
                               disabled:cursor-not-allowed text-lg border-2 border-[#2D5D7B]/20"
                >
                    {loading ? 'Creating Account...' : 'Register'}
                </button>
            </form>
        </div>
    );
}
