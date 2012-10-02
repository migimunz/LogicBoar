
/* description: Parses logical expressions. */

/* lexical grammar */
%lex
%%

\s+                   						/* skip whitespace */
"and"|"AND"|"&"|"\u2227"		  			return '&'
"or"|"OR"|"|"|"\u2228"		 				return '|'
"!"|"~"|"not"|"NOT"|"\u00AC"   				return '~'
"implies"|"imply"|"=>"|"\u21D2"				return '=>'
"equivalent"|"equivalence"|"<=>"|"\u21D4"	return '<=>'
[a-zA-Z]+|"\u03C6"|"\u03C8"  				return 'VAR'
"("|"["                						return '('
")"|"]"                  					return ')'
<<EOF>>               						return 'EOF'

/lex

/* operator associations and precedence */

%left '<=>'
%left '=>'
%left '|'
%left '&'
%left '~'

%start expressions

%% /* language grammar */

expressions
	: e EOF
		{ return $1; }
	;

e
	: e '&' e
		{$$ = {op:'and', lhs: $1, rhs: $3};}
	| e '|' e
		{$$ = {op:'or', lhs: $1, rhs: $3};}
	| e '=>' e
		{$$ = {op:'implies', lhs: $1, rhs: $3};}
	| e '<=>' e
		{$$ = {op:'equivalent', lhs: $1, rhs: $3};}
	| '~' e
		{$$ = {op:'not', rhs: $2};}
	| '(' e ')'
		{$$ = $2}
	| VAR
		{
			var varname = $VAR.toLowerCase();
			if(varname in symbolTable)
				$$ = {op:"variable", rhs: symbolTable[varname]};
			else
				$$ = {op:"variable", rhs: $VAR};
		}
	;

