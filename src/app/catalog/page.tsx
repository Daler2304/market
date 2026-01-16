"use client";

import { useEffect, useState } from "react";

interface Product {
	id: number;
	name: string;
	photo_url: string;
	price: number;
	rating: number;
	reviews: number;
	description: string;
	created_at: string;
}

export default function Catalog() {
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch("/api/products")
			.then((res) => {
				if (!res.ok) {
					throw new Error(`HTTP error! status: ${res.status}`);
				}
				return res.json();
			})
			.then((data) => {
				if (data.success) {
					setProducts(data.products);
				} else {
					console.error("API error:", data.error);
				}
			})
			.catch((err) => {
				console.error("Fetch error:", err);
			})
			.finally(() => setLoading(false));
	}, []);

	if (loading) {
		return (
			<div className="min-h-dvh flex items-center justify-center p-4">
				<p>Загрузка...</p>
			</div>
		);
	}

	return (
		<div className="min-h-dvh p-4">
			<h1 className="text-2xl font-semibold mb-6">Каталог товаров</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{products.map((product) => (
					<div key={product.id} className="bg-white rounded-xl shadow-md p-4">
						<img
							src={product.photo_url}
							alt={product.name}
							className="w-full h-48 object-cover rounded-lg mb-4"
						/>
						<h2 className="text-lg font-semibold mb-2">{product.name}</h2>
						<p className="text-gray-600 mb-2">{product.description}</p>
						<div className="flex justify-between items-center">
							<span className="text-xl font-bold">${product.price}</span>
							<div className="text-sm text-gray-500">
								⭐ {product.rating} ({product.reviews} отзывов)
							</div>
						</div>
					</div>
				))}
			</div>
			{products.length === 0 && (
				<p className="text-center text-gray-500">Нет товаров в каталоге</p>
			)}
		</div>
	);
}
