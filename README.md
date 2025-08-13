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

### Function

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

### `color($keys...)`

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
