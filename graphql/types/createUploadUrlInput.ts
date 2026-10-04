export interface CreateUploadUrlInput {
  contentType: string;
  fileName: string;
  folder: string;
}

export interface UploadUrl {
  key: string;
  uploadUrl: string;
}

export interface CreateUploadUrlResponse {
  createUploadUrl: UploadUrl;
}
