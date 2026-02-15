---
title: "基于充分下降的直接搜索的梯度收敛性"
date: 2025-12-01
description: "我们证明直接搜索实现完整的梯度收敛，将经典的 liminf 结果加强为完整的极限。"
tags: ["优化", "直接搜索", "收敛性"]
coverImage: "/images/blog/grad_converge.jpg"
cardGradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
math: true
---

> **论文**: C. Huang and Z. Zhang. *Gradient convergence of direct search based on sufficient decrease*. 预印本, 2026.
>
> [PDF](/documents/grad_converge.pdf)

## 概述

本文研究了基于充分下降条件（sufficient decrease）的直接搜索方法。在标准假设下，我们将经典的收敛保证 $\liminf_{k\to\infty} \lVert\nabla f(x_k)\rVert = 0$ 提升为完整的极限 $\lim_{k\to\infty} \lVert\nabla f(x_k)\rVert = 0$。这个更强的结果意味着梯度范数沿整个序列收敛到零，而不仅仅是沿某个子序列。

## 研究动机

- **一个长期的开放问题**：直接搜索的经典理论只保证小梯度无穷多次出现（$\liminf = 0$）。这不能排除振荡——迭代点可能在平稳区域和非平稳区域之间徘徊
- **简洁性**：以往实现完整梯度收敛的结果需要额外机制（完全轮询或线搜索全局化）。我们能否仅用充分下降条件达到同样效果？
- **理论完整性**：将 $\liminf$ 提升为 $\lim$ 提供了更简洁的收敛保证

## 主要贡献

- **完整的梯度收敛**：在标准假设下（Lipschitz 连续梯度、目标函数有下界、正余弦测度），我们证明 $\lim_{k\to\infty} \lVert\nabla f(x_k)\rVert = 0$

- **最小机制**：除了充分下降条件和步长动态（$\gamma > 1$）之外，不需要额外机制

- **推广到局部 Lipschitz 梯度**：如果 $\nabla f$ 仅是局部 Lipschitz 连续的，我们证明迭代点的每个聚点都是平稳点

## 核心思想

**反证法**：假设 $\limsup_{k\to\infty} \lVert\nabla f(x_k)\rVert > 0$。基于梯度范数定义两个区域：
- 小梯度区域：$S_\leq^\epsilon = \lbrace x : \lVert\nabla f(x)\rVert \leq \epsilon\rbrace$
- 大梯度区域：$S_>^\epsilon = \lbrace x : \lVert\nabla f(x)\rVert > 2\epsilon\rbrace$

**穿越分析**：通过停时 $m_j^\epsilon$ 和 $n_j^\epsilon$ 追踪迭代点进入/离开这些区域的时刻。关键观察：

1. **几何分离**：Lipschitz 连续性保证 $\text{dist}(S_\leq^\epsilon, S_>^\epsilon) \geq \epsilon/L$，因此每次穿越至少覆盖距离 $D_j^\epsilon \geq \epsilon/L$

2. **步长动态**：在大梯度区域内，充分下降条件总是满足，因此 $\alpha_{k+1} = \gamma \alpha_k$（步长几何增长）

3. **缩放律**：第 $j$ 次穿越期间的函数下降满足
$$\Delta f_j^\epsilon \geq C \cdot (D_j^\epsilon)^p$$
其中 $C > 0$ 是某个常数（$p > 1$ 是强制函数的指数）

4. **矛盾**：由于 $f$ 有下界，$\Delta f_j^\epsilon \to 0$。但根据缩放律，这迫使 $D_j^\epsilon \to 0$，与 $D_j^\epsilon \geq \epsilon/L > 0$ 矛盾
