---
title: "无导数信赖域与直接搜索收敛的统一级数条件"
date: 2026-01-10
description: "我们提出了一个统一的级数条件来控制信赖域方法和直接搜索方法在无导数优化中的收敛性。"
tags: ["优化", "信赖域", "直接搜索", "DFO"]
coverImage: "/images/blog/series_condition.jpg"
cardGradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
math: true
---

> **论文**: C. Huang and Z. Zhang. *A unified series condition for the convergence of derivative-free trust region and direct search*. 预印本, 2026.
>
> [PDF](/documents/series_condition.pdf)

## 概述

无导数信赖域方法和直接搜索方法是无导数优化（DFO）的两大主要算法类别。尽管它们在算法上有所不同，本文揭示了一个统一的理论框架：**一个算法决定的级数的发散性控制着渐近收敛性**。具体地，我们识别出一个级数
$$H = \sum_{k=0}^\infty \prod_{\ell=0}^{k-1} \gamma^{y_\ell} \theta^{1-y_\ell},$$
其中 $\gamma \geq 1$ 和 $\theta \in (0,1)$ 是步长更新参数，$y_k \in \lbrace 0, 1\rbrace$ 指示第 $k$ 次迭代是否是"好的"（例如模型足够精确或方向集位置良好）。我们证明：**如果 $H = \infty$，则 $\liminf_{k\to\infty} \lVert\nabla f(x_k)\rVert = 0$**。

## 研究动机

- **统一视角**：信赖域方法和直接搜索方法在算法上看起来非常不同——一个构建局部模型，另一个沿有限方向探索。我们能否通过一个共同的视角分析它们的收敛性？
- **经典启发**：Zoutendijk 条件 $\sum_k (\nabla f(x_k)^T d_k)^2 / \lVert d_k\rVert^2 < \infty$ 是线搜索分析的核心。我们能否为 DFO 找到类似的级数条件？
- **确定性和随机化设置**：我们希望框架能同时处理确定性算法及其概率变体

## 主要贡献

- **统一级数条件**：证明 $H = \sum_{k=0}^\infty \prod_{\ell=0}^{k-1} \gamma^{y_\ell} \theta^{1-y_\ell}$ 发散蕴含 $\liminf_k \lVert\nabla f(x_k)\rVert = 0$，对信赖域和直接搜索方法都成立

- **信赖域应用**：对于无导数信赖域方法，当模型是全线性时 $y_k = 1$。经典收敛结果成为我们理论的推论

- **直接搜索应用**：对于基于充分下降的直接搜索，当 $\text{cm}(D_k, -\nabla f(x_k)) \geq \kappa$ 时 $y_k = 1$。我们的分析需要完全轮询假设

- **概率扩展**：当模型/方向是 $p_0$-概率好的（$p_0 = \log\theta / \log(\gamma^{-1}\theta)$）时，我们有 $H = \infty$ 几乎必然成立，从而得到几乎必然收敛

- **不完全轮询的反例**：我们构造了一个明确的例子表明完全轮询是必要的：没有它，可能 $H = \infty$ 但 $\lim_k \lVert\nabla f(x_k)\rVert = 1 \neq 0$

## 核心思想

**级数编码步长动态**：项 $\prod_{\ell=0}^{k-1} \gamma^{y_\ell} \theta^{1-y_\ell}$ 反映了步长扩张（$y_\ell = 1$ 时）和收缩（$y_\ell = 0$ 时）的累积效应。这个乘积与步长 $\alpha_k$ 成正比。

**证明策略**（反证法）：
1. 假设 $\liminf_k \lVert\nabla f(x_k)\rVert > \epsilon > 0$
2. 在好的迭代（$y_k = 1$）且步长足够小时，实现充分下降：$f(x_k) - f(x_{k+1}) \geq \zeta \lVert\nabla f(x_k)\rVert \alpha_k$
3. 对好的迭代求和，利用级数结构界定总下降量
4. $H$ 发散蕴含无穷的总下降量，与 $f$ 有下界矛盾

**为什么直接搜索需要完全轮询**：没有完全轮询，算法可能选择一个实现充分下降但浪费潜在进展的方向。反例构造的方向集同时包含最速下降方向和近乎切向的方向，但故意选择后者。这使得 $H = \infty$ 而迭代点保持在半径收敛到 1 的圆上。

**与非收敛理论的联系**：我们的级数 $H$ 与非收敛论文中研究的级数 $\hat{H}$ 相关。收敛条件（$H = \infty$）和非收敛条件（$\hat{H} < \infty$）是互补但不矛盾的——它们探测不同的算法状态。
