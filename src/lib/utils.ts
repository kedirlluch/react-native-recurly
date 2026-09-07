import { type ClassValue, clsx } from "clsx";

/**
 * Combines class names using clsx.
 */
export function cn(...inputs: ClassValue[]) {
    return clsx(inputs);
}

/**
 * Formats a numeric value as standard euro money (€) with exactly two decimal places, defaulting to EUR.
 *
 * @param value - The amount to format (number or string representation).
 * @param currency - The ISO currency code (defaults to "EUR").
 * @returns Formatted currency string (e.g., "€5.99", "€2,489.48").
 */
export function formatCurrency(
    value: number | string | null | undefined,
    currency: string = "EUR"
): string {
    const num = typeof value === "number" ? value : parseFloat(String(value));
    const validNum = isNaN(num) ? 0 : num;
    const normalizedCurrency = (currency || "EUR").toUpperCase();

    try {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: normalizedCurrency,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(validNum);
    } catch (error) {
        const symbolMap: Record<string, string> = {
            EUR: "€",
            USD: "$",
            GBP: "£",
            JPY: "¥",
        };
        const symbol = symbolMap[normalizedCurrency] || `${normalizedCurrency} `;
        return `${symbol}${validNum.toFixed(2)}`;
    }
}

export default formatCurrency;
