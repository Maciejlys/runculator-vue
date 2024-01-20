import { describe, expect, it } from 'vitest'
import { convert } from './convert'

describe('convert', () => {
  it('should convert', () => {
    expect(convert(8, 0)).toBe('7.50')
  })
  it('should convert', () => {
    expect(convert(8, 34)).toBe('7.00')
  })
  it('should convert', () => {
    expect(convert(5, 30)).toBe('10.91')
  })
  it('should convert', () => {
    expect(convert(3, 30)).toBe('17.14')
  })
})
