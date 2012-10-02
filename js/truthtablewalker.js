function TruthTableWalker()
{
	this.terms = [];
	this.variables = [];
}

TruthTableWalker.prototype.apply = function(node, depth)
{
	if(node.op in this)
		this[node.op].call(this, node, depth);
	else
		throw "error: Unknown operator/function: " + node.op;
}

TruthTableWalker.prototype.walk = function(ast)
{
	this.apply(ast, 0);

}

TruthTableWalker.prototype.and = function(node, depth)
{
	lhs = this.apply(node.lhs, depth + 1);
	rhs = this.apply(node.rhs, depth + 1);
	node.depth = depth;
	this.terms.push(node);
}

TruthTableWalker.prototype.or = function(node, depth)
{
	lhs = this.apply(node.lhs, depth + 1);
	rhs = this.apply(node.rhs, depth + 1);
	node.depth = depth;
	this.terms.push(node);
}

TruthTableWalker.prototype.implies = function(node, depth)
{
	lhs = this.apply(node.lhs, depth + 1);
	rhs = this.apply(node.rhs, depth + 1);
	node.depth = depth;
	this.terms.push(node);
}

TruthTableWalker.prototype.equivalent = function(node, depth)
{
	lhs = this.apply(node.lhs, depth + 1);
	rhs = this.apply(node.rhs, depth + 1);
	node.depth = depth;
	this.terms.push(node);
}

TruthTableWalker.prototype.not = function(node, depth)
{
	lhs = this.apply(node.rhs, depth + 1);
	node.depth = depth;
	this.terms.push(node);
}

TruthTableWalker.prototype.variable = function(node, depth)
{
	node.depth = depth;
	this.variables.push(node.rhs);
	this.terms.push(node);
}


