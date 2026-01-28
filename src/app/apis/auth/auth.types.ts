//types
type User = {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    created_at: string;
    updated_at: string;
    roles: [];
    permissions: [];
}

// payloads
export interface LoginPayload {
    email: string;
    password: string;
}

// responses
export interface LoginResponse {
    user: User;
}

export interface ErrorResponse {
    message: string;
    status?: number
}