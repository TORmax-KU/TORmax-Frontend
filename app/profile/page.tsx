'use client'

import ProfessionInfoForm from "@/component/Profile/ProfessionInfoForm"
import UserInfoForm from "@/component/Profile/UserInfoForm"

export default function UserProfile() {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 50,
            paddingTop: 50
        }}>
            <div style={{
                position: 'sticky',
                top: '30vh',
                height: '80vh'
            }}>
                <div className="avatar">
                    <div className="w-24 rounded-full">
                        <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
                    </div>
                </div>
            </div>
            <div>
                <UserInfoForm/>
                <ProfessionInfoForm/>
            </div>
        </div>
    )
}