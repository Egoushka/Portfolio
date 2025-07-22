export * from './lib/generated-portfolio-api-types';

// Simple model interfaces
export interface ProjectInfo {
  id?: number;
  title?: string | null;
  description?: string | null;
  technologies?: Array<string> | null;
  imageUrl?: string | null;
  liveUrl?: string | null;
  githubUrl?: string | null;
  createdDate?: Date;
  isFeatured?: boolean;
}

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt?: Date;
}

export interface ContactResponse {
  success: boolean;
  message: string;
}
