/**
 * Opinionated InputGroup component.
 * Re-exports the primitive as the API is already clean.
 *
 * @example
 * ```tsx
 * <InputGroup>
 *   <InputGroupAddon align="start">$</InputGroupAddon>
 *   <InputGroupInput placeholder="Amount" />
 *   <InputGroupButton>Submit</InputGroupButton>
 * </InputGroup>
 * ```
 */
export {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
	InputGroupTextarea,
} from '../_internal/input-group'
