"use client";

import { api } from "@/lib/api";

import Image from "next/image";
import { useEffect, useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";

interface Product {
	id: number;
	name: string;
	price: number;
	salePersent: number;
	description: string;
	imageUrl: string;
}

export default function Admin() {
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

	const [products, setProducts] = useState<Product[]>([]);

	const [isActiveImage, setIsActiveImage] = useState<number | null>(null);

	const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
		name: "",
		price: 0,
		salePersent: 0,
		description: "",
		imageUrl: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setNewProduct((prev) => ({
			...prev,
			[name]: name === "price" || name === "salePersent" ? Number(value) : value,
		}));
	};

	const handleAddProduct = (e: React.FormEvent) => {
		e.preventDefault();
		if (!newProduct.name || !newProduct.imageUrl) return;

		setProducts((prev) => [{ id: Date.now(), ...newProduct }, ...prev]);
		setNewProduct({ name: "", price: 0, salePersent: 0, description: "", imageUrl: "" });
	};

	const handleDeleteProduct = (id: number) => {
		setProducts((prev) => prev.filter((p) => p.id !== id));
	};

	useEffect(() => {
		if (newProduct.salePersent > 99) {
			setNewProduct((p) => ({ ...p, salePersent: 99 }));
		}
		if (newProduct.salePersent < 0) {
			setNewProduct((p) => ({ ...p, salePersent: 0 }));
		}
	}, [newProduct.salePersent]);

	useEffect(() => {
		if (newProduct.price < 0) {
			setNewProduct((p) => ({ ...p, price: 0 }));
		}
	}, [newProduct.price]);

	useEffect(() => {
		if (isActiveImage === null) return;

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				setIsActiveImage(null);
			}
		};

		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [isActiveImage]);

	return (
		<div className="flex flex-col items-center w-full min-h-dvh p-4">
			<h1 className="text-2xl font-bold mb-4">Admin Page</h1>

			<div className="flex flex-col xl:flex-row w-full gap-4">
				{/* ADD PRODUCT */}
				<div className="w-full xl:w-1/2 border border-blue-500 rounded-md p-3">
					<h2 className="font-semibold mb-2">Добавить товар</h2>

					<form onSubmit={handleAddProduct} className="flex flex-col gap-2">
						<input
							name="name"
							placeholder="Название"
							value={newProduct.name}
							onChange={handleChange}
							className="border rounded-md p-2 text-sm"
						/>

						<input
							type="number"
							name="price"
							placeholder="Цена"
							value={newProduct.price}
							onChange={handleChange}
							className="border rounded-md p-2 text-sm"
						/>
						<input
							type="number"
							name="salePersent"
							placeholder="Скидка %"
							value={newProduct.salePersent}
							onChange={handleChange}
							className="border rounded-md p-2 text-sm"
						/>
						<input
							name="imageUrl"
							placeholder="URL изображения"
							value={newProduct.imageUrl}
							onChange={handleChange}
							className="border rounded-md p-2 text-sm"
						/>
						<textarea
							name="description"
							placeholder="Описание"
							value={newProduct.description}
							onChange={handleChange}
							rows={3}
							className="border rounded-md p-2 text-sm resize-none"
						/>
						<button className="bg-blue-500 hover:bg-blue-600 text-white rounded-md p-2">
							Добавить
						</button>
					</form>
				</div>

				{/* PRODUCTS */}
				<div className="w-full xl:w-1/2 border border-blue-500 rounded-md p-3 max-h-[70vh] overflow-y-auto">
					<div className="mb-2">Всего товаров: {products.length}</div>

					{products.map((product) => (
						<div key={product.id} className="border rounded-md p-2 mb-2">
							<div className="flex flex-col sm:flex-row gap-2">
								{/* IMAGE */}
								<div className="relative w-full sm:w-24 aspect-3/4">
									<Image
										src={product.imageUrl}
										alt={product.name}
										fill
										sizes="(max-width: 640px) 100vw, 96px"
										className="object-contain cursor-pointer"
										onClick={() => setIsActiveImage(product.id)}
									/>
								</div>

								{/* INFO */}
								<div className="flex flex-col flex-1 gap-1">
									<b className="text-sm sm:text-base line-clamp-2">{product.name}</b>
									<i className="text-xs sm:text-sm line-clamp-2">{product.description}</i>
									<p className="text-xs">ID: {product.id}</p>

									<div className="text-sm">
										<span className="text-green-600 font-bold">
											{Math.round(product.price - (product.price * product.salePersent) / 100)}{" "}
											₽
										</span>{" "}
										{product.salePersent > 0 && (
											<span className="line-through text-gray-400 text-xs">
												{product.price} ₽
											</span>
										)}
									</div>
								</div>

								{/* DELETE */}
								<button
									onClick={() => handleDeleteProduct(product.id)}
									className="border rounded-md p-2 h-max self-start text-red-500 hover:bg-red-50">
									Удалить
								</button>
							</div>

							{/* FULLSCREEN IMAGE */}
							{isActiveImage === product.id && (
								<div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
									<div className="relative w-full h-full p-2 sm:p-10">
										<Image
											src={product.imageUrl}
											alt={product.name}
											fill
											sizes="100vw"
											quality={100}
											priority
											className="object-contain"
										/>
									</div>

									<button
										onClick={() => setIsActiveImage(null)}
										className="fixed top-5 right-5 z-50">
										<IoIosCloseCircle size={40} color="white" />
									</button>
								</div>
							)}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
