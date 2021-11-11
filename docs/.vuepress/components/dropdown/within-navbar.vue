<template>
  <div class="uiv">
    <navbar>
      <a slot="brand" class="navbar-brand" role="button">Brand</a>
      <template slot="collapse">
        <navbar-nav>
          <dropdown tag="li">
            <a class="dropdown-toggle" role="button"
              >Dropdown 1<span class="caret"></span
            ></a>
            <template slot="dropdown">
              <li><a role="button">Action</a></li>
              <li><a role="button">Another action</a></li>
              <li><a role="button">Something else here</a></li>
              <li role="separator" class="divider"></li>
              <li><a role="button">Separated link</a></li>
            </template>
          </dropdown>
          <dropdown tag="li">
            <a class="dropdown-toggle" role="button"
              >Dropdown 2<span class="caret"></span
            ></a>
            <template slot="dropdown">
              <li><a role="button">Action</a></li>
              <li><a role="button">Another action</a></li>
              <li><a role="button">Something else here</a></li>
              <li role="separator" class="divider"></li>
              <li><a role="button">Separated link</a></li>
            </template>
          </dropdown>
        </navbar-nav>
        <navbar-nav right>
          <dropdown tag="li">
            <a class="dropdown-toggle" role="button"
              >Dropdown 3<span class="caret"></span
            ></a>
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
  </div>
</template>
