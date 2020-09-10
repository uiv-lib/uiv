<template>
  <section>
    <ul :class="navClasses" role="tablist">
      <template v-for="(tab, index) in groupedTabs">
        <dropdown v-if="tab.tabs" role="presentation" tag="li" :class="getTabClasses(tab)" v-show="!tab.hidden">
          <a class="dropdown-toggle" role="tab" href="#" @click.prevent>{{ tab.group }} <span class="caret"></span></a>
          <template slot="dropdown">
            <li v-for="subTab in tab.tabs" :class="getTabClasses(subTab,true)" v-show="!subTab.hidden">
              <a href="#" @click.prevent="select(tabs.indexOf(subTab))">{{ subTab.title }}</a>
            </li>
          </template>
        </dropdown>
        <li v-else role="presentation" :class="getTabClasses(tab)" v-show="!tab.hidden">
          <a role="tab" href="#" @click.prevent="select(tabs.indexOf(tab))" v-if="tab.$slots.title">
            <portal-target :name="tab._uid.toString()"/>
          </a>
          <a role="tab" href="#" @click.prevent="select(tabs.indexOf(tab))" v-else="tab.title"
             v-text="tab.title"></a>
        </li>
      </template>
      <li class="pull-right" v-if="!justified && $slots['nav-right']">
        <slot name="nav-right"/>
      </li>
    </ul>
    <div :class="contentClasses">
      <slot/>
    </div>
  </section>
</template>

<script src="./Tabs.js"/>
