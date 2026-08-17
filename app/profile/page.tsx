'use client';

import { useState } from "react";
import { 
    RiCodeLine,
    RiGlobalLine,
    RiBuildingLine,
    RiStarLine,
    RiShareLine
} from "@remixicon/react";
import ActivityTimeline from "@/component/Profile/ActivityTimeline";
import UserDocuments from "@/component/Profile/UserDocuments";
import Education from "@/component/Profile/Education";
import PersonalInfo from "@/component/Profile/PersonalInfo";
import ProfessionalSummary from "@/component/Profile/ProfessionalSummary";
import ProfileHeader from "@/component/Profile/ProfileHeader";
import Skills from "@/component/Profile/Skills";
import TORPreferences from "@/component/Profile/TORPreferences";
import WorkExperience from "@/component/Profile/WorkExperience";
import { UserProfile } from "@/interface/UserProfile/UserProfile";
import { mockProfile } from '../../public/mockData/mockProfile';

export default function ProfilePage() {
    const [profile, setProfile] = useState<UserProfile>(mockProfile);
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState<'profile' | 'documents' | 'activity'>('profile');

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            {/* Profile Header */}
            <ProfileHeader 
                profile={profile}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
            />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Tabs */}
                    <div className="tabs tabs-lift">
                        <button 
                            className={`tab ${activeTab === 'profile' ? 'tab-active' : ''}`}
                            onClick={() => setActiveTab('profile')}
                        >
                            Profile
                        </button>
                        <button 
                            className={`tab ${activeTab === 'documents' ? 'tab-active' : ''}`}
                            onClick={() => setActiveTab('documents')}
                        >
                            Documents
                        </button>
                        <button 
                            className={`tab ${activeTab === 'activity' ? 'tab-active' : ''}`}
                            onClick={() => setActiveTab('activity')}
                        >
                            Activity
                        </button>
                    </div>

                    {/* Tab Content */}
                    <div>
                        {activeTab === 'profile' && (
                            <div className="space-y-6">
                                <ProfessionalSummary 
                                    bio={profile.bio}
                                    isEditing={isEditing}
                                    onUpdate={(bio) => setProfile({...profile, bio})}
                                />
                                <WorkExperience 
                                    experience={profile.experience}
                                    isEditing={isEditing}
                                    onUpdate={(experience) => setProfile({...profile, experience})}
                                />
                                <Education 
                                    education={profile.education}
                                    isEditing={isEditing}
                                    onUpdate={(education) => setProfile({...profile, education})}
                                />
                                <Skills 
                                    skills={profile.skills}
                                    isEditing={isEditing}
                                    onUpdate={(skills) => setProfile({...profile, skills})}
                                />
                                <TORPreferences 
                                    preferences={profile.torPreferences}
                                    isEditing={isEditing}
                                    onUpdate={(preferences) => setProfile({...profile, torPreferences: preferences})}
                                />
                            </div>
                        )}

                        {activeTab === 'documents' && (
                            <UserDocuments 
                                documents={profile.documents}
                                isEditing={isEditing}
                                onUpdate={(documents) => setProfile({...profile, documents})}
                            />
                        )}

                        {activeTab === 'activity' && (
                            <ActivityTimeline 
                                activity={profile.activity}
                            />
                        )}
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    {/* Personal Info Card */}
                    <PersonalInfo 
                        profile={profile}
                        isEditing={isEditing}
                        onUpdate={(field, value) => setProfile({...profile, [field]: value})}
                    />

                    {/* Statistics Card */}
                    <div className="bg-base-100 rounded-box shadow-lg p-6">
                        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                            <RiStarLine className="h-5 w-5 text-warning" />
                            Statistics
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="text-center p-3 bg-base-200 rounded-lg">
                                <div className="text-2xl font-bold text-primary">
                                    {profile.statistics.projectsCompleted}
                                </div>
                                <div className="text-xs text-base-content/60">Projects Completed</div>
                            </div>
                            <div className="text-center p-3 bg-base-200 rounded-lg">
                                <div className="text-2xl font-bold text-success">
                                    {profile.statistics.successRate}%
                                </div>
                                <div className="text-xs text-base-content/60">Success Rate</div>
                            </div>
                            <div className="text-center p-3 bg-base-200 rounded-lg">
                                <div className="text-2xl font-bold text-warning">
                                    {profile.statistics.avgRating}
                                </div>
                                <div className="text-xs text-base-content/60">Average Rating</div>
                            </div>
                            <div className="text-center p-3 bg-base-200 rounded-lg">
                                <div className="text-2xl font-bold text-info">
                                    {profile.statistics.reviews}
                                </div>
                                <div className="text-xs text-base-content/60">Reviews</div>
                            </div>
                        </div>
                    </div>

                    {/* Social Links Card */}
                    <div className="bg-base-100 rounded-box shadow-lg p-6">
                        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                            <RiShareLine className="h-5 w-5 text-accent" />
                            Social Links
                        </h3>
                        <div className="space-y-2">
                            {profile.socialLinks.linkedin && (
                                <a href={profile.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                                    <RiBuildingLine className="h-4 w-4" /> LinkedIn
                                </a>
                            )}
                            {profile.socialLinks.github && (
                                <a href={profile.socialLinks.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                                    <RiCodeLine className="h-4 w-4" /> GitHub
                                </a>
                            )}
                            {profile.socialLinks.portfolio && (
                                <a href={profile.socialLinks.portfolio} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                                    <RiGlobalLine className="h-4 w-4" /> Portfolio
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}