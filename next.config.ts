import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	reactCompiler: true,

	// add avatars.mds.yandex.net to allowed image domains
	images: {
		remotePatterns: [
			{
				hostname: "*",
			},
		],
	},
};

export default nextConfig;
