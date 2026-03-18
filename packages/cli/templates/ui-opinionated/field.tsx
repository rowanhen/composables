/**
 * Opinionated Field component.
 * Re-exports the primitive as the API is already clean.
 *
 * @example
 * ```tsx
 * <Field>
 *   <FieldLabel>Email</FieldLabel>
 *   <Input type="email" />
 *   <FieldDescription>Enter your email address</FieldDescription>
 *   <FieldError>Email is required</FieldError>
 * </Field>
 * ```
 */
export {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldContent,
  FieldTitle,
} from '@/components/_internal/field'
