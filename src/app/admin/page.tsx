"use client";

import Image from "next/image";
import { use, useEffect, useState } from "react";

interface Product {
	id: number;
	name: string;
	price: number;
	salePersent: number;
	description: string;
	imageUrl: string;
}

export default function Admin() {
	const [products, setProducts] = useState<Product[]>([
		{
			id: 1,
			name: "Беспроводные наушники Pro A3 / Гарнитура Pro / Наушники беспроводные / Bluetooth наушники / TWS Headphones / Блютуз наушники",
			price: 8000,
			salePersent: 95,
			description:
				"Лучшее качество звука Наушники беспроводные PRO A3 обеспечивают безупречную чистоту звучания благодаря высококачественным динамикам и инновационной технологии обработки звука. Они воспроизводят звуки с высокой четкостью, позволяя услышать каждую ноту звука. Это делает их отличным выбором для любителей музыки, которые ценят качество звучания. Независимо от жанра музыки, эти наушники позволят насладиться ей на новом уровне.",
			imageUrl: "https://ir.ozone.ru/s3/multimedia-1-a/wc600/8327508274.jpg",
		},
		{
			id: 2,
			name: "Беспроводные наушники Pro A3 / Гарнитура Pro / Наушники беспроводные / Bluetooth наушники / TWS Headphones / Блютуз наушники",
			price: 8000,
			salePersent: 95,
			description:
				"Лучшее качество звука Наушники беспроводные PRO A3 обеспечивают безупречную чистоту звучания благодаря высококачественным динамикам и инновационной технологии обработки звука. Они воспроизводят звуки с высокой четкостью, позволяя услышать каждую ноту звука. Это делает их отличным выбором для любителей музыки, которые ценят качество звучания. Независимо от жанра музыки, эти наушники позволят насладиться ей на новом уровне.",
			imageUrl: "https://ir.ozone.ru/s3/multimedia-1-2/wc600/7269956534.jpg",
		},
		{
			id: 3,
			name: "Беспроводные наушники Pro A3 / Гарнитура Pro / Наушники беспроводные / Bluetooth наушники / TWS Headphones / Блютуз наушники",
			price: 8000,
			salePersent: 99,
			description:
				"Лучшее качество звука Наушники беспроводные PRO A3 обеспечивают безупречную чистоту звучания благодаря высококачественным динамикам и инновационной технологии обработки звука. Они воспроизводят звуки с высокой четкостью, позволяя услышать каждую ноту звука. Это делает их отличным выбором для любителей музыки, которые ценят качество звучания. Независимо от жанра музыки, эти наушники позволят насладиться ей на новом уровне.",
			imageUrl: "https://ir.ozone.ru/s3/multimedia-1-2/wc600/7269956534.jpg",
		},
		{
			id: 4,
			name: "Беспроводные наушники Pro A3 / Гарнитура Pro / Наушники беспроводные / Bluetooth наушники / TWS Headphones / Блютуз наушники",
			price: 8000,
			salePersent: 95,
			description:
				"Лучшее качество звука Наушники беспроводные PRO A3 обеспечивают безупречную чистоту звучания благодаря высококачественным динамикам и инновационной технологии обработки звука. Они воспроизводят звуки с высокой четкостью, позволяя услышать каждую ноту звука. Это делает их отличным выбором для любителей музыки, которые ценят качество звучания. Независимо от жанра музыки, эти наушники позволят насладиться ей на новом уровне.",
			imageUrl: "https://ir.ozone.ru/s3/multimedia-1-2/wc600/7269956534.jpg",
		},
		{
			id: 5,
			name: "Беспроводные наушники Pro A3 / Гарнитура Pro / Наушники беспроводные / Bluetooth наушники / TWS Headphones / Блютуз наушники",
			price: 8000,
			salePersent: 95,
			description:
				"Лучшее качество звука Наушники беспроводные PRO A3 обеспечивают безупречную чистоту звучания благодаря высококачественным динамикам и инновационной технологии обработки звука. Они воспроизводят звуки с высокой четкостью, позволяя услышать каждую ноту звука. Это делает их отличным выбором для любителей музыки, которые ценят качество звучания. Независимо от жанра музыки, эти наушники позволят насладиться ей на новом уровне.",
			imageUrl: "https://ir.ozone.ru/s3/multimedia-1-2/wc600/7269956534.jpg",
		},
	]);

	const handleDeleteProduct = (productId: number) => {
		setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
	};

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

		const product: Product = {
			id: Date.now(),
			...newProduct,
		};

		setProducts((prev) => [product, ...prev]);

		setNewProduct({
			name: "",
			price: 0,
			salePersent: 0,
			description: "",
			imageUrl: "",
		});
	};

	// if user enters to salePersent more than 100, set it to 100
	useEffect(() => {
		if (newProduct.salePersent > 99) {
			setNewProduct((prev) => ({
				...prev,
				salePersent: 99,
			}));
		} else if (newProduct.salePersent < 0) {
			setNewProduct((prev) => ({
				...prev,
				salePersent: 0,
			}));
		}
	}, [newProduct.salePersent]);

	useEffect(() => {
		if (newProduct.price < 0) {
			setNewProduct((prev) => ({
				...prev,
				price: 0,
			}));
		}
	}, [newProduct.price]);

	const [isBigImageOpen, setIsBigImageOpen] = useState(false);

	return (
		<div className="flex flex-col p-4 items-center w-full min-h-dvh">
			<h1 className="text-2xl font-bold">Admin Page</h1>

			<div className="flex flex-row p-2 w-full justify-center gap-4 ">
				{/* LEFT COLUMN */}
				<div className="flex flex-col w-[40%] border rounded-md border-blue-500 p-2 gap-2">
					<h2 className="font-semibold">Добавить товар</h2>

					<form onSubmit={handleAddProduct} className="flex flex-col gap-2" autoComplete="off">
						<label>Название товара</label>
						<input
							type="text"
							name="name"
							placeholder="Название товара"
							value={newProduct.name}
							onChange={handleChange}
							className="border p-1 rounded-md"
						/>

						<label>Цена</label>
						<input
							type="number"
							name="price"
							placeholder="Цена"
							value={newProduct.price}
							onChange={handleChange}
							className="border p-1 rounded-md"
						/>

						<label>Скидка %</label>
						<input
							type="number"
							name="salePersent"
							placeholder="Скидка %"
							max={100}
							value={newProduct.salePersent}
							onChange={handleChange}
							className="border p-1 rounded-md"
						/>

						<label>URL изображения</label>
						<input
							type="text"
							name="imageUrl"
							placeholder="URL изображения"
							value={newProduct.imageUrl}
							onChange={handleChange}
							className="border p-1 rounded-md"
						/>

						<label>Описание</label>
						<textarea
							name="description"
							placeholder="Описание"
							value={newProduct.description}
							onChange={handleChange}
							className="border p-1 rounded-md resize-none"
							rows={4}
						/>

						<button
							type="submit"
							className="bg-blue-500 text-white rounded-md p-1 hover:bg-blue-600">
							Добавить товар
						</button>
					</form>
				</div>

				{/* Right column */}
				<div className="flex flex-col gap-2 min-w-[40%] border rounded-md border-blue-500 p-2  max-h-[80vh] overflow-y-auto select-none">
					<div>Всего товаров: {products.length}</div>
					{products.length > 0 ? (
						products.map((product) => (
							<div key={product.id} className="border border-gray-300 rounded-md p-2">
								<div className="flex flex-row gap-1 h-full w-full justify-between">
									<div className="flex flex-row w-full">
										{/* Image container */}
										<div className="relative w-24 aspect-3/4 overflow-hidden flex items-center justify-center">
											<Image
												src={product.imageUrl}
												alt={product.name}
												fill
												sizes="w-24 h-auto"
												className="object-contain cursor-pointer"
												loading="eager"
												onClick={() => setIsBigImageOpen(true)}
											/>
										</div>

										{isBigImageOpen && (
											<div
												className="fixed top-0 left-0 w-full min-h-dvh p-2 z-10 bg-black/60"
												onClick={() => setIsBigImageOpen(false)}>
												<Image
													src={products.find((p) => p.id === product.id)!.imageUrl}
													alt={product.name}
													fill
													sizes="w-30 h-auto"
													className="object-contain cover p-10"
												/>
											</div>
										)}

										{/* Product info container */}
										<div className="flex flex-col w-full p-1">
											<div className="w-75">
												<b className="text-[16px] line-clamp-1">{product.name}</b>
											</div>
											<div className="w-50">
												<i className="text-[12px] line-clamp-1">{product.description}</i>
											</div>
											<div>
												<p className="text-xs">ID: {product.id}</p>
											</div>
											<div className="flex">
												<p>
													<span className="text-green-600 font-bold">
														{/* Round sum to int */}
														{Math.round(
															product.price - (product.price * product.salePersent) / 100
														)}{" "}
														₽
													</span>{" "}
													{Math.round(
														product.price - (product.price * product.salePersent) / 100
													) !== product.price && (
														<span className="text-gray-400 line-through">
															{product.price} ₽
														</span>
													)}
												</p>
											</div>
										</div>
									</div>

									{/* Delete button */}
									<div className="h-full flex items-center">
										<div
											className="flex w-max h-max p-1 cursor-pointer border border-gray-300 rounded-md"
											onClick={() => {
												handleDeleteProduct(product.id);
											}}>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="h-6 w-6 text-red-500 hover:text-red-700"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor">
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
												/>
											</svg>
										</div>
									</div>
								</div>
							</div>
						))
					) : (
						<p>Пока нет товаров</p>
					)}
				</div>
			</div>
		</div>
	);
}
