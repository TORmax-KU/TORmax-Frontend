'use client'

// import RangeSlider from "react-range-slider-input";

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
                top: 0,
                height: '80vh'
            }}>
                <div className="avatar">
                    <div className="w-24 rounded-full">
                        <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
                    </div>
                </div>
            </div>

            <fieldset className="fieldset">
                <label className="label" htmlFor="username">Username</label>
                <input type="text" id="username" className="input" placeholder="username" />

                <label className="label" htmlFor="firstname">Firstname</label>
                <input type="text" id="firstname" className="input" placeholder="firstname" />

                <label className="label" htmlFor="lastname">Lastname</label>
                <input type="text" id="lastname" className="input" placeholder="lastname" />

                <label className="label" htmlFor="phonenumber">Phone Number</label>
                <input type="text" id="phonenumber" className="input" placeholder="phone number" />

                <label className="label" htmlFor="email">Email</label>
                <input type="text" id="email" className="input" placeholder="email" />

                {/* <RangeSlider/> */}
            </fieldset>
        </div>
    )
}