FORMATTER=prettier
FORMATTER_OPTIONS=--write
TARGET_FILES=src/**/*.js

fmt:
	$(FORMATTER) $(FORMATTER_OPTIONS) $(TARGET_FILES)

build: fmt
	npm run build

deploy: build
	firebase deploy

commit:
	git add . && git commit -m "$(filter-out $@,$(MAKECMDGOALS))"

push: commit
	git push

%:
	@:

.PHONY: fmt build deploy commit push
