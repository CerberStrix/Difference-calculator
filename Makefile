lint:
	npx eslint .

install:
	npm ci

test:
	NODE_OPTIONS=--experimental-vm-modules npx jest
	
test-coverage:
	npx -n --experimental-vm-modules jest --coverage
	
.PHONY: test
