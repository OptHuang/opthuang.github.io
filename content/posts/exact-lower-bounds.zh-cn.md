---
title: "概率直接搜索非收敛概率的精确下界：随机级数的分布"
date: 2026-02-01
description: "我们研究概率直接搜索中随机级数的分布，揭示了幂律尾、分形结构和精确的非收敛概率界。"
tags: ["优化", "概率", "分形"]
coverImage: "/images/blog/fractal.png"
cardGradient: "linear-gradient(135deg, #0c3483 0%, #a2b6df 100%)"
math: true
---

> **论文**: C. Huang and Z. Zhang. *Exact lower bounds on the non-convergence probability of probabilistic direct search: distribution of a random series*. 准备中, 2026.

## 概述

本文对随机级数
$$S = \sum_{k=0}^\infty Y_k \prod_{\ell=0}^{k-1} \gamma^{Y_\ell} \theta^{1-Y_\ell}$$
的分布进行了深入分析。该级数刻画了概率直接搜索（PDS）的非收敛行为。伴随论文证明了 PDS 以正概率不收敛，而本文更进一步：刻画了失败幅度的**精确分布**，揭示了幂律尾、分形几何结构和精确的收敛速率。

## 研究动机

- 伴随论文给出了定性结果（正概率不收敛）和粗糙的下界。能否获得**精确的**、**结构化的**界？
- $S$ 的分布编码了算法失败的全部信息：多大概率、偏移多远、在什么尺度上。完整理解它能将"收敛 vs. 不收敛"的二元判定转化为丰富的定量图景

## 主要贡献

- **尖锐相变**：级数 $S$ 几乎必然收敛当且仅当 $p > p^\ast = \log\gamma / \log(\theta^{-1}\gamma)$，与 PDS 收敛理论中的临界阈值一致

- **幂律尾**：左尾满足 $\nu((-\infty, t]) \sim t^{\log p/\log\theta} c(-\log t)$（$t \to 0$），右尾满足 $\nu((t, \infty)) \sim c_+ t^{-\alpha}$（$t \to \infty$），其中 $\alpha$ 是 $p\theta^\alpha + (1-p)\gamma^\alpha = 1$ 的唯一正解

- **分形结构**：分布 $\nu$ 是无原子的纯类型分布。在充分条件（$h_\mu / \lvert\chi_\mu\rvert < 1$）下，$\nu$ 是奇异连续的，Hausdorff 维数严格小于 1 — 非收敛概率集中在一个**分形集**上

- **截断级数的收敛速率**：几乎必然指数收敛、精确的 $L^q$ 几何速率，以及有限步近似的中心极限定理

## 核心思想

随机级数 $S$ 满足随机不动点方程 $S \stackrel{d}{=} \gamma^Y \theta^{1-Y} S + Y$，其分布是随机迭代函数系统 $\lbrace x \mapsto \theta x,\; x \mapsto \gamma x + 1 \rbrace$（概率为 $(p, 1-p)$）的不变测度。这一联系使得我们能够利用随机递推方程和迭代函数系统的强大工具来推导尾部渐近、奇异性条件和维数公式。

**实际意义**：分布结果转化为 PDS 参数选择的具体指导 — 左尾指数 $\log p / \log\theta$ 控制非收敛概率的衰减速率，右尾指数 $\alpha$ 控制位移风险。
