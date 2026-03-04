---
title: "关于优化中的随机序和类下鞅假设的笔记"
date: 2026-02-01
description: "我们证明类下鞅假设下的依赖 Bernoulli 序列被 i.i.d. 基准随机占优，从而可以直接继承经典的集中不等式。"
tags: ["优化", "随机分析", "概率"]
coverImage: "/images/blog/sto_order.png"
cardGradient: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)"
math: true
---

> **论文**: C. Huang, Z. Jiang, and Z. Zhang. *Notes on stochastic orders and submartingale-like assumptions for optimization*. 准备中, 2026.

## 概述

形如 $P(Y_k = 1 \mid \mathcal{F}_{k-1}) \geq p$ 的类下鞅假设在随机优化方法的收敛分析中无处不在。本文建立了一个简洁的比较原理：任何满足此条件的依赖 Bernoulli 过程在通常随机序下**随机占优**于 i.i.d. Bernoulli($p$) 过程。这意味着所有递增泛函的概率界可以直接从更简单的 i.i.d. 情况转移过来。

## 研究动机

- 类下鞅假设出现在信赖域、线搜索、三次正则化和直接搜索方法中。每篇论文都从头推导尾部界（如 Hoeffding 型不等式），使用各自的特定论证
- 一个自然的问题：能否**系统地**将这些依赖序列与其 i.i.d. 对应物联系起来，使经典结果直接适用？

## 主要贡献

- **随机占优定理**：若 <span>$\{Y_k\}$</span> 满足 $P(Y_k = 1 \mid \mathcal{F}_{k-1}) \geq p$，则
<div>$$\{\tilde{Y}_k\} \;\preceq_{\text{st}}\; \{Y_k\},$$</div>
其中 <span>$\{\tilde{Y}_k\}$</span> 是 i.i.d. Bernoulli($p$)。这在随机过程的通常随机序意义下成立

- **Hoeffding 型界**：
$$P\biggl(\frac{1}{n}\sum_{k=0}^{n-1} Y_k \geq p - \varepsilon\biggr) \geq 1 - e^{-2n\varepsilon^2},$$
与 i.i.d. 情况具有相同的速率

- **Kolmogorov 型界**：
$$P\biggl(\inf_{k \geq n} \frac{1}{k}\sum_{\ell=0}^{k-1} Y_\ell \geq p - \varepsilon\biggr) \geq 1 - e^{-2n\varepsilon^2},$$
提供对所有未来迭代的一致集中

## 核心思想

证明利用了**多元随机序**（通过 $\mathbb{R}^n$ 中的上集定义）和逐分量比较引理：只需证明每个 $Y_k$ 在给定过去任意实现的条件下随机占优于 Bernoulli($p$) 变量 — 而这正是类下鞅假设所保证的。论文还探讨了上集、Alexandrov 拓扑和预序之间的联系，提供了一个统一的数学框架。
