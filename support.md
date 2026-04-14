---
layout: page
title: 支援・協賛
description: ロボ研の活動を支えてくださっている企業・団体・学内外の連携先を紹介します。
body_class: basic-page
kicker: Support & Sponsors
permalink: /support/
---
{{ site.data.site.support.note }}

<div class="archive-grid archive-grid--support">
  {% for item in site.data.site.support.companies %}
    <article class="content-card content-card--support">
      <div class="content-card__meta">
        <span>{{ item.category }}</span>
      </div>
      <h3>{{ item.name }}</h3>
      <p>{{ item.description }}</p>
      <a class="text-link" href="{{ item.url }}" target="_blank" rel="noopener noreferrer">{{ item.url_label }}</a>
    </article>
  {% endfor %}
</div>
