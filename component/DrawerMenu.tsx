import Link from "next/link";
import DrawerMenu from "./DrawerMenu";
import NotificationButton from "./NotificationButton";

export default function Navbar() {
    return (
        <div className="navbar bg-base-100 shadow-lg px-4">
            {/* Left: Hamburger Menu */}
            <div className="navbar-start">
                <DrawerMenu />
            </div>

            {/* Center: Logo */}
            <div className="navbar-center">
                <Link href="/" className="text-xl font-bold">
                    TOR Hub
                </Link>
            </div>

            {/* Right: Actions */}
            <div className="navbar-end">
                <NotificationButton />
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <span className="text-sm font-bold">JD</span>
                        </div>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li><Link href="/profile">Profile</Link></li>
                        <li><Link href="/settings">Settings</Link></li>
                        <li><hr className="my-1" /></li>
                        <li><button className="text-error">Logout</button></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}