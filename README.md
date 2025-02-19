# white-sass

## Get started

First add `white-sass` to your package.json's dependencies.

```json
{
  "dependencies": {
    "@whitecube/white-sass": "git@github.com:whitecube/white-sass.git" //#branch-name if needed
  }
}
```

Then, run `npm install`. Once it's done, to use it you can either, run the command follwing command :

```sh
npx white-sass install
```

or use it as a more classical way by using it in your files:

```scss
@use "@whitecube/white-sass";
@use "@whitecube/white-sass/tools" as *;
body {
  font-size: rem(1000);
}
```
