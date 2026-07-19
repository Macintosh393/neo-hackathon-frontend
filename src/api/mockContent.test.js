import { describe, expect, it } from 'vitest';
import { pickLocalized } from './mockContent.js';

describe('pickLocalized', () => {
	it('returns localized value when available', () => {
		const entry = { uk: 'Привіт', en: 'Hello' };
		expect(pickLocalized(entry, 'en')).toBe('Hello');
		expect(pickLocalized(entry, 'uk')).toBe('Привіт');
	});

	it('returns string input unchanged', () => {
		expect(pickLocalized('plain', 'en')).toBe('plain');
	});

	it('falls back to uk or en if requested missing', () => {
		const entry = { uk: 'УКР' };
		expect(pickLocalized(entry, 'en')).toBe('УКР');
	});
});
