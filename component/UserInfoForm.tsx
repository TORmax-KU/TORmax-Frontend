'use client'

import React, { useEffect, useRef, useState } from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";


export default function UserInfoForm() {
    const [value, setValue] = useState([0, 1000000]);
    const ref = useRef();

    useEffect(() => {
        console.log(ref.current);
    }, []);

    return (
        <div>
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

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 20
                }}>
                    <div style={{
                        fontSize: 15,
                        paddingTop: 25
                    }}>
                        Budget Requirement
                    </div>
                    <div style={{ display: 'flex', gap: 20, width: 210}}>
                        <div>
                            <label className="label" htmlFor="minprice">Min</label>
                            <input
                                type="number"
                                id="min-price"
                                className="input"
                                placeholder="0"
                                value={value[0]}
                                onInput={(e) => setValue(Number(e.target.value), value[1])}
                            />
                        </div>
                        <div>
                            <label className="label" htmlFor="maxprice">Max</label>
                            <input
                                type="number"
                                id="max-price"
                                className="input"
                                placeholder="No limit"
                                value={value[1]}
                                onInput={(e) => setValue(value[0], Number(e.target.value))}
                            />                        </div>
                    </div>

                    <RangeSlider id="min-max-price-range-slider" min={0} max={999999999} step={100000} ref={ref} value={value} onInput={setValue} className="margin-lg" />
                </div>

            </fieldset>


        </div>

    )
}