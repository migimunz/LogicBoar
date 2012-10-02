
symbolTable = {
	"phi"		: "\u03C6",
	"psi"		: "\u03C8",
	"theta"		: "\u03B8",
	"and"		: "\u2227",
	"or"		: "\u2228",
	"not"		: "\u00AC",
	"implies"	: "\u21D2",
	"equivalent": "\u21D4"
}

precedenceRules = {
	"equivalent"	: 0,
	"implies" 		: 1,
	"or"  			: 3,
	"and"  			: 3,
	"not"  			: 4
}

function processQuery(str)
{
	$(".section-result").remove();
	var ast = expressions.parse(str);

	prettyPrintQuery(ast);
	printForms(ast);

	if(debug)
		printAst(ast);

	var walker = new TruthTableWalker();
	walker.walk(ast);
}

function copyAst(node)
{
	if(typeof node == "string")
		return node;
	return {
		op: node.op,
		lhs: node.lhs == null ? null : copyAst(node.lhs),
		rhs: node.rhs == null ? null : copyAst(node.rhs),
	};
}

function printAst(ast)
{
	var $debugSection = appendSection();
	var $text = $("<pre class='section-text'>").appendTo($debugSection);
	var debugAst = JSON.stringify(ast, null, "    ")
	$text.html(debugAst);
}

function printForms(ast)
{
	var nnf = expand(ast);
	var $section = appendSection("Alternate forms:");
	var $text = $("<pre class='section-text'>").appendTo($section);
	var str = "Negative normal form: " + prettyPrint(nnf) + "\n";

	$text.text(str);
}

function appendSection(title)
{
	var $section = $("<section class='section-result'></section>")
		.appendTo("#content");
	if(typeof title == "string")
		$section.append($("<div class='section-title'></div>").text(title));
	return $section;
}

function prec(op)
{
	if(op in precedenceRules)
		return precedenceRules[op];
	else
		return -1;
}



