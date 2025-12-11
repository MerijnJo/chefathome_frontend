// Summary data for chef cards in list view
export interface ChefSummary {
  id: number;
  name: string;
  profilePicture: string;  // URL/path to image
  experience: number;       // years of experience
  foodOrigin: string;      // e.g., "Italian", "French"
  expertise: string;       // e.g., "Mediterranean cuisine"
  basePrice: number;       // base price per person
}

// Detailed data for individual chef page
export interface ChefDetail {
  id: number;
  name: string;
  profilePicture: string;
  experience: number;
  foodOrigin: string;
  expertise: string;
  basePrice: number;
  about: string;                    // longer description
  specialties: string[];            // 1-5 items
  setMenus: string[];              // 1-5 items
  dishGallery: string[];           // 1-5 image URLs
  extraInformation: string;
}

// Legacy type for backward compatibility
export type Chef = {
    id: number;
    name: string;
    cuisine: string;
    pricePerPerson: number;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

// Helper function to get fetch options with headers
function getFetchOptions(): RequestInit {
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };

    // Add authentication token if available
    const token = process.env.NEXT_PUBLIC_API_TOKEN;
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    return {
        headers,
        cache: "no-store" as RequestCache,
    };
}

export interface ChefFilterParams {
    foodOrigin?: string;
    expertise?: string;
    minExperience?: number;
    maxExperience?: number;
    minBasePrice?: number;
    maxBasePrice?: number;
}

export async function getChefs(filters?: ChefFilterParams): Promise<ChefSummary[]> {
    // Build query parameters
    const params = new URLSearchParams();

    if (filters) {
        if (filters.foodOrigin) params.append('foodOrigin', filters.foodOrigin);
        if (filters.expertise) params.append('expertise', filters.expertise);
        if (filters.minExperience !== undefined) params.append('minExperience', filters.minExperience.toString());
        if (filters.maxExperience !== undefined) params.append('maxExperience', filters.maxExperience.toString());
        if (filters.minBasePrice !== undefined) params.append('minBasePrice', filters.minBasePrice.toString());
        if (filters.maxBasePrice !== undefined) params.append('maxBasePrice', filters.maxBasePrice.toString());
    }

    const queryString = params.toString();
    const url = `${API_URL}/api/chefs${queryString ? `?${queryString}` : ''}`;
    console.log('Fetching chefs from:', url);

    try {
        const res = await fetch(url, getFetchOptions());
        console.log('Response status:', res.status);
        console.log('Response headers:', Object.fromEntries(res.headers.entries()));

        if (!res.ok) {
            if (res.status === 401) {
                throw new Error('Authentication required. Please check if the API endpoint requires authentication or if your credentials are correct.');
            }
            const errorText = await res.text();
            console.error('Error response body:', errorText || '(empty)');
            console.error('Response status:', res.status, res.statusText);

            // Provide more specific error messages based on status code
            if (res.status === 404) {
                throw new Error(`API endpoint not found (404). Make sure your backend has a GET /api/chefs endpoint.`);
            } else if (res.status === 500) {
                throw new Error(`Backend server error (500). Check your backend logs for details. Error: ${errorText || 'No error message provided'}`);
            } else if (res.status === 403) {
                throw new Error(`Access forbidden (403). Check your SecurityConfig.java for CORS and authentication settings.`);
            }

            throw new Error(`Failed to fetch chefs (${res.status} ${res.statusText}): ${errorText || 'No error message provided'}`);
        }

        const contentType = res.headers.get('content-type');
        console.log('Content-Type:', contentType);

        if (!contentType || !contentType.includes('application/json')) {
            const text = await res.text();
            console.error('Expected JSON but got:', text);
            throw new Error(`Backend returned non-JSON response. Got: ${text.substring(0, 100)}`);
        }

        const data = await res.json();
        console.log('Fetched chefs:', data);

        if (!Array.isArray(data)) {
            console.error('Expected array but got:', typeof data, data);
            throw new Error(`Backend returned invalid data format. Expected array of chefs.`);
        }

        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        if (error instanceof TypeError && error.message.includes('fetch')) {
            throw new Error(`Cannot connect to API at ${url}. Make sure the backend is running.`);
        }
        throw error;
    }
}

export async function getChefById(id: number): Promise<ChefDetail> {
    const url = `${API_URL}/api/chefs/${id}`;
    console.log('Fetching chef details from:', url);

    try {
        const res = await fetch(url, getFetchOptions());
        console.log('Response status:', res.status);
        console.log('Response headers:', Object.fromEntries(res.headers.entries()));

        if (!res.ok) {
            if (res.status === 401) {
                throw new Error('Authentication required. Please check if the API endpoint requires authentication or if your credentials are correct.');
            }
            const errorText = await res.text();
            console.error('Error response body:', errorText || '(empty)');
            console.error('Response status:', res.status, res.statusText);

            // Provide more specific error messages based on status code
            if (res.status === 404) {
                throw new Error(`Chef with ID ${id} not found (404). The chef may not exist in the database.`);
            } else if (res.status === 500) {
                throw new Error(`Backend server error (500). Check your backend logs. Error: ${errorText || 'No error message provided'}`);
            } else if (res.status === 403) {
                throw new Error(`Access forbidden (403). Check your SecurityConfig.java settings.`);
            }

            throw new Error(`Failed to fetch chef details (${res.status} ${res.statusText}): ${errorText || 'No error message provided'}`);
        }

        const contentType = res.headers.get('content-type');
        console.log('Content-Type:', contentType);

        if (!contentType || !contentType.includes('application/json')) {
            const text = await res.text();
            console.error('Expected JSON but got:', text);
            throw new Error(`Backend returned non-JSON response. Got: ${text.substring(0, 100)}`);
        }

        const data = await res.json();
        console.log('Fetched chef details:', data);
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        if (error instanceof TypeError && error.message.includes('fetch')) {
            throw new Error(`Cannot connect to API at ${url}. Make sure the backend is running.`);
        }
        throw error;
    }
}

export async function seedChef(): Promise<Chef> {
    const res = await fetch(`${API_URL}/api/chefs/seed`, { method: "POST" });
    if (!res.ok) throw new Error("Failed to seed chef");
    return res.json();
}
