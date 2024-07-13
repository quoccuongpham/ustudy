export type PaymentForm = {
	name: string;
	card_number: string;
	expiration: string;
	cvv: string;
	email: string;
	id_course: number;
};
export default async function paymentFetch(data: PaymentForm) {
	try {
		const res = await fetch("http://localhost:3001/payment", {
			method: "POST",
			headers: {
				Accept: "*/*",
				"User-Agent": "Thunder Client (https://www.thunderclient.com)",
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("access_token")}`,
			},
			credentials: "include",
			body: JSON.stringify(data),
		});
		if (!res.ok) {
			return new Error();
		}
		return res.json();
	} catch (error) {
		console.log(error);
	}
}
