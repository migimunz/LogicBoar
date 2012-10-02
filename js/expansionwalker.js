
function expand(ast)
{
	var newAst = copyAst(ast);
	var maxIterations = 100;
	var currentIteration = 0;
	var flag = {changed: true}
	while(flag.changed && currentIteration <= maxIterations)
	{
		flag.changed = false;
		currentIteration++;
		newAst = expandIter(newAst, flag);
	}
	return newAst;
}

function notNode(node)
{
	return {
		op: "not",
		rhs: node
	};
}

function andNode(lhs, rhs)
{
	return {
		op: "and",
		lhs: lhs,
		rhs: rhs
	};
}

function orNode(lhs, rhs)
{
	return {
		op: "or",
		lhs: lhs,
		rhs: rhs
	};
}

function expandNot(node, child, flag)
{
	if(child.op == "not")
	{
		flag.changed = true;
		return child.rhs;
	}
	else if(child.op == "and")
	{
		flag.changed = true;
		return orNode(notNode(child.lhs), notNode(child.rhs));
	}
	else if(child.op == "or")
	{
		flag.changed = true;
		return andNode(notNode(child.lhs), notNode(child.rhs));
	}
	else
	{
		node.rhs = expandIter(node.rhs, flag);
		return node;
	}
}

function expandImplies(node, lhs, rhs, flag)
{
	flag.changed = true;
	return orNode(notNode(lhs), rhs);
}

function expandEquivalent(node, lhs, rhs, flag)
{
	flag.changed = true;
	var impl1 = orNode(notNode(lhs), rhs);
	var impl2 = orNode(lhs, notNode(rhs));
	return andNode(impl1, impl2);
}

function expandIter(node, flag)
{
	switch(node.op)
	{
		case "not":
			return expandNot(node, node.rhs, flag);
		case "and":
			return andNode(expandIter(node.lhs, flag), expandIter(node.rhs, flag));
		case "or":
			return orNode(expandIter(node.lhs, flag), expandIter(node.rhs, flag));
		case "implies":
			return expandImplies(node, node.lhs, node.rhs, flag);
		case "equivalent":
			return extendEquivalent(node, node.lhs, node.rhs, flag);
		default:
			return node;
	}
}