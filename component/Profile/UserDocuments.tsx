'use client';

import { UserDocument } from "@/interface/UserProfile/Document";
import { RiFileListLine, RiUploadLine, RiCheckLine, RiCloseLine, RiTimeLine } from "@remixicon/react";

interface UserDocumentsProps {
    documents: UserDocument[];
    isEditing: boolean;
    onUpdate: (documents: UserDocument[]) => void;
}

export default function UserDocuments({ documents, isEditing, onUpdate }: UserDocumentsProps) {
    const getStatusBadge = (status: string) => {
        switch(status) {
            case 'verified':
                return <span className="badge badge-success gap-1"><RiCheckLine className="h-3 w-3" /> Verified</span>;
            case 'pending':
                return <span className="badge badge-warning gap-1"><RiTimeLine className="h-3 w-3" /> Pending</span>;
            case 'rejected':
                return <span className="badge badge-error gap-1"><RiCloseLine className="h-3 w-3" /> Rejected</span>;
            default:
                return <span className="badge badge-ghost">{status}</span>;
        }
    };

    return (
        <div className="bg-base-100 rounded-box shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                    <RiFileListLine className="h-5 w-5 text-success" />
                    Documents
                </h3>
                {isEditing && (
                    <button className="btn btn-primary btn-sm gap-1">
                        <RiUploadLine className="h-4 w-4" />
                        Upload
                    </button>
                )}
            </div>

            <div className="space-y-3">
                {documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-3 bg-base-200 rounded-lg">
                        <div>
                            <p className="font-medium text-sm">{doc.name}</p>
                            <p className="text-xs text-base-content/40">{doc.type} • {doc.size}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            {getStatusBadge(doc.status)}
                            <span className="text-xs text-base-content/40">{doc.uploadedAt}</span>
                        </div>
                    </div>
                ))}

                {documents.length === 0 && (
                    <div className="text-center py-8 text-base-content/40">
                        <RiFileListLine className="h-12 w-12 mx-auto mb-2 opacity-20" />
                        <p>No documents uploaded yet</p>
                    </div>
                )}
            </div>
        </div>
    );
}