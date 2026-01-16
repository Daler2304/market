export default function TopNav() {
	return (
		<div className="flex text-[12px] mt-4 gap-6">
			{/* make all text TopNav p without className */}
			<p className="cursor-pointer">Главная</p>
			<p className="cursor-pointer">Акции</p>
			<p className="cursor-pointer">Новинки</p>
			<p className="cursor-pointer">Бренды</p>
			<p className="cursor-pointer">Подарки</p>
			<p className="cursor-pointer">Контакты</p>
		</div>
	);
}
