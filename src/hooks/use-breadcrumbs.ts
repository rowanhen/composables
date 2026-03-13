import { useMatches, useNavigate } from '@tanstack/react-router'
import { useMemo } from 'react'

export type BreadcrumbConfig = {
  label: string | ((params: Record<string, string>) => string)
  /**
   * Whether this breadcrumb should be clickable. Defaults to true.
   * Note: The last breadcrumb in the chain is always non-clickable (current page).
   */
  clickable?: boolean
}

export type BreadcrumbItem = {
  label: string
  path: string
  onClick?: () => void
}

/**
 * Automatically generates breadcrumbs from matched routes.
 * Each route can optionally define breadcrumb metadata via staticData.
 * If no breadcrumb config is provided, attempts to auto-generate from route segment.
 *
 * @example
 * // With explicit config:
 * export const Route = createFileRoute('/proposals/$proposalId/edit/')({
 *   component: EditPage,
 *   staticData: {
 *     breadcrumb: { label: 'Edit' }
 *   }
 * })
 *
 * // Without config (auto-generates "Edit" from "/edit/"):
 * export const Route = createFileRoute('/proposals/$proposalId/edit/')({
 *   component: EditPage,
 * })
 *
 * // In component:
 * const breadcrumbs = useBreadcrumbs()
 * // Returns: [{ label: 'Proposals', onClick: ... }, { label: '123', onClick: ... }, { label: 'Edit' }]
 */
export function useBreadcrumbs(): BreadcrumbItem[] {
  const matches = useMatches()
  const navigate = useNavigate()

  return useMemo(() => {
    const breadcrumbs: BreadcrumbItem[] = []

    for (const match of matches) {
      // @ts-expect-error - staticData is not typed
      const breadcrumbConfig = match.staticData?.breadcrumb as BreadcrumbConfig | undefined

      // If no explicit config, try to auto-generate from the route segment
      if (!breadcrumbConfig) {
        const autoLabel = getRouteSegmentLabel(match.routeId)
        if (!autoLabel) {
          continue
        }

        breadcrumbs.push({
          label: autoLabel,
          path: match.pathname,
          onClick: () => {
            navigate({
              to: match.pathname,
            })
          },
        })
        continue
      }

      // Label can be a string, or function for dynamic labels such as IDs
      const label =
        typeof breadcrumbConfig.label === 'function'
          ? breadcrumbConfig.label(match.params as Record<string, string>)
          : breadcrumbConfig.label

      const isClickable = breadcrumbConfig.clickable !== false

      breadcrumbs.push({
        label,
        path: match.pathname,
        onClick: isClickable
          ? () => {
              navigate({
                to: match.pathname,
              })
            }
          : undefined,
      })
    }

    // The last breadcrumb is not clickable (it's the current page)
    if (breadcrumbs.length > 0) {
      breadcrumbs[breadcrumbs.length - 1].onClick = undefined
    }

    return breadcrumbs
  }, [matches, navigate])
}

/**
 * Extracts the last segment from a route path and formats it as a label.
 * e.g. "/proposals/edit" -> "Edit", "/my-settings" -> "My Settings"
 */
function getRouteSegmentLabel(routeId: string): string | null {
  const segments = routeId.split('/').filter(Boolean)
  const lastSegment = segments[segments.length - 1]

  // Routes that should not generate breadcrumb labels
  const shouldSkip =
    routeId === '__root__' ||
    routeId === '/' ||
    !lastSegment ||
    lastSegment.startsWith('$') ||
    lastSegment === '_layout'

  if (shouldSkip) {
    return null
  }

  // Convert to Title Case: "edit" -> "Edit", "my-page" -> "My Page"
  return lastSegment
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
