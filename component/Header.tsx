import { RiUser3Fill } from "@remixicon/react";
import Link from "next/link";
import NotificationButton from "./NotificationButton";
import Navbar from "./DrawerMenu";

export default function Header() {

    return (
        <div className="navbar bg-base-100 shadow-sm" style={{
            position: 'sticky',
            top: 0,
            zIndex: 1000,
        }}>
            <div className="navbar-start">
                <Navbar/>
            </div>
            <div className="navbar-center">
                <Link href="/" className="btn btn-ghost text-xl">TORmax</Link>
            </div>
            <div className="navbar-end">
                <Link href="/tor-list">
                <button className="btn btn-ghost btn-circle">
                    {/* expand to searchbar then hit enter go to project list page */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /> </svg>
                </button>
                </Link>

                <Link href="/profile">
                <button className="btn btn-ghost btn-circle">
                    <RiUser3Fill />
                </button>
                </Link>
                
                <NotificationButton />
            </div>
        </div>
    )
}   