import Image from "next/image";
import React from "react";

export default function Header() {
	return (
		<header className="header">
			<section className="searchContainer">
				<section className="formControl">
					<label htmlFor="search"></label>
					<input
						type="search"
						id="search"
						name="search"
						placeholder="Search"
						className="search"
          />
          <Image src="/images/search.svg" alt="search icon" width={25} height={25} className="searchIcon"/>
				</section>
				<button className="filterBtn">
					<Image
						src="/images/filter.svg"
						alt="filter icon"
						width={20}
						height={20}
					/>
				</button>
			</section>
			<section>
				<ul className="notify">
					<li>
						<button className="btn">
							<Image
								src="/images/msg.svg"
								alt="message icon"
								width={20}
								height={20}
							/>
						</button>
					</li>
					<li>
						<button className="btn">
							<Image
								src="/images/bell.svg"
								alt="notification icon"
								width={20}
								height={20}
							/>
						</button>
					</li>
					<li>
						<button className="avatar">
							<Image
								src="/images/avatar.svg"
								alt="avatar"
								width={70}
								height={70}
							/>
						</button>
					</li>
				</ul>
			</section>
		</header>
	);
}
