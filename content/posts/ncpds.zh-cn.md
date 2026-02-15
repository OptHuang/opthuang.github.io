---
title: "概率直接搜索的非收敛性分析"
date: 2025-06-15
description: "我们建立了概率直接搜索的非收敛理论，回答了一个关键问题：你的算法何时会失败？"
tags: ["优化", "直接搜索", "概率"]
coverImage: "/images/blog/ncpds.pdf"
cardGradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
math: true
---

> **论文**: C. Huang and Z. Zhang. *Non-convergence analysis of probabilistic direct search*. 预印本, 2026.
>
> [PDF](/documents/ncpds.pdf)

## 概述

本文建立了概率直接搜索（Probabilistic Direct Search）的非收敛理论。概率直接搜索是无导数优化的一类重要方法，通过随机化轮询方向来提高效率。现有收敛理论表明：当轮询方向集满足概率下降假设（probabilistic descent）时算法收敛。我们研究了一个自然的问题：**当这些假设不满足时，算法会如何表现？** 我们证明：当轮询方向集形成概率上升集（probabilistic ascent sets）时，算法以正概率不收敛。

## 研究动机

- **理论完整性**：收敛分析和非收敛分析同样重要。系统研究"何时失败"能加深对算法行为的理解
- **实践指导**：非收敛理论能指导算法参数（如轮询方向数量 $m$）的选择
- **更深刻的问题**：类下鞅假设（submartingale-like assumptions）是否对随机优化方法的收敛是本质的？

已知收敛结果：当 $m > \log_2(1 - \log\theta/\log\gamma)$ 时算法收敛（其中 $m$ 是轮询方向数，$\theta$ 是收缩因子，$\gamma$ 是扩张因子）。

**核心问题**：当 $m < \log_2(1 - \log\theta/\log\gamma)$ 时会发生什么？

## 主要贡献

- **非收敛定理**：证明当轮询方向集形成 $p$-概率上升集（$p > 1 - p_0$，其中 $p_0 = \log\theta/\log(\gamma^{-1}\theta)$）时，算法以正概率不收敛到最优解

- **典型情况的明确结果**：对于均匀分布在单位球面上的轮询方向，当 $m < \log_2(1 - \log\theta/\log\gamma)$ 时，算法不会全局收敛

- **定量分析**：不仅给出定性结果（正概率不收敛），还给出非收敛概率的下界，其衰减速率为 $\zeta^{\log p/\log\theta}$

- **理论紧性**：通过构造例子证明概率上升假设 $p > 1 - p_0$ 不能弱化为 $p \geq 1 - p_0$

- **扩展到非光滑情况**：使用 Clarke 次微分将结果推广到非光滑凸函数

## 核心思想

**关键观察**：算法的收敛性与随机级数
$$\sum_{k=0}^\infty Y_k \prod_{\ell=0}^{k-1}\gamma^{Y_\ell}\theta^{1-Y_\ell}$$
的收敛性紧密相关，其中 $Y_k = \mathbb{1}(\min_{d \in D_k} d^T \nabla f(X_k) < 0)$ 表示第 $k$ 次迭代是否找到下降方向。

- 如果级数发散，迭代点可以移动很远
- 如果级数收敛，迭代点被限制在有界区域内

**分析策略**：
1. 概率上升假设保证 $P(Y_k = 0 \mid \mathcal{F}_{k-1}) \geq p$（经常找不到下降方向）
2. 使用 Chernoff 界和随机级数分析证明级数以正概率收敛
3. 从而迭代点以正概率远离最优解

**完整的理论图景**：
- 收敛区间：$m > \log_2(1 - \log\theta/\log\gamma)$ → 几乎必然收敛
- 非收敛区间：$m < \log_2(1 - \log\theta/\log\gamma)$ → 以正概率不收敛
- 临界点：$m = \log_2(1 - \log\theta/\log\gamma)$ → 仍是开放问题
