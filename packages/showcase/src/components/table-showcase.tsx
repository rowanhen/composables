import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ShowcaseSection } from './showcase-section'

export function TableShowcase() {
  return (
    <ShowcaseSection title="Table" description="Structured data display.">
      <div className="rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Policy</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Premium</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              ['POL-001', 'Alice Smith', 'Active', '\u00A31,200'],
              ['POL-002', 'Bob Jones', 'Pending', '\u00A3890'],
              ['POL-003', 'Carol White', 'Active', '\u00A32,150'],
              ['POL-004', 'David Brown', 'Expired', '\u00A3750'],
            ].map(([policy, customer, status, premium]) => (
              <TableRow key={policy}>
                <TableCell className="font-medium">{policy}</TableCell>
                <TableCell>{customer}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      status === 'Active'
                        ? 'success'
                        : status === 'Pending'
                          ? 'warning'
                          : 'secondary'
                    }
                  >
                    {status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">{premium}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </ShowcaseSection>
  )
}
