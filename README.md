LogicBoar
=========

A web application that parses and analyzes logical expressions. At this point, it supports conjunction, disjunction and negation, as well as conditional implication and equivalence.  

## Current features: 

* Pretty printing (with unicode characters)
* Automatically converts phi, psi and theta to φ, ψ, θ
* Flexible plain text input support
* Displays alternate forms (currently only negative normal form)

## Features on the way:  

* Other alternative forms (DNF, CNF)
* Generating truth tables with each subexpression as column  

## Planned:  
* Refactoring the code to extract a library that deals with parsing and symbolic manipulation  
* Improving the (visual) design
* Finding a picture of a wild boar that looks like it understands logic (to use it as logo/header pic)

## Usage:  

Simply input the query as plain text. The variables can be any alphanumerical string, or phi, psi and theta. Operators can be written as:  
  
* and, &, ∧  
* or, |, ∨  
* not, !, ~, ¬  
* implies, implication, =>, ⇒  
* equivalent, equivalence, <=>, ⇔