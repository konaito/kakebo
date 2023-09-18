FORMATTER=prettier
FORMATTER_OPTIONS=--write
TARGET_FILES=src/**/*.js

fmt:
	$(FORMATTER) $(FORMATTER_OPTIONS) $(TARGET_FILES)

start:
	npm start

build: fmt
	npm run build

deploy: build
	firebase deploy

commit:
	git add . && git commit -m "$(filter-out $@,$(MAKECMDGOALS))"

push: 
	git add . && git commit -m "$(filter-out $@,$(MAKECMDGOALS))" && git push

%:
	@:

.PHONY: fmt build deploy commit push
