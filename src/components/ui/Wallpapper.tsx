"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const wallpaper = [
	"https://cdn1.ozonusercontent.com/s3/sellerassets/ww2150_q80/1f1f6caf-cd2f-11f0-9856-eae0ddbda5aa.jpeg",
	"https://cdn1.ozonusercontent.com/s3/sellerassets/ww2150_q80/fb8bbed3-8288-11f0-a805-fedc7a7f3509.jpeg",
	"https://cdn1.ozonusercontent.com/s3/sellerassets/ww2150_q80/76dc7a0a-9ab5-11f0-8233-4e4325d95be8.jpeg",
	"https://cdn1.ozonusercontent.com/s3/sellerassets/ww2150_q80/f468b070-f0c6-11f0-9392-faf2c018b6cf.jpeg",
];

export default function Wallpaper() {
	const [currentImage, setCurrentImage] = useState<number>(0);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	const startInterval = () => {
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
		}
		intervalRef.current = setInterval(() => {
			handleNext();
		}, 7000);
	};

	const handlePrev = () => {
		setCurrentImage((prev) => (prev > 0 ? prev - 1 : wallpaper.length - 1));
		startInterval();
	};

	const handleNext = () => {
		setCurrentImage((prev) => (prev < wallpaper.length - 1 ? prev + 1 : 0));
		startInterval();
	};

	useEffect(() => {
		startInterval();
		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		};
	}, []);

	return (
		<div className="mb-4 py-4 relative">
			<div className="overflow-hidden">
				<div
					className="flex transition-transform duration-300 ease-in-out"
					style={{ transform: `translateX(-${currentImage * 100}%)` }}>
					{wallpaper.map((url, key) => (
						<div key={key} className="shrink-0 w-full">
							<Image
								src={url}
								alt="Wallpaper"
								width={1920}
								height={600}
								className="w-full h-auto object-cover rounded-[10px]"
								loading="eager"
							/>
						</div>
					))}
				</div>
			</div>
			<button
				className="cursor-pointer absolute top-1/2 left-2 -translate-y-1/2 p-1.5 bg-white/60 hover:bg-white/50 rounded-lg"
				onClick={handlePrev}>
				<FiChevronLeft className="text-xl" />
			</button>
			<button
				className="cursor-pointer absolute top-1/2 right-2 -translate-y-1/2 p-1.5 bg-white/60 hover:bg-white/50 rounded-lg"
				onClick={handleNext}>
				<FiChevronRight className="text-xl" />
			</button>
		</div>
	);
}
