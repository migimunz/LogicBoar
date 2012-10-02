function prettyPrintQuery(ast)
{
	var str = prettyPrint(ast);
	var $section = appendSection("Pretty print:");
	$section.append($("<pre class='section-text'></pre>").text(str));
}

function prettyPrintBinary(node)
{
	var op = node.op in symbolTable ? symbolTable[node.op] : node.op;
	return prettyPrint(node.lhs, node) + " " + op + " " + prettyPrint(node.rhs, node);
}

function prettyPrint(node, parent)
{
	if(node == undefined) return "";
	var open = "", close = "";
	if(parent && prec(node.op) <= prec(parent.op))
	{
		open = "(";
		close = ")";
	}
	switch(node.op)
	{
		case "equivalent":
		case "implies":
		case "or":
		case "and":
			return open + prettyPrintBinary(node) + close;
		case "not":
			return open + symbolTable["not"] + prettyPrint(node.rhs, node) + close;
		case "variable":
			return node.rhs;

	}
	return str;
}