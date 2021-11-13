<template>
  <div class="uiv">
    <navbar inverse>
      <a slot="brand" class="navbar-brand" href="#">Brand</a>
      <template slot="collapse">
        <navbar-nav>
          <li class="active">
            <a role="button">Link <span class="sr-only">(current)</span></a>
          </li>
          <li><a role="button">Link</a></li>
        </navbar-nav>
      </template>
    </navbar>
  </div>
</template>
