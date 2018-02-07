# Navbar

> Navbars are responsive meta components that serve as navigation headers for your application or site.

## Example

Contents in `collapse` slot can be collapsed (and are toggleable) in mobile views and become horizontal as the available viewport width increases.

```html
<navbar>
  <a class="navbar-brand" slot="brand" href="#">Brand</a>
  <template slot="collapse">
    <navbar-nav>
      <li class="active"><a role="button">Link <span class="sr-only">(current)</span></a></li>
      <li><a role="button">Link</a></li>
    </navbar-nav>
    <navbar-form left>
      <div class="form-group">
        <input type="text" class="form-control" placeholder="Search">
      </div>
      <btn>Submit</btn>
    </navbar-form>
    <navbar-nav right>
      <li><a role="button">Link</a></li>
      <dropdown tag="li">
        <a class="dropdown-toggle" role="button">Dropdown <span class="caret"></span></a>
        <template slot="dropdown">
          <li><a role="button">Action</a></li>
          <li><a role="button">Another action</a></li>
          <li><a role="button">Something else here</a></li>
          <li role="separator" class="divider"></li>
          <li><a role="button">Separated link</a></li>
        </template>
      </dropdown>
    </navbar-nav>
  </template>
</navbar>
<!-- navbar-example.vue -->
```

## Brand image

Replace the navbar brand with your own image by swapping the text for an `<img>`. Since the `.navbar-brand` has its own padding and height, you may need to override some CSS depending on your image.

```html
<navbar>
  <a class="navbar-brand" slot="brand" href="#">
    <img alt="Brand" style="height: 100%; width: auto" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAB+0lEQVR4AcyYg5LkUBhG+1X2PdZGaW3btm3btm3bHttWrPomd1r/2Jn/VJ02TpxcH4CQ/dsuazWgzbIdrm9dZVd4pBz4zx2igTaFHrhvjneVXNHCSqIlFEjiwMyyyOBilRgGSqLNF1jnwNQdIvAt48C3IlBmHCiLQHC2zoHDu6zG1iXn6+y62ScxY9AODO6w0pvAqf23oSE4joOfH6OxfMoRnoGUm+de8wykbFt6wZtA07QwtNOqKh3ZbS3Wzz2F+1c/QJY0UCJ/J3kXWJfv7VhxCRRV1jGw7XI+gcO7rEFFRvdYxydwcPsVsC0bQdKScngt4iUTD4Fy/8p7PoHzRu1DclwmgmiqgUXjD3oTKHbAt869qdJ7l98jNTEblPTkXMwetpvnftA0LLHb4X8kiY9Kx6Q+W7wJtG0HR7fdrtYz+x7iya0vkEtUULIzCjC21wY+W/GYXusRH5kGytWTLxgEEhePPwhKYb7EK3BQuxWwTBuUkd3X8goUn6fMHLyTT+DCsQdAEXNzSMeVPAJHdF2DmH8poCREp3uwm7HsGq9J9q69iuunX6EgrwQVObjpBt8z6rdPfvE8kiiyhsvHnomrQx6BxYUyYiNS8f75H1w4/ISepDZLoDhNJ9cdNUquhRsv+6EP9oNH7Iff2A9g8h8CLt1gH0Qf9NMQAFnO60BJFQe0AAAAAElFTkSuQmCC">
  </a>
</navbar>
<!-- navbar-image.vue -->
```

## Forms

Place form content within `<navbar-form>` for proper vertical alignment and collapsed behavior in narrow viewports. Use the alignment props `left` / `right` to decide where it resides within the navbar content.

```html
<navbar>
  <a class="navbar-brand" slot="brand" href="#">Brand</a>
  <navbar-form left>
    <div class="form-group">
      <input type="text" class="form-control" placeholder="Search">
    </div>
    <btn>Submit</btn>
  </navbar-form>
</navbar>
<!-- navbar-form.vue -->
```

## Buttons

Add the `.navbar-btn` class to `<btn>` that not residing in a `<navbar-form>` to vertically center them in the navbar.

```html
<navbar>
  <a class="navbar-brand" slot="brand" href="#">Brand</a>
  <btn class="navbar-btn">Sign in</btn>
</navbar>
<!-- navbar-button.vue -->
```

## Text

Wrap strings of text in `<navbar-text>` tag for proper leading and color.

```html
<navbar>
  <a class="navbar-brand" slot="brand" href="#">Brand</a>
  <navbar-text>Signed in as wxsm</navbar-text>
</navbar>
<!-- navbar-text.vue -->
```

## Non-nav links

For folks using standard links that are not within the regular navbar navigation component, use the `.navbar-link` class to add the proper colors for the default and inverse navbar options.

```html
<navbar>
  <a class="navbar-brand" slot="brand" href="#">Brand</a>
  <template slot="collapse">
    <navbar-text right>Signed in as <a href="#" class="navbar-link">wxsm</a></navbar-text>
  </template>
</navbar>
<!-- navbar-links.vue -->
```

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

```html
<navbar inverse>
  <a class="navbar-brand" slot="brand" href="#">Brand</a>
  <template slot="collapse">
    <navbar-nav>
      <li class="active"><a role="button">Link <span class="sr-only">(current)</span></a></li>
      <li><a role="button">Link</a></li>
    </navbar-nav>
  </template>
</navbar>
<!-- navbar-inverse.vue -->
```

# API Reference

## [Navbar](https://github.com/wxsms/uiv/blob/master/src/components/navbar/Navbar.vue)

### Props

Name           | Type       | Default  | Required | Description
------------   | ---------- | -------- | -------- | -----------------------
`v-model`      | Boolean    |          |          | Indicate the collapse status of navbar.
`fluid`        | Boolean    | true     |          | Use `.container-fluid` class in navbar container, `.container` otherwise.
`fixed-top`    | Boolean    | false    |          | Apply fixed top style.
`fixed-bottom` | Boolean    | false    |          | Apply fixed bottom style.
`static-top`   | Boolean    | false    |          | Apply static top style.
`inverse`      | Boolean    | false    |          | Apply inverse style.

### Slots

Name             | Description
---------        | -----------------------
`default`        | The navbar body (non-collapsable part).
`collapse`       | The navbar body (collapsable part).
`brand`          | The navbar brand.
`collapse-btn`   | Use this slot to override the default collapse button.

## [NavbarNav](https://github.com/wxsms/uiv/blob/master/src/components/navbar/NavbarNav.js)

### Props

Name           | Type       | Default  | Required | Description
------------   | ---------- | -------- | -------- | -----------------------
`left`         | Boolean    | false    |          | Pull content to left.
`right`        | Boolean    | false    |          | Pull content to right.

## [NavbarForm](https://github.com/wxsms/uiv/blob/master/src/components/navbar/NavbarForm.js)

### Props

Name           | Type       | Default  | Required | Description
------------   | ---------- | -------- | -------- | -----------------------
`left`         | Boolean    | false    |          | Pull content to left.
`right`        | Boolean    | false    |          | Pull content to right.

## [NavbarText](https://github.com/wxsms/uiv/blob/master/src/components/navbar/NavbarText.js)

### Props

Name           | Type       | Default  | Required | Description
------------   | ---------- | -------- | -------- | -----------------------
`left`         | Boolean    | false    |          | Pull content to left.
`right`        | Boolean    | false    |          | Pull content to right.
