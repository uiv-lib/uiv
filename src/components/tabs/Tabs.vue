<template>
  <section>
    <ul :class="navClasses" role="tablist">
      <template v-for="(tab, index) in groupedTabs">
        <dropdown
          v-if="tab.tabs"
          v-show="!tab.hidden"
          :key="index"
          role="presentation"
          tag="li"
          :class="getTabClasses(tab)"
        >
          <a class="dropdown-toggle" role="tab" href="#" @click.prevent
            >{{ tab.group }} <span class="caret"></span
          ></a>
          <template slot="dropdown">
            <li
              v-for="(subTab, j) in tab.tabs"
              v-show="!subTab.hidden"
              :key="j"
              :class="getTabClasses(subTab, true)"
            >
              <a href="#" @click.prevent="select(tabs.indexOf(subTab))">{{
                subTab.title
              }}</a>
            </li>
          </template>
        </dropdown>
        <li
          v-else
          v-show="!tab.hidden"
          :key="index"
          role="presentation"
          :class="getTabClasses(tab)"
        >
          <portal-target
            v-if="tab.$slots.title"
            :name="tab._uid.toString()"
            tag="a"
            role="tab"
            href="#"
            @click.native.prevent="select(tabs.indexOf(tab))"
          />
          <a
            v-else
            role="tab"
            href="#"
            @click.prevent="select(tabs.indexOf(tab))"
            v-text="tab.title"
          ></a>
        </li>
      </template>
      <li v-if="!justified && $slots['nav-right']" class="pull-right">
        <slot name="nav-right" />
      </li>
    </ul>
    <div :class="contentClasses">
      <slot />
    </div>
  </section>
</template>

<script src="./Tabs.js" />
