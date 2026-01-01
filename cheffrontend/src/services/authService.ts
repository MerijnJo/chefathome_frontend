
interface RegisterRequest {
    email: string;
    username: string;
    password: string;
}

interface RegisterResponse {
    id: number;
    email: string;
    username: string;
    role: string;
    createdAt: string;
}

interface ApiError {
    message: string;
    status: number;
}

export const registerUser = async (
    data: RegisterRequest
): Promise<RegisterResponse> => {
    const response = await fetch('http://localhost:8080/api/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorText = await response.text();
        const error: ApiError = {
            message: errorText || 'Registration failed',
            status: response.status,
        };
        throw error;
    }

    return response.json();
};
