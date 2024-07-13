export default function useScrollToTop() {
	const scrollToTop = () => {
		if (typeof window !== "undefined") {
			window.scrollTo(0, 0);
		}
	};
	return [scrollToTop];
}
