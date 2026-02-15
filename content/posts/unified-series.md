---
title: "A unified series condition for the convergence of derivative-free trust region and direct search"
date: 2026-01-10
description: "We propose a unified series condition that governs the convergence of both trust-region and direct-search methods in derivative-free optimization."
tags: ["Optimization", "Trust Region", "Direct Search", "DFO"]
coverImage: "/images/blog/series_condition.jpg"
cardGradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
math: true
---

> **Paper**: C. Huang and Z. Zhang. *A unified series condition for the convergence of derivative-free trust region and direct search*. Preprint, 2026.
>
> [PDF](/documents/series_condition.pdf)

## Overview

Derivative-free trust-region and direct-search methods are two major classes of derivative-free optimization (DFO) algorithms. Despite their algorithmic differences, this paper reveals a unified theoretical framework: **the divergence of an algorithm-determined series governs asymptotic convergence**. Specifically, we identify a series
$$H = \sum_{k=0}^\infty \prod_{\ell=0}^{k-1} \gamma^{y_\ell} \theta^{1-y_\ell},$$
where $\gamma \geq 1$ and $\theta \in (0,1)$ are step-size update parameters, and $y_k \in \lbrace 0, 1\rbrace$ indicates whether iteration $k$ is "good" (e.g., the model is accurate or the direction set is well-poised). We prove: **if $H = \infty$, then $\liminf_{k\to\infty} \lVert\nabla f(x_k)\rVert = 0$**.

## Motivation

- **Unified perspective**: Trust-region methods and direct-search methods seem very different algorithmically—one builds local models, the other explores along finite directions. Can we analyze their convergence through a common lens?
- **Classical inspirations**: The Zoutendijk condition $\sum_k (\nabla f(x_k)^T d_k)^2 / \lVert d_k\rVert^2 < \infty$ is central to line-search analysis. Can we find an analogous series condition for DFO?
- **Deterministic and randomized settings**: We want a framework that handles both deterministic algorithms and their probabilistic variants

## Main Contributions

- **Unified series condition**: We prove that divergence of $H = \sum_{k=0}^\infty \prod_{\ell=0}^{k-1} \gamma^{y_\ell} \theta^{1-y_\ell}$ implies $\liminf_k \lVert\nabla f(x_k)\rVert = 0$ for both trust-region and direct-search methods

- **Trust-region application**: For derivative-free trust-region methods, $y_k = 1$ when the model is fully linear. We recover classical convergence results as corollaries

- **Direct-search application**: For direct search with sufficient decrease, $y_k = 1$ when $\text{cm}(D_k, -\nabla f(x_k)) \geq \kappa$. Our analysis requires complete polling

- **Probabilistic extension**: When models/directions are $p_0$-probabilistically good with $p_0 = \log\theta / \log(\gamma^{-1}\theta)$, we have $H = \infty$ almost surely, yielding almost sure convergence

- **Counterexample for incomplete polling**: We construct an explicit example showing that complete polling is necessary: without it, $H = \infty$ can hold while $\lim_k \lVert\nabla f(x_k)\rVert = 1 \neq 0$

## Key Ideas

**The series encodes step-size dynamics**: The term $\prod_{\ell=0}^{k-1} \gamma^{y_\ell} \theta^{1-y_\ell}$ reflects the cumulative effect of step-size expansions (when $y_\ell = 1$) and contractions (when $y_\ell = 0$). This product is proportional to the step size $\alpha_k$.

**Proof strategy** (by contradiction):
1. Assume $\liminf_k \lVert\nabla f(x_k)\rVert > \epsilon > 0$
2. On good iterations ($y_k = 1$) with small step size, sufficient decrease is achieved: $f(x_k) - f(x_{k+1}) \geq \zeta \lVert\nabla f(x_k)\rVert \alpha_k$
3. Sum over good iterations and use the series structure to bound the total decrease
4. Divergence of $H$ implies infinite total decrease, contradicting $f$ being bounded below

**Why complete polling matters for direct search**: Without complete polling, the algorithm may select a direction that achieves sufficient decrease but wastes potential progress. The counterexample constructs direction sets containing both a steepest-descent direction and a nearly-tangential direction, deliberately choosing the latter. This allows $H = \infty$ while the iterates stay on circles of radius converging to 1.

**Connection to non-convergence theory**: Our series $H$ relates to the series $\hat{H}$ studied in the non-convergence paper. Convergence ($H = \infty$) and non-convergence ($\hat{H} < \infty$) conditions are complementary but not contradictory—they probe different algorithmic regimes.
