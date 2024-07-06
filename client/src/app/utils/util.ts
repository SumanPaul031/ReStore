export function getCookie(key: string) {
	// const b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s([^;]+)");
	// return b ? b.pop() : "";
	return document.cookie
		.split("; ")
		.find((row) => row.startsWith(key + "="))
		?.split("=")[1];
}

export function currencyFormat(amount: number) {
	return `$${(amount / 100).toFixed(2)}`;
}
