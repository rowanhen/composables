import type { FC } from 'react'
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  Breadcrumb as BreadcrumbPrimitive,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui-extended/button'
import { useBreadcrumbs } from '@/hooks/use-breadcrumbs'

export const Breadcrumb: FC = () => {
  const breadcrumbs = useBreadcrumbs()

  if (breadcrumbs.length === 0) {
    return null
  }

  const lastBreadcrumb = breadcrumbs[breadcrumbs.length - 1]
  const parentBreadcrumbs = breadcrumbs.slice(0, -1)

  return (
    <BreadcrumbPrimitive>
      <BreadcrumbList>
        {parentBreadcrumbs.flatMap((crumb, index) => {
          const items = []
          if (index > 0) {
            items.push(<BreadcrumbSeparator key={crumb.path} />)
          }
          items.push(
            <BreadcrumbItem key={crumb.path}>
              <BreadcrumbLink
                render={(props) => (
                  <Button {...props} onClick={crumb.onClick} variant="ghost" size="sm">
                    {crumb.label}
                  </Button>
                )}
              />
            </BreadcrumbItem>,
          )
          return items
        })}
        {parentBreadcrumbs.length > 0 && <BreadcrumbSeparator />}
        <BreadcrumbItem>
          <BreadcrumbPage>
            <span>{lastBreadcrumb.label}</span>
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </BreadcrumbPrimitive>
  )
}
