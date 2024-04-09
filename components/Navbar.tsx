"use client";

import Image from "next/image";
import Link from "next/link";

import { usePathname } from "next/navigation";

import LogoutButton from "./LogoutButton";

export default function Navbar() {
	const pathname = usePathname();

	return (
		<nav className="navbar">
			{/* brand */}
			<Link href="/" className="hidden [@media(min-width:780px)]:block [@media(min-width:780px)]:self-center">
				<Image src="/images/logo.svg" alt="logo" width={100} height={100} />
			</Link>

			{/* navList */}
			<ul className="navList">
				<li>
					<Link
						href="/dashboard"
						className={`navLink ${pathname === "/dashboard" ? "active" : ""}`}
					>
						<Image
							src="/images/home-icon.svg"
							alt="logo"
							width={20}
							height={20}
						/>
						<span>Home</span>
					</Link>
				</li>
				<li>
					<Link
						href="/dashboard/reels"
						className={`navLink ${
							pathname === "/dashboard/reels" ? "active" : ""
						}`}
					>
						<Image src="/images/reels.svg" alt="logo" width={20} height={20} />
						<span>Reels</span>
					</Link>
				</li>
				<li>
					<Link
						href="/dashboard/event"
						className={`navLink ${
							pathname === "/dashboard/event" ? "active" : ""
						}`}
					>
						<Image src="/images/event.svg" alt="logo" width={20} height={20} />
						<span>Event</span>
					</Link>
				</li>
				{/* <li>
					<Link href="/search" className={`navLink ${pathname === '/dashboard' ? 'active' : ''}`}>
						<Image src="/images/search.svg" alt="logo" width={20} height={20} />
						<span>Search</span>
					</Link>
				</li> */}
				<li>
					<Link
						href="/dashboard/news"
						className={`navLink ${
							pathname === "/dashboard/news" ? "active" : ""
						}`}
					>
						<Image src="/images/event.svg" alt="logo" width={20} height={20} />
						<span>News</span>
					</Link>
				</li>
				<li>
					<Link
						href="/dashboard/profile"
						className={`navLink ${
							pathname === "/dashboard/profile" ? "active" : ""
						}`}
					>
						<Image
							src="/images/user-icon.svg"
							alt="logo"
							width={20}
							height={20}
						/>
						<span>Profile</span>
					</Link>
				</li>

				{/* DESKTOP VIEW */}
			</ul>

			<ul className="settings">
				<li>
					<Link
						href="/dashboard/settings"
						className={`navLink ${
							pathname === "/dashboard/settings" ? "active" : ""
						}`}
					>
						<Image
							src="/images/settings.svg"
							alt="logo"
							width={20}
							height={20}
						/>
						<span>Settings</span>
					</Link>
				</li>

				<li>
					<LogoutButton />
				</li>
			</ul>
		</nav>
	);
}
