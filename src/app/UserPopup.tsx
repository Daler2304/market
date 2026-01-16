import Link from "next/link";

const links = [
	{ name: "Войти", href: "/login" },
	{ name: "Регистрация", href: "/register" },
	{ name: "Админ панель", href: "/admin" },
];

export default function UserPopup() {
	return (
		<div className="absolute flex flex-col justify-center border w-max z-10 bg-white shadow-md rounded-md ">
			{links.map((el, index) => {
				return (
					<Link
						href={el.href}
						key={index}
						className="px-4 py-2 hover:bg-gray-100 rounded-md hover:text-blue-600 w-full">
						{el.name}
					</Link>
				);
			})}
		</div>
	);
}
