"use client";

import Image from "next/image";
import Header from "@/components/ui/Header";
import Wallpapper from "@/components/ui/Wallpapper";
import TopNav from "@/components/ui/TopNav";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";

interface Product {
	id: number;
	name: string;
	price: number;
	salePersent: number;
	description: string;
	imageUrl: string;
}

const spin = (
	<span
		className={`inline-block w-14 h-14 rounded-full border-t-4 
                border-t-blue-600 border-r-3 border-r-transparent 
                box-border animate-spin`}></span>
);

export default function Home() {
	const [products, setProducts] = useState<Product[]>([]);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await api.get<Product[]>("/products");
				setProducts(response.data);
			} catch (error) {
				console.error("Ошибка загрузки товаров:", error);
			}
		};

		fetchProducts();
	}, []);

	return (
		<div className="flex min-h-dvh xl:justify-center">
			{/* LEFT COLUMN */}
			<div className="banner loading flex min-w-25 w-[20vw]"></div>

			{/* CENTRAL COLUMN */}
			<div className="p-4 min-h-dvh">
				<Header />
				<TopNav />
				<Wallpapper />
				<main>
					{/* make product card how in ozon.ru 5 cards in a row others with wrap */}
					<div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
						{products.length === 0 ? (
							<div className="col-span-full flex justify-center items-center h-64">{spin}</div>
						) : (
							products.map((product) => (
								<div
									key={product.id}
									className="border border-gray-300 rounded-lg p-4 
									flex flex-col items-center hover:shadow-lg transition-shadow">
									<div className="w-full h-32 relative mb-4">
										<Image
											src={product.imageUrl}
											alt={product.name}
											fill
											sizes="(max-width: 640px) 100vw, 96px"
											className="object-contain"
										/>
									</div>
									<h3 className="text-sm font-semibold mb-2 text-center">{product.name}</h3>
									<p className="text-lg font-bold text-blue-600">
										{product.price.toLocaleString("ru-RU", {
											style: "currency",
											currency: "RUB",
										})}
									</p>
								</div>
							))
						)}
					</div>
				</main>
			</div>

			{/* RIGHT COLUMN */}
			<div className="banner loading flex min-w-25 w-[20vw]"></div>
		</div>
	);
}
