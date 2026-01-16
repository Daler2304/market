import Image from "next/image";

export default function Wallpapper() {
	return (
		<div>
			<div>
				<Image
					src="https://cdn1.ozonusercontent.com/s3/sellerassets/ww2150_q80/fb8bbed3-8288-11f0-a805-fedc7a7f3509.jpeg"
					alt="Wallpaper"
					width={1920}
					height={600}
					className="w-full h-auto object-cover rounded-md mb-4 py-4"
					loading="eager"
				/>
			</div>
		</div>
	);
}
