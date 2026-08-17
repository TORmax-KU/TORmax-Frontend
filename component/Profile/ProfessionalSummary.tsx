'use client';

interface ProfessionalSummaryProps {
    bio: string;
    isEditing: boolean;
    onUpdate: (bio: string) => void;
}

export default function ProfessionalSummary({ bio, isEditing, onUpdate }: ProfessionalSummaryProps) {
    return (
        <div className="bg-base-100 rounded-box shadow-lg p-6">
            <h3 className="font-semibold text-lg mb-3">Professional Summary</h3>
            {isEditing ? (
                <textarea 
                    className="textarea textarea-bordered w-full h-32"
                    value={bio}
                    onChange={(e) => onUpdate(e.target.value)}
                    placeholder="Write your professional summary..."
                />
            ) : (
                <p className="text-sm text-base-content/80 leading-relaxed">{bio}</p>
            )}
        </div>
    );
}