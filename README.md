# jean-sass

## Get started

First add `jean-sass` to your package.json's dependencies.

```sh
npm install whitecube/jean-sass
```

Once it's done, to use it you can either, run the command follwing command :

```sh
npx jean-sass install
```

OR

```sh
npx jean-sass install resources/sass
```

or use it as a more classical way by using it in your files:

```scss
@use "@whitecube/jean-sass";
@use "@whitecube/jean-sass/tools" as *;
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

These files are symply the configuration files for _jean-sass_, you can add as much as you want, for your personal use.

Here is how it is build

```scss
/*
* Import the config module to be able to merge
* your variables to the global $config array.
*/
@use "@whitecube/jean-sass/config";

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

#### Responsive variables

Some variables are responsive, to make it work, you have to set up the breakpoints in the `breakpoints.breakpoints` key in the `config/_breakpoints.scss`.

```scss
$config: (
  // …
  // 👉 Here
  "breakpoints": (
      "desktop": 1200px,
      "mobile": 640px,
    )
);
```

Then, set up the same breakpoint in the desired config file, here, `config/_typography.scss`, if the key is the same in mobile, you can just ignore it.

```scss
$config: (
  "font-sizes": (
    "desktop": (
      "h1": 64,
      "h2": 56,
      "h3": 44,
      "h4": 36,
      "h5": 24,
      "h6": 20,
      "body-single": 18,
      "body": 16,
      "body-listing": 16,
      "small-text": 14,
      "label": 12,
    ),
    "mobile": (
      "h1": 36,
      "h2": 32,
      "h3": 28,
      "h4": 24,
      "h5": 20,
      "h6": 18,
      "body-single": 16,
    ),
  ),
);
```

### Base

The `base` folder is the place where all the css vars are created and the foundation can be edited.

In `_css-vars.scss` you can find a list of mixins that creates variables based on your configuration.
In `_foundation.scss` you can set un the more global rules for your project.

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
@use "@whitecube/jean-sass/tools" as *;

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
@use "@whitecube/jean-sass/tools" as *;

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
@use "@whitecube/jean-sass/tools" as *;

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

#### `em($goal, $parent)`

Get the desired em size based on the parent size.

```scss
// Font size of 12px or 0.75em if the parent has a 16px, 1em,… font size.
.font-size {
  font-size: em(12, 16);
}
```

#### `fixedCol($col)`

Get the fixed width based of the amount of column in
specified in the first parameter. This value is calculated based on values in the `config/_typography.scss` file. The value you'll get is **unitless**, don't forget to use it with `rem()`, `em()`,… functions.

```scss
//Always import your tools here
@use "@whitecube/jean-sass/tools" as *;

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

#### `fixedGut($gut)`

Get the gutter width based of the amount of column in
specified in the first parameter. This value is calculated based on values in the `config/_typography.scss` file. The value you'll get is **unitless**, don't forget to use it with `rem()`, `em()`,… functions.

```scss
//Always import your tools here
@use "@whitecube/jean-sass/tools" as *;

// _grid.scss simple config
$config: (
  unit: 1em,
  columns: 12,
  width: 1200,
  gutter_size: 24,
);

// _your-part-file.scss
.spacer {
  // fixedGut(4) returns a unitless value, rem(), convert it into a css readable value.
  max-width: rem(fixedGut(4));
}
```

#### `gutter($parent)`

Get the desired percentage value of a **single gutter** based of the grid you set up in your `config/_grid.scss`. The first argument is the parent's column amount.

```scss
//Always import your tools here
@use "@whitecube/jean-sass/tools" as *;

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

#### `get-css-var($base, $key)`

Get the css value based on what you specified in the `base` files, for example:

```scss
// base/_css-var.scss
@include create-css-var("colors", config.get("colors"));
@include create-css-var-responsive(
  "fs",
  config.get("typography.font-sizes"),
  "rem"
);

// parts/_some part file.scss
.part {
  font-size: get-css-var("fs", "h1"); // return `font-size: var(--fs-h1);`
  color: get-css-var(
    "colors",
    "grey.100"
  ); // return `font-size: var(--colors-grey-100);`
}
```

#### `mid( $min: rem(14), $max: rem(16), $min-width: rem(320), $max-width: rem(config.get('grid.width')))`

Get a fluid size between the `$min` and `$max` values depending on the max grid width and the min width. It generate a `clamp()` type value.

