---
layout: page
title: 支援・協賛
description: ロボ研は、技術や設備のご支援、地域からの応援を受けて活動しています。
body_class: basic-page
permalink: /support/
---
<p class="support-intro">{{ site.data.site.support.note }}</p>
<div class="sponsor-list">{% for item in site.data.site.support.companies %}<section class="sponsor"><div><p class="sponsor__category">{{ item.category }}</p><h2>{{ item.name }}</h2></div><div><p>{{ item.description }}</p><a class="text-link" href="{{ item.url }}">{{ item.url_label }}</a></div></section>{% endfor %}</div>
<section class="support-callout" aria-labelledby="support-contact"><h2 id="support-contact">ご支援に関するお問い合わせ</h2><div><p>ロボ研へのご支援について、公式XのDMでお問い合わせください。</p><a class="text-link" href="{{ '/contact/' | relative_url }}">連絡先を確認する</a></div></section>
