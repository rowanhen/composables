import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { FormInputGroup } from './form-input-group'

describe('FormInputGroup', () => {
  describe('numericMode="decimal"', () => {
    it('allows typing decimals within limit', async () => {
      const user = userEvent.setup()

      render(
        <FormInputGroup
          label="Amount"
          startText="£"
          inputProps={{
            numericMode: 'decimal',
            maxDecimalPlaces: 2,
            numericValue: null,
            onNumericChange: vi.fn(),
          }}
        />,
      )

      const input = screen.getByRole('textbox')
      await user.type(input, '1.23')

      expect(input).toHaveValue('1.23')
    })

    it('truncates excess decimal places', async () => {
      const user = userEvent.setup()

      render(
        <FormInputGroup
          label="Amount"
          startText="£"
          inputProps={{
            numericMode: 'decimal',
            maxDecimalPlaces: 2,
            numericValue: null,
            onNumericChange: vi.fn(),
          }}
        />,
      )

      const input = screen.getByRole('textbox')
      await user.type(input, '1.234')

      expect(input).toHaveValue('1.23')
    })

    it('blocks letters from appearing', async () => {
      const user = userEvent.setup()

      render(
        <FormInputGroup
          label="Amount"
          startText="£"
          inputProps={{
            numericMode: 'decimal',
            maxDecimalPlaces: 2,
            numericValue: null,
            onNumericChange: vi.fn(),
          }}
        />,
      )

      const input = screen.getByRole('textbox')
      await user.type(input, 'abc')

      expect(input).toHaveValue('')
    })

    it('removes letters from mixed input', async () => {
      const user = userEvent.setup()

      render(
        <FormInputGroup
          label="Amount"
          startText="£"
          inputProps={{
            numericMode: 'decimal',
            maxDecimalPlaces: 2,
            numericValue: null,
            onNumericChange: vi.fn(),
          }}
        />,
      )

      const input = screen.getByRole('textbox')
      await user.type(input, 'a1.2b3')

      expect(input).toHaveValue('1.23')
    })

    it('allows typing 0.01', async () => {
      const user = userEvent.setup()

      render(
        <FormInputGroup
          label="Amount"
          startText="£"
          inputProps={{
            numericMode: 'decimal',
            maxDecimalPlaces: 2,
            numericValue: null,
            onNumericChange: vi.fn(),
          }}
        />,
      )

      const input = screen.getByRole('textbox')
      await user.type(input, '0.01')

      expect(input).toHaveValue('0.01')
    })

    it('calls onNumericChange with parsed float on blur', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()

      render(
        <FormInputGroup
          label="Amount"
          startText="£"
          inputProps={{
            numericMode: 'decimal',
            maxDecimalPlaces: 2,
            numericValue: null,
            onNumericChange: onChange,
          }}
        />,
      )

      const input = screen.getByRole('textbox')
      await user.type(input, '42.50')
      await user.tab()

      expect(onChange).toHaveBeenCalledWith(42.5)
    })

    it('displays initial numericValue', () => {
      render(
        <FormInputGroup
          label="Amount"
          startText="£"
          inputProps={{
            numericMode: 'decimal',
            numericValue: 99.99,
            onNumericChange: vi.fn(),
          }}
        />,
      )

      expect(screen.getByRole('textbox')).toHaveValue('99.99')
    })
  })

  describe('with startAddon prop', () => {
    it('works with startAddon instead of startText', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()

      render(
        <FormInputGroup
          label="Amount"
          startAddon="£"
          inputProps={{
            numericMode: 'decimal',
            maxDecimalPlaces: 2,
            numericValue: null,
            onNumericChange: onChange,
          }}
        />,
      )

      const input = screen.getByRole('textbox')
      await user.type(input, '123.45')

      expect(input).toHaveValue('123.45')
    })

    it('truncates decimals with startAddon', async () => {
      const user = userEvent.setup()

      render(
        <FormInputGroup
          label="Amount"
          startAddon="£"
          inputProps={{
            numericMode: 'decimal',
            maxDecimalPlaces: 2,
            numericValue: null,
            onNumericChange: vi.fn(),
          }}
        />,
      )

      const input = screen.getByRole('textbox')
      await user.type(input, '123.456')

      expect(input).toHaveValue('123.45')
    })

    it('blocks letters with startAddon', async () => {
      const user = userEvent.setup()

      render(
        <FormInputGroup
          label="Amount"
          startAddon="£"
          inputProps={{
            numericMode: 'decimal',
            maxDecimalPlaces: 2,
            numericValue: null,
            onNumericChange: vi.fn(),
          }}
        />,
      )

      const input = screen.getByRole('textbox')
      await user.type(input, 'abc123')

      expect(input).toHaveValue('123')
    })
  })

  describe('numericMode="integer"', () => {
    it('allows typing digits', async () => {
      const user = userEvent.setup()

      render(
        <FormInputGroup
          label="Quantity"
          inputProps={{
            numericMode: 'integer',
            numericValue: null,
            onNumericChange: vi.fn(),
          }}
        />,
      )

      const input = screen.getByRole('textbox')
      await user.type(input, '123')

      expect(input).toHaveValue('123')
    })

    it('blocks letters', async () => {
      const user = userEvent.setup()

      render(
        <FormInputGroup
          label="Quantity"
          inputProps={{
            numericMode: 'integer',
            numericValue: null,
            onNumericChange: vi.fn(),
          }}
        />,
      )

      const input = screen.getByRole('textbox')
      await user.type(input, 'abc')

      expect(input).toHaveValue('')
    })

    it('blocks decimal points', async () => {
      const user = userEvent.setup()

      render(
        <FormInputGroup
          label="Quantity"
          inputProps={{
            numericMode: 'integer',
            numericValue: null,
            onNumericChange: vi.fn(),
          }}
        />,
      )

      const input = screen.getByRole('textbox')
      await user.type(input, '1.5')

      expect(input).toHaveValue('15')
    })
  })
})
