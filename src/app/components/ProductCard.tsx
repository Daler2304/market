"use client";

type ProductCardProps = {
	name: string;
	photo_url: string;
	price: number;
	rating: number;
	reviews: number;
};

export default function ProductCard({
	name,
	photo_url,
	price,
	rating,
	reviews,
}: ProductCardProps) {
	return (
		<div className="border rounded-lg shadow-sm overflow-hidden w-60 bg-white hover:shadow-lg transition">
			<img src={photo_url} alt={name} className="w-full h-40 object-cover" />

			<div className="p-3 flex flex-col gap-1">
				<h3 className="font-semibold text-sm line-clamp-2">{name}</h3>
				<p className="text-blue-600 font-bold">${price.toFixed(2)}</p>

				<div className="flex items-center text-yellow-500 text-xs">
					<span>⭐ {rating.toFixed(1)}</span>
					<span className="text-gray-500 ml-2">({reviews} отзывов)</span>
				</div>

				<button className="mt-2 bg-blue-600 text-white text-sm py-1 rounded hover:bg-blue-700 transition">
					В корзину
				</button>
			</div>
		</div>
	);
}
