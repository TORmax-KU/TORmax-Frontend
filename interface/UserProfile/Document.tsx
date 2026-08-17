export interface UserDocument {
    id: string;
    name: string;
    type: string;
    size: string;
    uploadedAt: string;
    status: 'pending' | 'verified' | 'rejected';
}