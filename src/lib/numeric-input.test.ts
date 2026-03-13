import { describe, expect, it } from 'vitest'

import {
  createNumericPattern,
  formatNumericValue,
  isValidNumericInput,
  parseNumericValue,
  sanitizeNumericInput,
} from './numeric-input'

describe('createNumericPattern', () => {
  describe('integer mode', () => {
    const pattern = createNumericPattern('integer', 2)

    it('matches empty string', () => {
      expect(pattern.test('')).toBe(true)
    })

    it('matches positive integers', () => {
      expect(pattern.test('123')).toBe(true)
      expect(pattern.test('0')).toBe(true)
      expect(pattern.test('999999')).toBe(true)
    })

    it('matches negative integers', () => {
      expect(pattern.test('-123')).toBe(true)
      expect(pattern.test('-0')).toBe(true)
    })

    it('matches partial minus (for typing)', () => {
      expect(pattern.test('-')).toBe(true)
    })

    it('rejects decimals', () => {
      expect(pattern.test('1.5')).toBe(false)
      expect(pattern.test('0.0')).toBe(false)
    })

    it('rejects letters', () => {
      expect(pattern.test('abc')).toBe(false)
      expect(pattern.test('12a')).toBe(false)
      expect(pattern.test('a12')).toBe(false)
    })

    it('rejects special characters', () => {
      expect(pattern.test('1,000')).toBe(false)
      expect(pattern.test('$100')).toBe(false)
      expect(pattern.test('100%')).toBe(false)
    })
  })

  describe('decimal mode', () => {
    it('matches empty string', () => {
      const pattern = createNumericPattern('decimal', 2)
      expect(pattern.test('')).toBe(true)
    })

    it('matches integers', () => {
      const pattern = createNumericPattern('decimal', 2)
      expect(pattern.test('123')).toBe(true)
      expect(pattern.test('0')).toBe(true)
    })

    it('matches decimals within limit', () => {
      const pattern = createNumericPattern('decimal', 2)
      expect(pattern.test('1.5')).toBe(true)
      expect(pattern.test('1.50')).toBe(true)
      expect(pattern.test('0.01')).toBe(true)
      expect(pattern.test('123.99')).toBe(true)
    })

    it('matches partial decimal (for typing)', () => {
      const pattern = createNumericPattern('decimal', 2)
      expect(pattern.test('1.')).toBe(true)
      expect(pattern.test('.')).toBe(true)
      expect(pattern.test('.5')).toBe(true)
    })

    it('rejects decimals exceeding limit', () => {
      const pattern = createNumericPattern('decimal', 2)
      expect(pattern.test('1.123')).toBe(false)
      expect(pattern.test('0.001')).toBe(false)
    })

    it('respects custom decimal places', () => {
      const pattern4 = createNumericPattern('decimal', 4)
      expect(pattern4.test('1.1234')).toBe(true)
      expect(pattern4.test('1.12345')).toBe(false)

      const pattern8 = createNumericPattern('decimal', 8)
      expect(pattern8.test('0.00000001')).toBe(true)
      expect(pattern8.test('0.000000001')).toBe(false)
    })

    it('matches negative decimals', () => {
      const pattern = createNumericPattern('decimal', 2)
      expect(pattern.test('-1.5')).toBe(true)
      expect(pattern.test('-0.01')).toBe(true)
    })

    it('rejects multiple decimal points', () => {
      const pattern = createNumericPattern('decimal', 2)
      expect(pattern.test('1.2.3')).toBe(false)
      expect(pattern.test('..')).toBe(false)
    })

    it('rejects letters', () => {
      const pattern = createNumericPattern('decimal', 2)
      expect(pattern.test('abc')).toBe(false)
      expect(pattern.test('1.2a')).toBe(false)
    })
  })
})

describe('isValidNumericInput', () => {
  it('validates integer input', () => {
    expect(isValidNumericInput('123', 'integer', 2)).toBe(true)
    expect(isValidNumericInput('1.5', 'integer', 2)).toBe(false)
    expect(isValidNumericInput('abc', 'integer', 2)).toBe(false)
  })

  it('validates decimal input', () => {
    expect(isValidNumericInput('1.23', 'decimal', 2)).toBe(true)
    expect(isValidNumericInput('1.234', 'decimal', 2)).toBe(false)
    expect(isValidNumericInput('abc', 'decimal', 2)).toBe(false)
  })
})

