FLAGS = -O3
start: build
	@echo 124 | ./build/compiler ./lua.lua
build:
	mkdir build
	gcc $(FLAGS) -o ./build/compiler ./src/compiler.c
clean:
	rm -rf build
