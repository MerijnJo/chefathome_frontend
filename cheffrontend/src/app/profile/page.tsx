"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api, User, UserDetails, UserDetailsInput } from "@/services/api";

export default function ProfilePage() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [isNewProfile, setIsNewProfile] = useState(false);

    const [formData, setFormData] = useState<UserDetailsInput>({
        firstName: "",
        lastName: "",
        city: "",
        bio: "",
        favouriteCuisine: "",
        dietaryRestrictions: "",
    });

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            router.push("/login");
            return;
        }

        loadProfileData();
    }, [router]);

    async function loadProfileData() {
        try {
            setIsLoading(true);
            setError(null);

            const [userData, detailsData] = await Promise.all([
                api.getCurrentUser(),
                api.getUserDetails(),
            ]);

            setUser(userData);

            if (detailsData) {
                setUserDetails(detailsData);
                setFormData({
                    firstName: detailsData.firstName,
                    lastName: detailsData.lastName,
                    city: detailsData.city,
                    bio: detailsData.bio,
                    favouriteCuisine: detailsData.favouriteCuisine,
                    dietaryRestrictions: detailsData.dietaryRestrictions,
                });
                setIsNewProfile(false);
            } else {
                setIsNewProfile(true);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to load profile");
        } finally {
            setIsLoading(false);
        }
    }

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    function handleReset() {
        if (userDetails) {
            setFormData({
                firstName: userDetails.firstName,
                lastName: userDetails.lastName,
                city: userDetails.city,
                bio: userDetails.bio,
                favouriteCuisine: userDetails.favouriteCuisine,
                dietaryRestrictions: userDetails.dietaryRestrictions,
            });
        } else {
            setFormData({
                firstName: "",
                lastName: "",
                city: "",
                bio: "",
                favouriteCuisine: "",
                dietaryRestrictions: "",
            });
        }
        setError(null);
        setSuccess(null);
    }

    function handleLogout() {
        api.logout();
        router.push("/login");
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (formData.bio.length > 500) {
            setError("Bio must be 500 characters or less");
            return;
        }

        if (formData.dietaryRestrictions.length > 500) {
            setError("Dietary restrictions must be 500 characters or less");
            return;
        }

        try {
            setIsSaving(true);

            const updatedDetails = isNewProfile
                ? await api.createUserDetails(formData)
                : await api.updateUserDetails(formData);

            setUserDetails(updatedDetails);
            setIsNewProfile(false);
            setSuccess("Profile updated successfully!");

            setTimeout(() => setSuccess(null), 3000);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to save profile");
        } finally {
            setIsSaving(false);
        }
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-nyanza flex items-center justify-center">
                <div className="text-lapis text-xl">Loading profile...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-nyanza py-8 px-4">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
                    <div className="flex justify-between items-center mb-2">
                        <h1 className="text-3xl font-bold text-lapis">My Profile</h1>
                        <button
                            onClick={handleLogout}
                            className="bg-red-600 text-white px-6 py-2 rounded-md font-medium hover:bg-red-700 transition"
                        >
                            Logout
                        </button>
                    </div>

                    {user && (
                        <div className="mb-6 pb-6 border-b border-gray-200">
                            <p className="text-gray-600">
                                <span className="font-medium">Email:</span> {user.email}
                            </p>
                            <p className="text-gray-600">
                                <span className="font-medium">Username:</span> {user.username}
                            </p>
                        </div>
                    )}

                    {error && (
                        <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-md">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="mb-4 p-4 bg-green-50 border border-green-200 text-green-700 rounded-md">
                            {success}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    disabled={isSaving}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-lapis focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed text-black"
                                />
                            </div>

                            <div>
                                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    disabled={isSaving}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-lapis focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed text-black"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                                City
                            </label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                disabled={isSaving}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-lapis focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed text-black"
                            />
                        </div>

                        <div>
                            <label htmlFor="favouriteCuisine" className="block text-sm font-medium text-gray-700 mb-1">
                                Favourite Cuisine
                            </label>
                            <input
                                type="text"
                                id="favouriteCuisine"
                                name="favouriteCuisine"
                                value={formData.favouriteCuisine}
                                onChange={handleChange}
                                disabled={isSaving}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-lapis focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed text-black"
                            />
                        </div>

                        <div>
                            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                                Bio
                                <span className="ml-2 text-xs text-gray-500">
                  ({formData.bio.length}/500 characters)
                </span>
                            </label>
                            <textarea
                                id="bio"
                                name="bio"
                                value={formData.bio}
                                onChange={handleChange}
                                disabled={isSaving}
                                rows={4}
                                maxLength={500}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-lapis focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed resize-none text-black"
                            />
                        </div>

                        <div>
                            <label htmlFor="dietaryRestrictions" className="block text-sm font-medium text-gray-700 mb-1">
                                Dietary Restrictions
                                <span className="ml-2 text-xs text-gray-500">
                  ({formData.dietaryRestrictions.length}/500 characters)
                </span>
                            </label>
                            <textarea
                                id="dietaryRestrictions"
                                name="dietaryRestrictions"
                                value={formData.dietaryRestrictions}
                                onChange={handleChange}
                                disabled={isSaving}
                                rows={4}
                                maxLength={500}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-lapis focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed resize-none text-black"
                            />
                        </div>

                        {userDetails && (
                            <p className="text-sm text-gray-500">
                                Last updated: {new Date(userDetails.updatedAt).toLocaleString()}
                            </p>
                        )}

                        <div className="flex gap-4 pt-4">
                            <button
                                type="submit"
                                disabled={isSaving}
                                className="flex-1 bg-lapis text-white py-3 px-6 rounded-md font-medium hover:bg-opacity-90 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                                {isSaving ? "Saving..." : "Save Profile"}
                            </button>
                            <button
                                type="button"
                                onClick={handleReset}
                                disabled={isSaving}
                                className="px-6 py-3 border border-gray-300 rounded-md font-medium hover:bg-gray-50 transition disabled:bg-gray-100 disabled:cursor-not-allowed"
                            >
                                Reset
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
