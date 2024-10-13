NAME   := "weather-widget"
DOMAIN := "atareao.es"

default:
    @just --list

build:
    @pnpm install

compile:
    @tsc || true

schemas:
    @glib-compile-schemas schemas

make:
    @just clean build compile schemas
    @cp -r assets dist/
    @cp -r icons dist/
    @cp -r schemas dist/
    @cp stylesheet.css dist/
    @cp metadata.json dist/

clean:
    @rm -rf dist
    @mkdir dist

zip:
    @rm -f ../../{{NAME}}.zip
    @just make
    @(cd dist && zip -9r ../../{{NAME}}.zip .)

