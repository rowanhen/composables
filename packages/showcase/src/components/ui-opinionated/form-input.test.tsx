import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { FormInput } from './form-input'

describe('FormInput', () => {
  describe('numericMode="integer"', () => {
    it('allows typing digits', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()

      render(
        <FormInput
          label="Test"
          numericMode="integer"
          numericValue={null}
          onNumericChange={onChange}
        />,
      )

      const input = screen.getByRole('textbox')
      await user.type(input, '123')

      expect(input).toHaveValue('123')
    })

    it('blocks letters from appearing', async () => {
      const user = userEvent.setup()

      render(
        <FormInput
          label="Test"
          numericMode="integer"
          numericValue={null}
          onNumericChange={vi.fn()}
        />,
      )

      const input = screen.getByRole('textbox')
      await user.type(input, 'abc')

      expect(input).toHaveValue('')
    })

    it('blocks mixed letters and numbers - keeps only digits', async () => {
      const user = userEvent.setup()

      render(
        <FormInput
          label="Test"
          numericMode="integer"
          numericValue={null}
          onNumericChange={vi.fn()}
        />,
      )

      const input = screen.getByRole('textbox')
      await user.type(input, 'a1b2c3')

      expect(input).toHaveValue('123')
    })

    it('blocks decimal points', async () => {
      const user = userEvent.setup()

      render(
        <FormInput
          label="Test"
          numericMode="integer"
          numericValue={null}
          onNumericChange={vi.fn()}
        />,
      )

      const input = screen.getByRole('textbox')
      await user.type(input, '1.5')

      expect(input).toHaveValue('15')
    })

    it('allows negative numbers', async () => {
      const user = userEvent.setup()

      render(
        <FormInput
          label="Test"
          numericMode="integer"
          numericValue={null}
          onNumericChange={vi.fn()}
        />,
      )

      const input = screen.getByRole('textbox')
      await user.type(input, '-123')

      expect(input).toHaveValue('-123')
    })

    it('calls onNumericChange with parsed integer on blur', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()

      render(
        <FormInput
          label="Test"
          numericMode="integer"
          numericValue={null}
          onNumericChange={onChange}
        />,
      )

      const input = screen.getByRole('textbox')
      await user.type(input, '456')
      await user.tab() // blur

      expect(onChange).toHaveBeenCalledWith(456)
    })

    it('calls onNumericChange with null for empty input on blur', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()

      render(
        <FormInput
          label="Test"
          numericMode="integer"
          numericValue={123}
          onNumericChange={onChange}
        />,
      )

      const input = screen.getByRole('textbox')
      await user.clear(input)
      await user.tab()

      expect(onChange).toHaveBeenCalledWith(null)
    })
  })

  describe('numericMode="decimal"', () => {
    it('allows typing decimals within limit', async () => {
      const user = userEvent.setup()

      render(
        <FormInput
          label="Test"
          numericMode="decimal"
          maxDecimalPlaces={2}
          numericValue={null}
          onNumericChange={vi.fn()}
        />,
      )

      const input = screen.getByRole('textbox')
      await user.type(input, '1.23')

      expect(input).toHaveValue('1.23')
    })

    it('truncates excess decimal places', async () => {
      const user = userEvent.setup()

      render(
        <FormInput
          label="Test"
          numericMode="decimal"
          maxDecimalPlaces={2}
          numericValue={null}
          onNumericChange={vi.fn()}
        />,
      )

      const input = screen.getByRole('textbox')
      await user.type(input, '1.234')

      expect(input).toHaveValue('1.23')
    })

    it('truncates with maxDecimalPlaces={3}', async () => {
      const user = userEvent.setup()

      render(
        <FormInput
          label="Test"
          numericMode="decimal"
          maxDecimalPlaces={3}
          numericValue={null}
          onNumericChange={vi.fn()}
        />,
      )

      const input = screen.getByRole('textbox')
      await user.type(input, '0.1234')

      expect(input).toHaveValue('0.123')
    })

    it('blocks letters from appearing', async () => {
      const user = userEvent.setup()

      render(
        <FormInput
          label="Test"
          numericMode="decimal"
          numericValue={null}
          onNumericChange={vi.fn()}
        />,
      )

      const input = screen.getByRole('textbox')
      await user.type(input, 'abc')

      expect(input).toHaveValue('')
    })

    it('removes only the letters from mixed input', async () => {
      const user = userEvent.setup()

      render(
        <FormInput
          label="Test"
          numericMode="decimal"
          maxDecimalPlaces={2}
          numericValue={null}
          onNumericChange={vi.fn()}
        />,
      )

      const input = screen.getByRole('textbox')
      await user.type(input, 'a1.2b3')

      expect(input).toHaveValue('1.23')
    })

    it('allows typing 0.01', async () => {
      const user = userEvent.setup()

      render(
        <FormInput
          label="Test"
          numericMode="decimal"
          maxDecimalPlaces={2}
          numericValue={null}
          onNumericChange={vi.fn()}
        />,
      )

      const input = screen.getByRole('textbox')
      await user.type(input, '0.01')

      expect(input).toHaveValue('0.01')
    })

    it('allows typing very small decimals with high precision', async () => {
      const user = userEvent.setup()

      render(
        <FormInput
          label="Test"
          numericMode="decimal"
          maxDecimalPlaces={8}
          numericValue={null}
          onNumericChange={vi.fn()}
        />,
      )

      const input = screen.getByRole('textbox')
      await user.type(input, '0.00000001')

      expect(input).toHaveValue('0.00000001')
    })

    it('removes extra decimal points', async () => {
      const user = userEvent.setup()

      render(
        <FormInput
          label="Test"
          numericMode="decimal"
          maxDecimalPlaces={2}
          numericValue={null}
          onNumericChange={vi.fn()}
        />,
      )

      const input = screen.getByRole('textbox')
      await user.type(input, '1.2.3')

      expect(input).toHaveValue('1.23')
    })

    it('calls onNumericChange with parsed float on blur', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()

      render(
        <FormInput
          label="Test"
          numericMode="decimal"
          numericValue={null}
          onNumericChange={onChange}
        />,
      )

      const input = screen.getByRole('textbox')
      await user.type(input, '1.23')
      await user.tab()

      expect(onChange).toHaveBeenCalledWith(1.23)
    })
  })

  describe('displays initial value', () => {
    it('shows numericValue as string', () => {
      render(
        <FormInput
          label="Test"
          numericMode="decimal"
          numericValue={42.5}
          onNumericChange={vi.fn()}
        />,
      )

      expect(screen.getByRole('textbox')).toHaveValue('42.5')
    })

    it('shows empty for null numericValue', () => {
      render(
        <FormInput
          label="Test"
          numericMode="decimal"
          numericValue={null}
          onNumericChange={vi.fn()}
        />,
      )

      expect(screen.getByRole('textbox')).toHaveValue('')
    })
  })
})
