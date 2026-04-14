---
layout: page
title: 支援・協賛
description: ロボ研の活動を支えてくださっている企業・団体・学内外の連携先を紹介します。
body_class: basic-page
kicker: Support & Sponsors
permalink: /support/
---
高専ロボコンに向けたロボット製作は、学生だけで完結するものではありません。技術提供や設備面の後押し、地域からの応援に支えられながら、ロボ研の活動は続いています。このページでは、日頃よりお力添えをいただいている皆さまを紹介します。

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
