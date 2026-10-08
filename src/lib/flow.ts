export type FlowOrientation = 'horizontal' | 'vertical'
export type FlowTree =
	| { kind: 'node'; id: string }
	| { kind: 'sequence' | 'parallel'; children: FlowTree[] }
export interface FlowEdge {
	from: string
	to: string
}
export interface FlowPoint {
	x: number
	y: number
}

/** Branches connect only at their entry/exit; empty groups pass through. */
export function getFlowEdges(tree: FlowTree): FlowEdge[] {
	const edges: FlowEdge[] = []
	const visit = (entry: FlowTree): { starts: string[]; ends: string[] } => {
		if (entry.kind === 'node') return { starts: [entry.id], ends: [entry.id] }
		const children = entry.children.map(visit).filter((child) => child.starts.length > 0)
		if (entry.kind === 'parallel')
			return {
				starts: children.flatMap((child) => child.starts),
				ends: children.flatMap((child) => child.ends),
			}
		for (let index = 1; index < children.length; index++) {
			for (const from of children[index - 1].ends)
				for (const to of children[index].starts) edges.push({ from, to })
		}
		return { starts: children[0]?.starts ?? [], ends: children.at(-1)?.ends ?? [] }
	}
	visit(tree)
	return edges
}

/** Orthogonal connector with small rounded bends; also supports right-to-left. */
export function getFlowPath(
	start: FlowPoint,
	end: FlowPoint,
	orientation: FlowOrientation,
): string {
	const vertical = orientation === 'vertical'
	const [a, b, c, d] = vertical
		? [start.y, start.x, end.y, end.x]
		: [start.x, start.y, end.x, end.y]
	const point = (axis: number, cross: number) =>
		vertical ? `${cross} ${axis}` : `${axis} ${cross}`
	if (b === d) return `M ${point(a, b)} L ${point(c, d)}`
	const middle = (a + c) / 2
	const direction = Math.sign(c - a) || 1
	const turn = Math.sign(d - b)
	const radius = Math.min(6, Math.abs(c - a) / 2, Math.abs(d - b) / 2)
	return `M ${point(a, b)} L ${point(middle - direction * radius, b)} Q ${point(middle, b)} ${point(middle, b + turn * radius)} L ${point(middle, d - turn * radius)} Q ${point(middle, d)} ${point(middle + direction * radius, d)} L ${point(c, d)}`
}
