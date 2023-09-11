FORMATTER=prettier

FORMATTER_OPTIONS=--write

TARGET_FILES=src/**/*.js

fmt:
	$(FORMATTER) $(FORMATTER_OPTIONS) $(TARGET_FILES)

build:fmt
	npm run build

deploy:
	firebase deploy

commit:
	git add .
	git commit -m "$(firstword $(MAKECMDGOALS))"

push:
	git add .
	git commit -m "$(firstword $(MAKECMDGOALS))"
	git push

all: build deploy

.PHONY: all fmt build deploy commit push