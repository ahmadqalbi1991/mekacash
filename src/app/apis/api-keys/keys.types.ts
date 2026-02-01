export interface ApiKeyData {
  id: number;
  user_id: number;
  api_public_key: string;
  api_secret_key: string;
  created_at: string;
  updated_at: string;
}

export interface GetApiKeyResponse {
  status: boolean;
  message: string;
  data: ApiKeyData | null;
}


export interface BaseResponse {
  status: boolean;
  message: string;
}

export interface ApiKeyData {
  id: number;
  user_id: number;
  api_public_key: string;
  api_secret_key: string;
  created_at: string;
  updated_at: string;
}

export interface GetApiKeyResponse extends BaseResponse {
  data: ApiKeyData | null;
}

export interface GenerateApiKeyData {
  id: number;
  user_id: number;
  api_public_key: string;
  api_secret_key: string;
  created_at: string;
  updated_at: string;
}

export interface GenerateApiKeyResponse extends BaseResponse {
  data: GenerateApiKeyData;
}

export type RevokeApiKeyResponse = BaseResponse;

