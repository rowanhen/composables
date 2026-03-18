/**
 * Opinionated TreeView component.
 * Re-exports the primitive as the API is already clean.
 *
 * @example
 * ```tsx
 * <TreeView title="Documents">
 *   <TreeView title="Reports">
 *     <TreeView title="Q1.pdf" isFile />
 *     <TreeView title="Q2.pdf" isFile />
 *   </TreeView>
 *   <TreeView title="Notes.txt" isFile />
 * </TreeView>
 * ```
 */
export { TreeView, type TreeViewProps } from '@/components/_internal/tree-view'
