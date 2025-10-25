---
layout: link
title: Toolade links
---

{% assign folder_name = page.path | split: "/" | slice: 1,1 | first %}
{% assign search_path = "sites/" | append: folder_name | append: "/links/" %}
{% assign link_pages = site.pages | where_exp: "p", "p.path contains search_path" %}

{% for lp in link_pages %}
  {% assign filename = lp.path | split: "/" | last | split: "." | first %}

- [{{ page.title }} {{ filename }}]({{ lp.url }})
{% endfor %}
