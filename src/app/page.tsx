"use client";
import Image from "next/image";
import Header from "@/components/ui/Header";
import Wallpapper from "@/components/ui/Wallpapper";
import TopNav from "@/components/ui/TopNav";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { GoHeartFill } from "react-icons/go";
import { spin } from "@/components/common/spin";

interface Product {
	id: number;
	name: string;
	price: number;
	salePersent: number;
	description: string;
	imageUrl: string;
}

const outlineHeart = <GoHeartFill className="text-white w-6 h-6" />;

const redHeart = <GoHeartFill className="text-red-500 w-6 h-6" />;

const HeartIcon = ({
	isFavorited,
	onClick,
}: {
	isFavorited: boolean;
	onClick: () => void;
}) => {
	return (
		<div className="absolute right-1 top-1 cursor-pointer" onClick={onClick}>
			{isFavorited ? redHeart : outlineHeart}
		</div>
	);
};

export default function Home() {
	const [products, setProducts] = useState<Product[]>([]);
	const [favorites, setFavorites] = useState<Set<number>>(new Set());

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

	const toggleFavorite = (id: number) => {
		setFavorites((prev) => {
			const newSet = new Set(prev);
			if (newSet.has(id)) {
				newSet.delete(id);
			} else {
				newSet.add(id);
			}
			return newSet;
		});
	};

	return (
		<div className="flex min-h-screen">
			{/* LEFT COLUMN */}
			<div className="hidden md:flex flex-col w-[10vw] min-w-37.5">
				<div className="banner loading flex-1"></div>
			</div>
			{/* CENTRAL COLUMN */}
			<div className="flex-1 flex flex-col p-4">
				<Header />
				<TopNav />
				<Wallpapper />
				<main className="w-full flex-1">
					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
						{products.length === 0 ? (
							<div className="col-span-full flex justify-center items-center h-64">{spin}</div>
						) : (
							products.map((product) => {
								const finalPrice =
									product.price && product.salePersent !== undefined
										? product.price - (product.price * product.salePersent) / 100
										: 0;
								const isFavorited = favorites.has(product.id);
								return (
									<div key={product.id} className="flex flex-col items-center rounded-md my-2">
										{/* КОНТЕЙНЕР С ФИКСИРОВАННЫМ СОотношением */}
										<div className="w-full aspect-3/4 relative mb-4">
											<Image
												src={product.imageUrl}
												alt={product.name}
												fill
												sizes="(max-width: 640px) 100vw, 96px"
												className="object-contain rounded-md"
											/>
											<HeartIcon
												isFavorited={isFavorited}
												onClick={() => toggleFavorite(product.id)}
											/>
										</div>
										<h3 className="text-sm font-semibold mb-2 text-center line-clamp-2">
											{product.name}
										</h3>
										<p className="text-lg font-bold text-green-500">
											{finalPrice.toLocaleString("ru-RU", {
												style: "currency",
												currency: "RUB",
											})}
										</p>
										{product.salePersent > 0 && (
											<p className="text-xs text-gray-400 line-through">
												{product.price?.toLocaleString("ru-RU", {
													style: "currency",
													currency: "RUB",
												})}
											</p>
										)}
									</div>
								);
							})
						)}
					</div>
				</main>
			</div>
			{/* RIGHT COLUMN */}
			<div className="hidden md:flex flex-col w-[10vw] min-w-37.5">
				<div className="banner loading flex-1"></div>
			</div>
		</div>
	);
}
