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
  DropZone,
  DropZone as Dropzone,
  DropZoneContent,
  DropZoneContent as DropzoneContent,
  DropZoneInput,
  DropZoneInput as DropzoneInput,
  DropZoneArea,
  DropZoneArea as DropzoneLabel,
  DropZoneFile,
  DropZoneFileList,
  useDropZoneContext,
  formatFileSize,
  getAcceptDescription,
  getRejectionMessage,
  DEFAULT_MAX_SIZE,
  DEFAULT_ACCEPT,
  ACCEPT_PRESETS,
} from '@/components/ui/dropzone'
export type { DropZoneProps, DropZoneFileProps, Accept, FileRejection } from '@/components/ui/dropzone'
