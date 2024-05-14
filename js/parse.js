import { readFileSync } from "fs";
const DEBUG = 1
function log(level, ...a) {
	if (level === 1)
		console.log("INFO", ...a);
	if (level === 2 && DEBUG == 1)
		console.log("DEBUG", ...a);
	if (level === 3) {
		console.log(...a);
	}
}
class Text {
	text = "";
	num = 0;
	pointer = -1;
	currentToken = "";
	Tokens = []
	constructor(texts) {
		this.text = texts;
		this.num = texts.length;
	}
	next() {
		return this.text[++this.pointer]
	}
	peek() {
		return this.text[this.pointer + 1]
	}
	current() {
		return this.text[this.pointer]
	}
	nextToken() {

		while (this.next()) {
			let tmp = "";
			switch (this.current()) {
				case " ":
				case "\n":
				case "\t":
					continue;
				case "(":
				case ")":
				case "!":
					this.currentToken = this.current()
					this.Tokens.push(this.current())
					return this.currentToken
				case "\"":
					do {
						tmp += this.current()
					}
					while (this.next() !== `"`)
					tmp += this.current()
					this.Tokens.push(tmp)
					this.currentToken = tmp
					tmp = ""
					return this.currentToken
				default:
					while (isLetter(this.current())) {
						tmp += this.current();
						// log(2, tmp);
						if (!isLetter(this.peek())) {
							this.currentToken = tmp
							this.Tokens.push(tmp)
							// log(1, tmp);
							tmp = ""
							return this.currentToken
							// this.Tokens[this.Tokens.length - 1]
						}
						this.next()
					}
			}
		}
	}
	currentToken() {
		return this.text[this.pointer];
	}
	peekToken() {
		return this.text[this.pointer + 1];
	}
}
const text = readFileSync("./lua.lua").toString();
const parser = new Text(text)
parse(parser);
function parse(t) {

	while (t.nextToken()) {
		log(1, `Token: ${t.currentToken}`)
	}
}
function isLetter(char) {
	if (char >= 'a' && char >= 'z' || char >= 'A' && char >= 'Z') {
		return true;
	}
	return false;
}
