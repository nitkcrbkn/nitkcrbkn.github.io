---
layout: default
title: ホーム
---
# 木更津高専ロボット研究同好会
木更津高専ロボット研究同好会 公式HPです

## 記事一覧
{% for post in site.posts %}
<li>
<a href="{{ post.url | relative_url }}">
{{ post.title }}
</a>
<small>（{{ post.date | date: "%Y-%m-%d" }}）</small>
</li>
{% endfor %}
