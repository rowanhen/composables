/**
 * Opinionated Dropzone component.
 * Re-exports the primitive as the API is already clean.
 * For form-bound usage, see form-dropzone.
 *
 * @example
 * ```tsx
 * <Dropzone
 *   onDrop={(files) => console.log(files)}
 *   accept={{ 'image/*': ['.png', '.jpg'] }}
 *   maxSize={5 * 1024 * 1024}
 * >
 *   <DropzoneInput />
 *   <DropzoneContent>
 *     <DropzoneLabel>Drop files here or click to upload</DropzoneLabel>
 *   </DropzoneContent>
 * </Dropzone>
 * ```
 */
export {
  Dropzone,
  DropzoneContent,
  DropzoneInput,
  DropzoneLabel,
} from '@/components/ui/dropzone'
