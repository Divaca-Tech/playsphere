import Header from "@/components/Header";
import Navbar from "@/components/Navbar";

export default function DashboardLayout({
	children, // will be a page or nested layout
}: {
	children: React.ReactNode;
}) {
	return (
		// layout
		<section className="grid grid-cols-[200px_1fr]">
			<Navbar />

			{/* main */}
			<main className="[@media(min-width:780px)]:col-[2] [@media(min-width:780px)]:grid [@media(min-width:780px)]:grid-rows-[6em_auto] [@media(min-width:780px)]:grid-cols-[2fr_1fr] [@media(min-width:780px)]:gap-[1em]">
				<Header />
				{/* page */}
				<section className="col-[1/-1] row-[2] bg-[red]">{children}</section>
			</main>
		</section>
	);
}
