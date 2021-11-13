<template>
  <div class="uiv">
    <navbar inverse>
      <template #brand>
        <a class="navbar-brand" href="#">Brand</a>
      </template>
      <template #collapse>
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
