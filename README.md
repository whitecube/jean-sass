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

## How to use it

### Configuration

After running the installation script a folder `installation_path/config` with these files will be created.

- `_breakpoints.scss`
- `_colors.scss`
- `_config.scss`
- `_fonts.scss`
- `_grid.scss`
- `_typography.scss`

These files are symply the configuration files for _white-sass_, you can add as much as you want, for your personal use.

Here is how it is build

```scss
/*
* Import the config module to be able to merge
* your variables to the global $config array.
*/
@use "@whitecube/white-sass/config";

/*
* Set up your colors, transition, typography,…
* config array
*/
$config: (
  "white": white,
  "black": black,
  "grey": grey,
  "text": (
    "disabled": #cfcfcf,
  ),
);

/*
* Add your values to the config under
* the desired name, here, 'colors'
*/
@include config.merge("colors", $config);
```

### Functions

#### `col($col, $parent)`

Get the desired percentage value based of the grid you set up in your `config/_grid.scss`. The first argument is the columns amount, the second one is the parent's column width.

```html
<div class="parent">
  <div class="child"></div>
</div>
```

```scss
//Always import your tools here
@use "@whitecube/white-sass/tools" as *;

.parent {
  // The parent will take 8 columns of the grid
  width: col(8, 12);
}

.child {
  // The child will take 2 columns of the grid based
  // on the parent width which is 8 cols
  width: col(2, 8);
}
```

#### `colGut($col, $gut, $colParent, $gutParent)`

Get the desired percentage value based of the grid you set up in your `config/_grid.scss`. The first argument is the columns amount, second the gutter amount, the third one is the parent's column amount then the the parent's gutter amount.

```html
<div class="parent">
  <div class="child"></div>
</div>
```

```scss
//Always import your tools here
@use "@whitecube/white-sass/tools" as *;

.parent {
  // The parent will take 8 columns of the grid
  width: colGut(8, 7, 12, 12);
}

.child {
  // The child will take 4 columns and 3 gutters of the
  // grid based on the parent width which is 8 cols + 7 gutters
  width: colGut(4, 3, 8, 7);
}
```

#### `color($keys...)`

Get the colors based on the config, you can use it in 3 different way based on you `config/_colors.scss` file.

```scss
// _colors.scss simple config
$config: (
  "white": white,
  "black": black,
  "grey": #f5f5f5,
  "text": (
    "disabled": rebeccapurple,
  ),
);

// _your-part-file.scss
//Always import your tools here
@use "@whitecube/white-sass/tools" as *;

// Argument based synthax
.text-disabled {
  color: color("text", "disabled");
}

// Dotted synthax
.text-disabled {
  color: color("text.disabled");
}

// Still dotted synthax (simple)
.grey {
  color: color("grey");
}
```

#### `em($goal: m, $parent: m)`

Get the desired em size based on the parent size. And values written in the `config/_typography.scss` file. You can either use number values which correspond to pixels or string values that correspond to your `font-size` config.

```scss
//Always import your tools here
@use "@whitecube/white-sass/tools" as *;

// _typography.scss simple config
$config: (
  "font-sizes": (
    "l": 20,
    "m": 16,
    "s": 14,
    "xs": 12,
  ),
);

// _your-part-file.scss
// Font size of 12px or 0.75em if the parent has a 16px, 1em,… font size.
.font-size {
  font-size: em(12, 16);
  font-size: em("xs", "m");
  font-size: em("xs", 16);
}
```

#### `fixedCol($col)`

Get the fixed width based of the amount of column in
specified in the first parameter. This value is calculated based on values in the `config/_typography.scss` file. The value you'll get is **unitless**, don't forget to use it with `rem()`, `em()`,… functions.

```scss
//Always import your tools here
@use "@whitecube/white-sass/tools" as *;

// _grid.scss simple config
$config: (
  unit: 1em,
  columns: 12,
  width: 1200,
  gutter_size: 24,
);

// _your-part-file.scss
.my-container {
  // fixedCol(4) returns a unitless value, rem(), convert it into a css readable value.
  max-width: rem(fixedCol(4));
}
```

#### `gutter($parent)`

Get the desired percentage value of a **single gutter** based of the grid you set up in your `config/_grid.scss`. The first argument is the parent's column amount.

