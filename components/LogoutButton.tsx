"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

function LogoutButton() {
  const { data: session, status } = useSession();
	return (
		<button
			onClick={() => signOut()}
			type="button"
			className=" navLink navLinkLogout"
		>
			<Image src="/images/logout.svg" alt="logo" width={20} height={20} />
			<span>Log out</span>
		</button>
	);
}

export default LogoutButton;
