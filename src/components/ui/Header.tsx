import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import UserPopup from "../../app/UserPopup";

import { HiSquares2X2 } from "react-icons/hi2";
import { CiSearch } from "react-icons/ci";
import { FaUser } from "react-icons/fa6";
import { BsBoxSeamFill } from "react-icons/bs";
import { MdOutlineFavorite } from "react-icons/md";
import { FaShoppingBasket } from "react-icons/fa";

const userActions = [
	{ name: "Заказы", icon: BsBoxSeamFill, url: "/orders" },
	{ name: "Избранное", icon: MdOutlineFavorite, url: "/favorites" },
	{ name: "Корзина", icon: FaShoppingBasket, url: "/cart" },
];

export default function Header() {
	const [isUserOpen, setIsUserOpen] = useState(false);

	const handleSearch = (query: string, category: string) => {
		console.log("Search:", { query, category });
		setSearch("");
	};

	const [search, setSearch] = useState("");

	return (
		<header className="grid grid-cols-[1fr_1fr_6fr_2.5fr] gap-4 max-h-max p-0.5">
			{/* LOGO */}
			<div className="flex items-center w-max">
				<div className="relative w-32.5 h-full">
					<Image src="/next.svg" alt="Market" loading="eager" fill unoptimized />
				</div>
			</div>

			{/* CATALOG */}
			<Link
				href="/catalog"
				className="flex items-center justify-center max-w-40 bg-blue-600 text-white font-semibold px-4 rounded-[10px] cursor-pointer">
				<HiSquares2X2 className="w-5 h-5 mr-1 text-white/90" />
				<span className="tracking-wide">Каталог</span>
			</Link>

			{/* SEARCH */}
			<div className="grid grid-cols-[minmax(300px,85%)_minmax(50px,15%)] h-full w-full bg-blue-600 rounded-[10px]">
				<input
					value={search}
					type="text"
					placeholder="Найдите на Market"
					id="search"
					className="flex items-center border-2 rounded-[10px] outline-none border-blue-600 text-black bg-white ps-2"
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						setSearch(e.target.value);
					}}
					onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
						if (e.key === "Enter" && search !== "") {
							e.preventDefault();
							handleSearch(search, "all");
						}
					}}
				/>
				<button
					className="flex items-center justify-center rounded-[10px] cursor-pointer"
					onClick={() => {
						if (search !== "") {
							handleSearch(search, "all");
						}
					}}>
					<CiSearch className="text-white stroke-2 w-full h-5" />
				</button>
			</div>

			{/* USER ACTIONS */}
			<div className="flex items-center gap-2">
				<div
					className="relative"
					onMouseEnter={() => setIsUserOpen(true)}
					onMouseLeave={() => setIsUserOpen(false)}>
					{/* USER ICON */}
					<div className="flex flex-col items-center justify-center w-11 h-11 p-1 text-black hover:text-blue-600 transition-colors cursor-pointer">
						<FaUser />
						<span className="hidden [@media(min-width:1300px)]:block text-[10px] leading-none mt-1">
							Вход
						</span>
					</div>

					{/* POPUP */}
					{isUserOpen && <UserPopup />}
				</div>

				{userActions.map((el, index) => (
					<Link
						href={el.url}
						key={index}
						className="flex flex-col items-center justify-center w-11 text-gray-400 hover:text-blue-600 transition-colors">
						<el.icon className="w-10 h-5" />

						<span className="hidden [@media(min-width:1300px)]:block text-[10px] leading-none mt-1">
							{el.name}
						</span>
					</Link>
				))}
			</div>
		</header>
	);
}
