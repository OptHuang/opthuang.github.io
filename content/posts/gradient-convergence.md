---
title: "Gradient convergence of direct search based on sufficient decrease"
date: 2025-12-01
description: "We prove that direct search achieves full gradient convergence, strengthening the classical liminf result to the full limit."
tags: ["Optimization", "Direct Search", "Convergence"]
coverImage: "/images/blog/grad_converge.jpg"
cardGradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
math: true
---

> **Paper**: C. Huang and Z. Zhang. *Gradient convergence of direct search based on sufficient decrease*. Preprint, 2026.
>
> [PDF](/documents/grad_converge.pdf)

## Overview

This paper studies a direct-search method based on sufficient decrease for unconstrained smooth optimization. Under standard assumptions, we improve the classical guarantee $\liminf_{k\to\infty} \lVert\nabla f(x_k)\rVert = 0$ to the full limit $\lim_{k\to\infty} \lVert\nabla f(x_k)\rVert = 0$. This stronger result means the gradient norm converges to zero along the entire sequence, not just along a subsequence.

## Motivation

- **A long-standing open question**: The classical theory for direct search only guarantees that small gradients appear infinitely often ($\liminf = 0$). This does not rule out oscillation—the iterates could wander between stationary and non-stationary regions
- **Simplicity**: Previous results achieving full gradient convergence require additional mechanisms (complete polling or line-search globalization). Can we achieve the same with just sufficient decrease?
- **Theoretical completeness**: Upgrading $\liminf$ to $\lim$ provides a cleaner convergence guarantee

## Main Contributions

- **Full gradient convergence**: Under standard assumptions (Lipschitz continuous gradient, bounded below objective, positive cosine measure), we prove $\lim_{k\to\infty} \lVert\nabla f(x_k)\rVert = 0$

- **Minimal mechanism**: No additional mechanism beyond the sufficient decrease condition and step-size dynamics ($\gamma > 1$) is needed

- **Extension to locally Lipschitz gradients**: If $\nabla f$ is only locally Lipschitz continuous, we show that every accumulation point of the iterates is stationary

## Key Ideas

**Proof by contradiction**: Suppose $\limsup_{k\to\infty} \lVert\nabla f(x_k)\rVert > 0$. Define two regions based on gradient norm:
- Small gradient region: $S_\leq^\epsilon = \lbrace x : \lVert\nabla f(x)\rVert \leq \epsilon\rbrace$
- Large gradient region: $S_>^\epsilon = \lbrace x : \lVert\nabla f(x)\rVert > 2\epsilon\rbrace$

**Crossing analysis**: Track when iterates enter/exit these regions via stopping times $m_j^\epsilon$ and $n_j^\epsilon$. Key observations:

1. **Geometric separation**: Lipschitz continuity implies $\text{dist}(S_\leq^\epsilon, S_>^\epsilon) \geq \epsilon/L$, so each crossing covers at least distance $D_j^\epsilon \geq \epsilon/L$

2. **Step-size dynamics**: Inside the large gradient region, sufficient decrease is always achieved, so $\alpha_{k+1} = \gamma \alpha_k$ (step sizes grow geometrically)

3. **Scaling law**: The function decrease during crossing $j$ satisfies
$$\Delta f_j^\epsilon \geq C \cdot (D_j^\epsilon)^p$$
for some constant $C > 0$ (where $p > 1$ is the forcing function exponent)

4. **Contradiction**: Since $f$ is bounded below, $\Delta f_j^\epsilon \to 0$. But by the scaling law, this forces $D_j^\epsilon \to 0$, contradicting $D_j^\epsilon \geq \epsilon/L > 0$
