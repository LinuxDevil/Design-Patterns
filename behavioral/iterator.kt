// Iterator Design Pattern
// =======================

// The Iterator pattern is a behavioral design pattern that lets you
// traverse elements of a collection without exposing its underlying
// representation (list, stack, tree, etc.).

// Problem:
// ========
// Imagine that you are writing a tree traversal library. The library
// should let the clients traverse a tree without having to know its
// internal structure. The library should also let the clients traverse
// the tree in different ways. For example, the clients should be able
// to traverse the tree in a depth-first or breadth-first manner.

// Solution:
// =========

interface Tree<T> {
    fun getRoot(): TreeNode<T>
    fun createIterator(type: TraversalType): Iterator<T>
}

interface TreeNode<T> {
    fun getValue(): T
    fun getChildren(): List<TreeNode<T>>
}

enum class TraversalType {
    DEPTH_FIRST,
    BREADTH_FIRST
}

class DepthFirstTreeIterator<T>(private val rootNode: TreeNode<T>) : Iterator<T> {
    private val stack = mutableListOf<TreeNode<T>>()

    init {
        stack.add(rootNode)
    }

    override fun hasNext(): Boolean {
        return stack.isNotEmpty()
    }

    override fun next(): T {
        val node = stack.removeAt(stack.lastIndex)
        stack.addAll(node.getChildren().reversed())
        return node.getValue()
    }
}

class BreadthFirstTreeIterator<T>(private val rootNode: TreeNode<T>) : Iterator<T> {
    private val queue = mutableListOf<TreeNode<T>>()

    init {
        queue.add(rootNode)
    }

    override fun hasNext(): Boolean {
        return queue.isNotEmpty()
    }

    override fun next(): T {
        val node = queue.removeAt(0)
        queue.addAll(node.getChildren())
        return node.getValue()
    }
}

class MyTree<T>(private val root: TreeNode<T>) : Tree<T> {
    override fun getRoot(): TreeNode<T> {
        return root
    }

    override fun createIterator(type: TraversalType): Iterator<T> {
        return when (type) {
            TraversalType.DEPTH_FIRST -> DepthFirstTreeIterator(root)
            TraversalType.BREADTH_FIRST -> BreadthFirstTreeIterator(root)
        }
    }
}

class MyTreeNode<T>(private val value: T, private val children: List<TreeNode<T>> = emptyList()) : TreeNode<T> {
    override fun getValue(): T {
        return value
    }

    override fun getChildren(): List<TreeNode<T>> {
        return children
    }
}

// Use the Iterator pattern when your collection has a
// complex data structure under the hood, but you want
// to hide its com- plexity from clients 
// (either for convenience or security reasons).
// Use the pattern to reduce duplication of the traversal code across your app.