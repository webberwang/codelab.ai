import { BaseType, ValueFn } from 'd3-selection'
import { LinkType, NodeType } from '../Graph.i'

type NodeAttributesMap = (
  color: string,
  radius: number,
  distance: number,
) => (nodeType: NodeType) => NodeTypeMap

type NodeTypeMap = {
  [nodeType: string]: NodeAttribute
}

export type NodeAttribute = {
  color: string
  radius: number
  distance: number
}

const nodeAttributes: NodeAttributesMap = (color, radius, distance) => (
  nodeType,
) => ({
  [nodeType]: {
    color,
    radius,
    distance,
  },
})

type LinkAttributesMap = (
  color: string,
  distance: number,
) => (linkType: LinkType) => LinkTypeMap

type LinkTypeMap = {
  [linkType: string]: LinkAttribute
}

export type LinkAttribute = {
  distance: number
  color: string
}

const linkAttributes: LinkAttributesMap = (color, distance) => (linkType) => ({
  [linkType]: {
    color,
    distance,
  },
})

export const g = {
  /**
   * Graph
   */
  svg: {},
  width: 600,
  height: 600,
  /**
   * Nodes
   */
  activeNode: { id: '' },

  // Color
  activeNodeColor: 'orange',
  vertexRadius: 10,

  labelOffset: 10,

  node: {
    ...nodeAttributes('grey', 10, 50)(NodeType.Model),
    ...nodeAttributes('blue', 7, 50)(NodeType.Field),
    ...nodeAttributes('green', 4, 50)(NodeType.Data),
    ...nodeAttributes('lightgreen', 4, 50)(NodeType.Query),
    ...nodeAttributes('purple', 4, 50)(NodeType.Content),
    ...nodeAttributes('grey', 10, 50)(NodeType.Default),
  },

  link: {
    ...linkAttributes('grey', 50)(LinkType.Field),
    ...linkAttributes('grey', 50)(LinkType.Content),
    ...linkAttributes('grey', 50)(LinkType.Data),
    ...linkAttributes('grey', 50)(LinkType.Default),
  },

  /**
   * links
   */
  activeLink: { id: '' },
  activeLinkColor: 'orange',
}

export type GetNodeAttribute<GElement extends BaseType, Datum> = (
  attr: keyof NodeAttribute,
) => ValueFn<GElement, Datum, string | number | boolean | null>

export const nodeAttribute: GetNodeAttribute<any, any> = (attr) => (d) => {
  const typename = d?.type?.name || NodeType.Default

  return g.node[typename][attr]
}

export type GetLinkAttribute<
  GElement extends BaseType,
  Datum,
  Results = string | number
> = (attr: keyof LinkAttribute) => ValueFn<GElement, Datum, Results>

export const linkAttribute: GetLinkAttribute<any, any> = (attr) => (d) => {
  const typename = d?.type?.name as LinkType

  return g.link[typename]?.[attr] || g.link[LinkType.Default][attr]
}
