import { decode } from '@codelab/common'
import { evalPropsWithContext, filterRenderProps, Props } from '@codelab/props'
import { reduce } from 'lodash'
import React, { FunctionComponent, ReactNode } from 'react'
import { nodeC } from './codec/Node.codec'
import { HasChildren, Node as NodeInterface } from './Node.i'
import { isReactNode } from './codec/Node-react'
import { NodeA, NodeI } from './codec/Node.codec.i'

/**
 * Node is instantiated during Tree traversal
 */
export class Node<P extends Props = {}> implements NodeInterface<P> {
  public Component: FunctionComponent<any> = () => null

  public id: string

  public type: string

  // eslint-disable-next-line react/static-property-placement
  public props: P

  public parent?: Node<P>

  public children: Array<Node<P>> = []

  /**
   * The decoded input
   */
  public dto: NodeA<P>

  /**
   * Can take just ID, but fills out other fields
   */
  constructor(node: NodeI) {
    const { data } = decode(node, nodeC)
    const { props, id } = data

    this.type = isReactNode(data) ? data.type : undefined
    this.dto = data
    this.props = props
    this.id = id
  }

  get key(): React.Key {
    return (this.props.key as React.Key) ?? this.id
  }

  public addChild(child: Node<P>) {
    this.children.push(child)
    child.addParent(this)
  }

  public addParent(parent: Node<P>) {
    this.parent = parent
  }

  static hasChildren<TreeNode extends HasChildren<TreeNode>>(node: TreeNode) {
    return !!node.children?.length
  }

  /**
   * Check children assigned from json structure
   */
  public hasChildren() {
    return !!this.children.length
  }

  public get renderProps() {
    return evalPropsWithContext(filterRenderProps(this.props)) ?? {}
  }

  /**
   * For current node/component, build a React tree comprising of current parent & all children.
   *
   * Allow recursive building of React tree from the bottom up.
   *
   * Children passed from root tree component
   *
   * const Component = Tree.render(data)
   *
   * ```
   * <Component>{jsxChildren}</Component>
   * ```
   */
  public Children(rootChildren: ReactNode): ReactNode | Array<ReactNode> {
    const children = reduce<Node<P>, Array<ReactNode>>(
      this.children,
      (Components: Array<ReactNode>, child: Node<P>) => {
        const { Component: Child, props, key, children: grandChildren } = child

        // console.debug(`${this.type} -> ${child.type}`)

        let ChildComponent: ReactNode = rootChildren ? (
          <Child key={key} {...props} {...this.renderProps}>
            {rootChildren}
          </Child>
        ) : (
          <Child key={key} {...props} {...this.renderProps} />
        )

        if (child.hasChildren()) {
          ChildComponent = (
            <Child key={key} {...props} {...this.renderProps}>
              {child.Children(rootChildren)}
            </Child>
          )
        }

        return [...Components, ChildComponent]
      },
      [],
    )

    return children.length === 1 ? children[0] : children
  }
}
