"use client";

import { api } from "@/lib/api";
import { useEffect, useState } from "react";
import { spin } from "@/components/common/spin";

interface Product {
	id: number;
	name: string;
	price: number;
	salePersent: number;
	description: string;
	imageUrl: string;
	category: string;
}

export default function Catalog() {
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(true);

	// Fetch products from a mock API with axios
	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await api.get<Product[]>("/products");
				setProducts(response.data);
			} catch (error) {
				console.error("Ошибка загрузки товаров:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchProducts();
	}, []);

	if (loading) {
		return (
			<div className="min-h-dvh flex items-center justify-center">
				<p>{spin}</p>
			</div>
		);
	}

	return (
		<div className="min-h-dvh p-4">
			<h1 className="text-2xl font-semibold mb-6">Каталог товаров</h1>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{products.map((product) => {
					const salePrice = product.price - (product.price * product.salePersent) / 100;

					return (
						<div key={product.id} className="bg-white rounded-xl shadow-md p-4">
							<img
								src={product.imageUrl}
								alt={product.name}
								className="w-full h-48 object-cover rounded-lg mb-4"
							/>

							<h2 className="text-lg font-semibold mb-2">{product.name}</h2>
							<p className="text-gray-600 mb-3">{product.description}</p>

							<div className="flex justify-between items-center">
								<div>
									{product.salePersent > 0 ? (
										<>
											<span className="text-sm text-gray-400 line-through mr-2">
												${product.price}
											</span>
											<span className="text-xl font-bold text-red-500">
												${salePrice.toFixed(2)}
											</span>
										</>
									) : (
										<span className="text-xl font-bold">${product.price}</span>
									)}
								</div>

								{product.salePersent > 0 && (
									<span className="text-sm bg-red-100 text-red-600 px-2 py-1 rounded-md">
										-{product.salePersent}%
									</span>
								)}
							</div>
						</div>
					);
				})}
			</div>

			{products.length === 0 && (
				<p className="text-center text-gray-500 mt-8">Нет товаров в каталоге</p>
			)}
		</div>
	);
}
