/**
 * Opinionated TreeView component.
 * Re-exports the primitive as the API is already clean.
 *
 * @example
 * ```tsx
 * <TreeView>
 *   <TreeItem label="Documents">
 *     <TreeItem label="Reports">
 *       <TreeItem label="Q1.pdf" />
 *       <TreeItem label="Q2.pdf" />
 *     </TreeItem>
 *     <TreeItem label="Notes.txt" />
 *   </TreeItem>
 * </TreeView>
 * ```
 */
export { TreeView, type TreeViewProps } from '@/components/ui/tree-view'
