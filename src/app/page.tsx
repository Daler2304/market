"use client";

import Header from "@/components/ui/Header";

const spin = (
	<span
		className={`inline-block w-14 h-14 rounded-full border-t-4 
                border-t-blue-600 border-r-3 border-r-transparent 
                box-border animate-spin`}></span>
);

export default function Home() {
	return (
		<div className="flex min-h-dvh xl:justify-center">
			{/* LEFT COLUMN */}
			<div className="banner loading flex min-w-25 w-[20vw]"></div>

			{/* CENTRAL COLUMN */}
			<div className="p-4 min-h-dvh">
				<Header />
				<main className="w-full h-[80%] flex items-center justify-center p-4"></main>
			</div>

			{/* RIGHT COLUMN */}
			<div className="banner loading flex min-w-25 w-[20vw]"></div>
		</div>
	);
}