describe('parseNumericValue', () => {
  describe('integer mode', () => {
    it('parses valid integers', () => {
      expect(parseNumericValue('123', 'integer')).toBe(123)
      expect(parseNumericValue('-456', 'integer')).toBe(-456)
      expect(parseNumericValue('0', 'integer')).toBe(0)
    })

    it('returns null for empty string', () => {
      expect(parseNumericValue('', 'integer')).toBe(null)
      expect(parseNumericValue('   ', 'integer')).toBe(null)
    })

    it('parses decimal strings as integers (truncates)', () => {
      expect(parseNumericValue('1.9', 'integer')).toBe(1)
      expect(parseNumericValue('2.1', 'integer')).toBe(2)
    })

    it('returns null for invalid input', () => {
      expect(parseNumericValue('abc', 'integer')).toBe(null)
      expect(parseNumericValue('-', 'integer')).toBe(null)
    })
  })

  describe('decimal mode', () => {
    it('parses valid decimals', () => {
      expect(parseNumericValue('1.23', 'decimal')).toBe(1.23)
      expect(parseNumericValue('-4.56', 'decimal')).toBe(-4.56)
      expect(parseNumericValue('0.01', 'decimal')).toBe(0.01)
    })

    it('parses integers as decimals', () => {
      expect(parseNumericValue('123', 'decimal')).toBe(123)
    })

    it('returns null for empty string', () => {
      expect(parseNumericValue('', 'decimal')).toBe(null)
    })

    it('returns null for invalid input', () => {
      expect(parseNumericValue('abc', 'decimal')).toBe(null)
      expect(parseNumericValue('.', 'decimal')).toBe(null)
    })
  })
})

describe('formatNumericValue', () => {
  it('formats numbers as strings', () => {
    expect(formatNumericValue(123)).toBe('123')
    expect(formatNumericValue(1.23)).toBe('1.23')
    expect(formatNumericValue(-456)).toBe('-456')
    expect(formatNumericValue(0)).toBe('0')
  })

  it('returns empty string for null', () => {
    expect(formatNumericValue(null)).toBe('')
  })

  it('returns empty string for undefined', () => {
    expect(formatNumericValue(undefined)).toBe('')
  })
})

describe('sanitizeNumericInput', () => {
  describe('integer mode', () => {
    it('keeps valid integers unchanged', () => {
      expect(sanitizeNumericInput('123', 'integer', 2)).toBe('123')
      expect(sanitizeNumericInput('-456', 'integer', 2)).toBe('-456')
      expect(sanitizeNumericInput('0', 'integer', 2)).toBe('0')
    })

    it('removes letters', () => {
      expect(sanitizeNumericInput('abc', 'integer', 2)).toBe('')
      expect(sanitizeNumericInput('12a34', 'integer', 2)).toBe('1234')
      expect(sanitizeNumericInput('a1b2c3', 'integer', 2)).toBe('123')
    })

    it('removes decimal points', () => {
      expect(sanitizeNumericInput('1.5', 'integer', 2)).toBe('15')
      expect(sanitizeNumericInput('12.34', 'integer', 2)).toBe('1234')
    })

    it('removes special characters', () => {
      expect(sanitizeNumericInput('$100', 'integer', 2)).toBe('100')
      expect(sanitizeNumericInput('1,000', 'integer', 2)).toBe('1000')
      expect(sanitizeNumericInput('50%', 'integer', 2)).toBe('50')
    })

    it('preserves leading minus', () => {
      expect(sanitizeNumericInput('-abc123', 'integer', 2)).toBe('-123')
      expect(sanitizeNumericInput('-', 'integer', 2)).toBe('-')
    })

    it('handles empty string', () => {
      expect(sanitizeNumericInput('', 'integer', 2)).toBe('')
    })
  })

  describe('decimal mode', () => {
    it('keeps valid decimals unchanged', () => {
      expect(sanitizeNumericInput('1.23', 'decimal', 2)).toBe('1.23')
      expect(sanitizeNumericInput('-4.56', 'decimal', 2)).toBe('-4.56')
      expect(sanitizeNumericInput('0.01', 'decimal', 2)).toBe('0.01')
    })

    it('removes letters', () => {
      expect(sanitizeNumericInput('abc', 'decimal', 2)).toBe('')
      expect(sanitizeNumericInput('1.2a3', 'decimal', 2)).toBe('1.23')
      expect(sanitizeNumericInput('abc1.23def', 'decimal', 2)).toBe('1.23')
    })

    it('truncates excess decimal places', () => {
      expect(sanitizeNumericInput('1.234', 'decimal', 2)).toBe('1.23')
      expect(sanitizeNumericInput('0.12345', 'decimal', 3)).toBe('0.123')
      expect(sanitizeNumericInput('99.999999', 'decimal', 2)).toBe('99.99')
    })

    it('removes multiple decimal points', () => {
      expect(sanitizeNumericInput('1.2.3', 'decimal', 2)).toBe('1.23')
      expect(sanitizeNumericInput('1..23', 'decimal', 2)).toBe('1.23')
      expect(sanitizeNumericInput('...', 'decimal', 2)).toBe('.')
    })

    it('preserves leading minus', () => {
      expect(sanitizeNumericInput('-1.23', 'decimal', 2)).toBe('-1.23')
      expect(sanitizeNumericInput('-abc1.23', 'decimal', 2)).toBe('-1.23')
    })

    it('handles partial input during typing', () => {
      expect(sanitizeNumericInput('.', 'decimal', 2)).toBe('.')
      expect(sanitizeNumericInput('1.', 'decimal', 2)).toBe('1.')
      expect(sanitizeNumericInput('.5', 'decimal', 2)).toBe('.5')
    })

    it('handles empty string', () => {
      expect(sanitizeNumericInput('', 'decimal', 2)).toBe('')
    })
  })
})
