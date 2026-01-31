// src/types/auth.types.ts

export interface Role {
  id: number;
  name: string;
  title: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: {
    model_type: string;
    model_id: number;
    role_id: number;
  };
}

export interface Permission {
  id: number;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot?: {
    model_type: string;
    model_id: number;
    permission_id: number;
  };
}

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  roles: Role[];
  permissions: Permission[];
}

export interface UserLoginResponse {
  user: User;
  token: string;
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface ErrorResponse {
    message: string;
    status?: number
}