```scss
//Always import your tools here
@use "@whitecube/white-sass/tools" as *;

// _grid.scss simple config
$config: (
  unit: 1em,
  columns: 12,
  width: 1200,
  gutter_size: 24,
);

// _your-part-file.scss
.my-container {
  // 1 gutter for a parent of 4 cols
  width: gutter(4);
}
```

#### `mid( $min: rem(14), $max: rem(16), $min-width: rem(320), $max-width: rem(config.get('grid.width')))`

Get a fluid size between the `$min` and `$max` values depending on the max grid width and the min width. It generate a `clamp()` type value.

```scss
//Always import your tools here
@use "@whitecube/white-sass/tools" as *;

.m-xl {
  font-size: mid(16, 24);
}

.m-xl {
  font-size: mid(rem(16), rem(24));
}

.m-xl {
  font-size: mid("m", "xl");
}
```

#### `px($goal: m)`

Get the desired px size by its name. And values written in the `config/_typography.scss` file.

```scss
//Always import your tools here
@use "@whitecube/white-sass/tools" as *;

.m {
  font-size: px("m");
}
```

#### `rem($goal: m, $root: m)`

Get the desired `rem` size by its name as first parameter the second paremeter is the root value for `rem` units. Those values written in the `config/_typography.scss` file.

```scss
//Always import your tools here
@use "@whitecube/white-sass/tools" as *;

.m {
  font-size: rem('xl')
  font-size: rem('xl', 'm')
}
```

### Mixins

#### `clearfix([both|left|right])`

Reset float on parent-element of floated elements, the default value is `clearfix(both)`.

```scss
.clearfix {
  @include clearfix(left);
}
```

#### `clickableTransparentBg()`

Adds a transparent background-image on links for example. **REALLY USEFULL**.

```scss
.clickableTransparentBg {
  @include clickableTransparentBg();
}
```

#### `cover($offset1, $offset2, $offset3, $offset4)`

Sets an element in an absolute position, covering its relative parent. Parameters are the values from the `top`, `right`, `bottom`, `left` the parameter 's order works the same as the css `padding`, `margin`,…

```scss
.card-link {
  @include cover();
}
```

#### `font($name, $variant: regular, $properties: family weight style)`

Sets an element in an absolute position, covering its relative parent. Parameters are the values from the `top`, `right`, `bottom`, `left` the parameter 's order works the same as the css `padding`, `margin`,…

```scss
.card-link {
  //These values have to be set up in the dont config file.
  @include font("inter", "bold");
}
```

#### `grid()`

Sets an element in an absolute position, covering its relative parent. Parameters are the values from the `top`, `right`, `bottom`, `left` the parameter 's order works the same as the css `padding`, `margin`,…

```scss
.card-link {
  //These values have to be set up in the dont config file.
  @include font("inter", "bold");
}
```

#### `grid($columnColor: tomato, $gutterColor: white,$columns: config.get('grid.columns'))`

Display a pattern as background of the element to make the grid appear. You can customize the colors and grid width by changing the parameters.

```scss
.element__wrapper {
  @include grid();
}
```

#### `hidden()`

Hide an element but still make it readable for sreen readers.

```scss
.sreen-reader-only {
  @include hidden();
}
```

#### `obj-fit-cover()`

Allow you to add `object-fit: cover;` and its polyfill with the `font-family` trick.

```scss
.ofc {
  @include obj-fit-cover();
}
```

#### `resetFW()`

Cleares width and float on element.

```scss
.float {
  @include resetFW();
}
```

#### `respVideoContainer($col, $parent)`

Uses col among other properties to create a video container (iframe) for the amout of columns in a certain amount of parent-columns. With the padding bottom method to keep aspect-ratio.

```scss
.video__container {
  @include respVideoContainer();
}
```

#### `triangle($dir: right, $w: 20, $h: 20, $color: #000000)`

Creates css triangles. Use it on every element you want.

Available directions:

- topLeft
- top
- topRight
- right
- bottomRight
- bottom
- bottomLeft
- left

```scss
.element {
  @include triangle(down, 20, 40, red);
}
```

#### `visible()`

Revese the effect caused by the `hidden()` mixin.

```scss
.not-hidden-anymore {
  @include visible();
}
```
