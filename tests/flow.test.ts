import { describe, expect, test } from 'bun:test'
import { getFlowEdges, getFlowPath, type FlowTree } from '../src/lib/flow'

const node = (id: string): FlowTree => ({ kind: 'node', id })
const sequence = (...children: FlowTree[]): FlowTree => ({ kind: 'sequence', children })
const parallel = (...children: FlowTree[]): FlowTree => ({ kind: 'parallel', children })
const connections = (tree: FlowTree) =>
	getFlowEdges(tree)
		.map((edge) => `${edge.from}->${edge.to}`)
		.sort()

describe('Flow topology', () => {
	test('connects branch entries and exits without linking sibling branches', () => {
		expect(
			connections(
				sequence(node('start'), parallel(sequence(node('a1'), node('a2')), node('b')), node('end')),
			),
		).toEqual(['a1->a2', 'a2->end', 'b->end', 'start->a1', 'start->b'])
	})
	test('connects consecutive parallel groups and supports nested branching', () => {
		expect(
			connections(
				sequence(
					parallel(node('a'), sequence(node('b'), parallel(node('c'), node('d')))),
					parallel(node('e'), node('f')),
				),
			),
		).toEqual(['a->e', 'a->f', 'b->c', 'b->d', 'c->e', 'c->f', 'd->e', 'd->f'])
	})
	test('empty groups pass through and boundary groups do not invent nodes', () => {
		expect(connections(sequence(node('a'), parallel(sequence()), node('b')))).toEqual(['a->b'])
		expect(connections(parallel(node('a'), node('b')))).toEqual([])
		expect(connections(sequence())).toEqual([])
	})
})

describe('Flow connector geometry', () => {
	test('connects the exact horizontal endpoints with rounded bends', () => {
		const path = getFlowPath({ x: 100, y: 30 }, { x: 160, y: 90 }, 'horizontal')
		expect(path).toStartWith('M 100 30')
		expect(path).toEndWith('L 160 90')
		expect(path.match(/Q/g)?.length).toBe(2)
	})
	test('uses the same geometry on the vertical axis and in RTL', () => {
		expect(getFlowPath({ x: 30, y: 100 }, { x: 90, y: 160 }, 'vertical')).toBe(
			'M 30 100 L 30 124 Q 30 130 36 130 L 84 130 Q 90 130 90 136 L 90 160',
		)
		const rtl = getFlowPath({ x: 160, y: 30 }, { x: 100, y: 90 }, 'horizontal')
		expect(rtl).toStartWith('M 160 30 L 136 30')
		expect(rtl).toEndWith('L 100 90')
	})
	test('straight and zero-length connections remain finite', () => {
		expect(getFlowPath({ x: 20, y: 30 }, { x: 50, y: 30 }, 'horizontal')).toBe('M 20 30 L 50 30')
		expect(getFlowPath({ x: 20, y: 30 }, { x: 20, y: 30 }, 'vertical')).toBe('M 20 30 L 20 30')
	})
})
