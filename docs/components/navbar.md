# Navbar

> Navbars are responsive meta components that serve as navigation headers for your application or site.

## Example

Contents in `collapse` slot can be collapsed (and are toggleable) in mobile views and become horizontal as the available viewport width increases.

<navbar-example/>

<<< @/.vitepress/components/navbar/example.vue

## Brand image

Replace the navbar brand with your own image by swapping the text for an `<img>`. Since the `.navbar-brand` has its own padding and height, you may need to override some CSS depending on your image.

<navbar-navbar-image/>

<<< @/.vitepress/components/navbar/navbar-image.vue

## Forms

Place form content within `<navbar-form>` for proper vertical alignment and collapsed behavior in narrow viewports. Use the alignment props `left` / `right` to decide where it resides within the navbar content.

<navbar-navbar-form/>

<<< @/.vitepress/components/navbar/navbar-form.vue

## Buttons

Add the `.navbar-btn` class to `<btn>` that not residing in a `<navbar-form>` to vertically center them in the navbar.

<navbar-navbar-button/>

<<< @/.vitepress/components/navbar/navbar-button.vue

## Text

Wrap strings of text in `<navbar-text>` tag for proper leading and color.

<navbar-navbar-text/>

<<< @/.vitepress/components/navbar/navbar-text.vue

## Non-nav links

For folks using standard links that are not within the regular navbar navigation component, use the `.navbar-link` class to add the proper colors for the default and inverse navbar options.

<navbar-navbar-links/>

<<< @/.vitepress/components/navbar/navbar-links.vue

## Fixed navbar

Add `fixed-top` / `fixed-bottom` to make navbar fixed.

```html
<navbar fixed-top>
  ...
</navbar>
```

Note that the fixed navbar will overlay your other content, unless you add `padding` to the top of the `<body>`. Try out your own values or use our snippet below. Tip: By default, the navbar is `50px` high.

```css
body { padding-top: 70px; }
```

Make sure to include this **after** the core Bootstrap CSS.

## Static top

Create a full-width navbar that scrolls away with the page by adding `static-top` prop.

Unlike fixed navbars, you do not need to change any padding on the `body`.

```html
<navbar static-top>
  <a class="navbar-brand" slot="brand" href="#">Brand</a>
</navbar>
<!-- navbar-static-top.vue -->
```

## Inverted navbar

Modify the look of the navbar by adding `inverse` prop.

<navbar-inverse/>

<<< @/.vitepress/components/navbar/inverse.vue

## API Reference

### [Navbar](https://github.com/uiv-lib/uiv/blob/1.x/src/components/navbar/Navbar.vue)

#### Props

Name           | Type       | Default  | Required | Description
------------   | ---------- | -------- | -------- | -----------------------
`v-model`      | Boolean    |          |          | Indicate the collapse status of navbar.
`fluid`        | Boolean    | true     |          | Use `.container-fluid` class in navbar container, `.container` otherwise.
`fixed-top`    | Boolean    | false    |          | Apply fixed top style.
`fixed-bottom` | Boolean    | false    |          | Apply fixed bottom style.
`static-top`   | Boolean    | false    |          | Apply static top style.
`inverse`      | Boolean    | false    |          | Apply inverse style.

#### Slots

Name             | Description
---------        | -----------------------
`default`        | The navbar body (non-collapsable part).
`collapse`       | The navbar body (collapsable part).
`brand`          | The navbar brand.
`collapse-btn`   | Use this slot to override the default collapse button.

### [NavbarNav](https://github.com/uiv-lib/uiv/blob/1.x/src/components/navbar/NavbarNav.js)

#### Props

Name           | Type       | Default  | Required | Description
------------   | ---------- | -------- | -------- | -----------------------
`left`         | Boolean    | false    |          | Pull content to left.
`right`        | Boolean    | false    |          | Pull content to right.

### [NavbarForm](https://github.com/uiv-lib/uiv/blob/1.x/src/components/navbar/NavbarForm.js)

#### Props

Name           | Type       | Default  | Required | Description
------------   | ---------- | -------- | -------- | -----------------------
`left`         | Boolean    | false    |          | Pull content to left.
`right`        | Boolean    | false    |          | Pull content to right.

### [NavbarText](https://github.com/uiv-lib/uiv/blob/1.x/src/components/navbar/NavbarText.js)

#### Props

Name           | Type       | Default  | Required | Description
------------   | ---------- | -------- | -------- | -----------------------
`left`         | Boolean    | false    |          | Pull content to left.
`right`        | Boolean    | false    |          | Pull content to right.
