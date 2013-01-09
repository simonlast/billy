![Billy](https://raw.github.com/simonlast/billy/master/screenshot.png)

#Billy
###Billy is a tiny, visually-oriented programming language for children.

The goal of the project is to create a very small, easy-to-understand set of features which can combine to create complex and fun interactions. 

This project was inspired by [Isla](http://github.com/maryrosecook/isla), a project by [Mary Rose Cook](http://github.com/maryrosecook).

Please fork to help out, or submit an issue if you find a bug.

Billy is released under the MIT License. See LICENSE.md for details.

#[Try it out.](http://simonlast.org/billy/)

##The Language

###Characters
Characters are represented by geometric shapes, and have attributes.

To make a new character:

	[name] is a [type]

where [name] can be any string matching [A-Za-z]+, and [type] is one of: circle, ellipse, oval, square, rectangle, or triangle.

###Attributes

Each character has several attributes, which define its appearance.

Each character has attributes x, y, left, right, top, bottom, red, green, blue, radius, size, height, and width.

###Expressions

An expression alters a character's attribute. There are two kinds of expressions: 'set' expressions, and 'move' expressions.

'Set' expressions set a characters attribute to a value, and are of the form:

	[name]'s [attribute] is [value]

'Move' expressions move a characters attribute by an offset, and are of the form:

	move [name]'s [attribute] [offset]

The "'s" can be omitted.
	
###Conditionals

Conditionals allow a user to define interactivity. A user can bind an arbitrary keyboard key to an expression. 

	when i press [key] [expression]

Once this conditional is created, whenever [key] is pressed, [expression] will be evaluated.

###Variables

A variable is a key which is bound to a number. It can be substituted anywhere a number literal is used.

	[key] is [value]

###Extras

	delete [character]
	remove [character]

removes a character from the environment

	reset
	
resets the environment, removing all characters, key bindings, and variables

	up
	
minimizes the command prompt

	down
	
maximizes the command prompt

	save
	
saves a screenshot of the canvas

###That's it!