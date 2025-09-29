// mathUtils.js
// Shared utility functions for calculations like percent change and normalization

/**
 * Calculate percent change between two numbers.
 * @param {number} current - The current value.
 * @param {number} previous - The previous value.
 * @returns {number} Percent change (can be negative or positive, 0 if previous is 0 and current is 0, 100 if previous is 0 and current > 0)
 */
export function percentChange(current, previous) {
    if (previous === 0) return current === 0 ? 0 : 100;
    return ((current - previous) / previous) * 100;
}

/**
 * Normalize an array of numbers to a 0-1 scale.
 * @param {number[]} arr - Array of numbers.
 * @returns {number[]} Normalized array (min-max normalization)
 */
export function normalizeArray(arr) {
    if (!arr.length) return [];
    const min = Math.min(...arr);
    const max = Math.max(...arr);
    if (min === max) return arr.map(() => 1);
    return arr.map(val => (val - min) / (max - min));
}

/**
 * Normalize a value within a range to 0-1.
 * @param {number} value - Value to normalize.
 * @param {number} min - Minimum of range.
 * @param {number} max - Maximum of range.
 * @returns {number} Normalized value (0-1)
 */
export function normalizeValue(value, min, max) {
    if (min === max) return 1;
    return (value - min) / (max - min);
}
