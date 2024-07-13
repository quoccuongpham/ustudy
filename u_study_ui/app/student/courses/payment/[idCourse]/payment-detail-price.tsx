export default function PaymentDetailPrice({
	title,
	price,
}: {
	title: String;
	price: String;
}) {
	return (
		<div className="grid grid-cols-2 p-2">
			<div className="text-left">
				<p>{title}</p>
			</div>
			<div className="text-right">
				<p>{price}</p>
			</div>
		</div>
	);
}