```scss
//Always import your tools here
@use "@whitecube/jean-sass/tools" as *;

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

#### `rem($goal, $root)`

Get the desired `rem` size by its name as first parameter the second paremeter is the root value for `rem` units.

```scss
//Always import your tools here
@use "@whitecube/jean-sass/tools" as *;

.m {
  font-size: rem(34)
  font-size: rem(34, 16)
}
```

### Mixins

#### `aspec-ratio($width, $height)`

Add an aspect ratio to the element bu using the padding bottom technique

```scss
.ar-16-9 {
  @include aspect-ratio(16, 9);
  // OR
  @include aspect-ratio(1920, 1080);
}
```

##### Output

```css
.ar-16-9 {
  position: relative;
}

.ar-16-9::before {
  content: "";
  display: block;
  width: 100%;
  padding-bottom: 56.25%;
}
```

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

#### `create-css-var-responsive($base, $config, $unit: false)`

This mixin allows you to create css variables that are responsive. Here is how it works.

First, in the `breakpoints.breakpoints` config key in the `config/_breakpoints.scss`, you have to define your breakpoints like this:

```scss
// config/_breakpoints.scss
$config: (
  "default": "desktop",
  // 👈 Your default variables that will be use without media query
  "breakpoints": (
      "desktop": 1200px,
      // 👈 Breakpoint with px units
      "mobile": 640px,
    ),
);
```

Once it is done, you have to repeat those values in the concerned config map like so:

```scss
// config/_typography.scss
$config: (
  //...
  "font-sizes": (
      "desktop": (
        // 👈 Use your breakpoint here
        "h1": 64,
        "h2": 56,
        "h3": 44,
        //...
      ),
      "mobile": (
        // 👈 Use your breakpoint here
        "h1": 36,
        //...
      ),
    )
);
```

As you can see, no need to repeat your keys in the `mobile` key in this case if the value doesn't change.

The first parameter is the prefix, then the config and an optional unit, for now only `rem` is supported. it will generate css output like s: `--prefix-key1-key2: 'value'` of for the following config

```scss
$config: (
  "key1": (
    "desktop": (
      "key2": "value",
    ),
    "mobile": (
      "key2": "value",
    ),
  ),
);

@include create-css-var-responsive("prefix", $config);
```

Here is how to use it:

```scss
// base/_css-var.scss
:root {
  @include create-css-var-responsive(
    "fs",
    config.get("typography.font-sizes"),
    "rem"
  );
}
```

##### Output

```css
:root {
  --fs-h1: 4rem;
  --fs-h2: 3.5rem;
  --fs-h3: 2.75rem;
}
@media (max-width: 39.99em) {
  :root {
    --fs-h1: 2.25rem;
  }
}
```

#### `create-css-var($base, $config, $unit: false)`

This function loops recusively through a map to write css vars like so:

```scss
$config: (
  "grey": (
    "000": #ffffff,
    "50": #f8f9fa,
  ),
);

:root {
  @include create-css-var("colors", $config);
}
```

##### Output

```css
:root {
  --colors-grey-000: #ffffff;
  --colors-grey-50: #f8f9fa;
}
```

#### `font($name, $variant: regular, $properties: family weight style)`

Creates the necessary font-\* declarations for using the
font at the desired place.

```scss
.full-font {
  //These values have to be set up in the dont config file.
  @include font("inter", "bold");
}

.family-weight-only {
  //These values have to be set up in the dont config file.
  @include font("inter", "bold", "family" "weight");
}
```

##### Output

```css
.full-font {
  font-family: "Inter";
  font-weight: bold;
  font-style: normal;
}

.family-weight-only {
  font-family: "Inter";
  font-weight: bold;
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

### Libraries

#### Config

The config library is there to manage all jean-sass variable, to make it work properly. 4 pillars to make it work:

- the global `$config` array, which is where all jean-sass variable are stored.
- the `set($key, $value)` mixin to add values
- the `get($key)` mixin to get values
- the `merge($key, $value)` mixin to deep merge arrays of config values.

Everyone of these functions works with dotted synthax. Example, `get('grid.width')`.

##### `set($key, $value, $merge: false)`

Set values easly in the config `$array`.

```scss
@use "@whitecube/jean-sass/lib/config";

@include set("grid.unit", $value); // result => $config: (grid:(unit: $value));
@include set(
  "grid",
  (
    unit: $value,
  )
); // result => $config: (grid:(unit: $value));
@include set("grid", "nothing"); // result => $config: (grid:'nothing');
```

##### Function - `get($key)`

Get a value using the dotted synthax

```scss
font-size: set("grid.unit", $value);
```
