import{_ as s,S as a,O as l,H as n}from"./chunks/framework.7a763078.js";const B=JSON.parse('{"title":"i18n","description":"","frontmatter":{},"headers":[],"relativePath":"usage/i18n.md","filePath":"usage/i18n.md","lastUpdated":1636786946000}'),p={name:"usage/i18n.md"},o=n(`<h1 id="i18n" tabindex="-1">i18n <a class="header-anchor" href="#i18n" aria-label="Permalink to &quot;i18n&quot;">​</a></h1><p>All uiv components use <code>en-US</code> as default language and they are both configurable.</p><h2 id="example" tabindex="-1">Example <a class="header-anchor" href="#example" aria-label="Permalink to &quot;Example&quot;">​</a></h2><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#BABED8;"> locale </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">uiv/src/locale/lang/zh-CN</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// ...</span></span>
<span class="line"><span style="color:#BABED8;">app</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">use</span><span style="color:#BABED8;">(uiv</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span><span style="color:#BABED8;"> locale </span><span style="color:#89DDFF;">}</span><span style="color:#BABED8;">)</span></span></code></pre></div><p>You can also create custom wordings if not satisfied with the defaults, simply create your own <code>locale</code> object and replace with the one in example code.</p><h2 id="with-vue-i18n" tabindex="-1">With <code>vue-i18n</code> <a class="header-anchor" href="#with-vue-i18n" aria-label="Permalink to &quot;With \`vue-i18n\`&quot;">​</a></h2><p>uiv is compatible with <a href="https://vue-i18n.intlify.dev/" target="_blank" rel="noreferrer">vue-i18n</a> as well.</p><p>You have to merge uiv language packs into your app&#39;s. For example:</p><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#BABED8;"> Vue </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">vue</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#BABED8;"> uiv </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">uiv</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// the desire language pack</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#BABED8;"> locale </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">uiv/src/locale/lang/zh-CN</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">createApp</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">vue</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">createI18n</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">vue-i18n</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#BABED8;"> i18n </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#82AAFF;">createI18n</span><span style="color:#BABED8;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// something vue-i18n options here ...</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#BABED8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#BABED8;"> app </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#82AAFF;">createApp</span><span style="color:#BABED8;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// something vue options here ...</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#BABED8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BABED8;">app</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">use</span><span style="color:#BABED8;">(i18n)</span></span>
<span class="line"><span style="color:#BABED8;">app</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">use</span><span style="color:#BABED8;">(uiv)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BABED8;">app</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">mount</span><span style="color:#BABED8;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">#app</span><span style="color:#89DDFF;">&#39;</span><span style="color:#BABED8;">)</span></span></code></pre></div><h2 id="supported-languages" tabindex="-1">Supported languages <a class="header-anchor" href="#supported-languages" aria-label="Permalink to &quot;Supported languages&quot;">​</a></h2><p>(Sorted by alphabet)</p><ul><li>ar-EG</li><li>bg-BG</li><li>ca-ES</li><li>cs-CZ</li><li>de-DE</li><li>en-US</li><li>es-ES</li><li>fi-FI</li><li>fr-FR</li><li>hu-HU</li><li>it-IT</li><li>ja-JP</li><li>nb-NO</li><li>nl-NL</li><li>pt-BR</li><li>ro-RO</li><li>ru-RU</li><li>sv-SE</li><li>tr-TR</li><li>zh-CN</li></ul><p>Welcome to contribute if your target language is not included:</p><ol><li>Add another language config <a href="https://github.com/uiv-lib/uiv/blob/dev/src/locale/lang" target="_blank" rel="noreferrer">here</a>;</li><li>Create a pull request.</li></ol>`,14),e=[o];function t(c,i,r,D,y,F){return a(),l("div",null,e)}const d=s(p,[["render",t]]);export{B as __pageData,d as default};
