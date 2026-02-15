---
title: "Non-convergence analysis of probabilistic direct search"
date: 2025-06-15
description: "We establish the non-convergence theory for probabilistic direct search, answering the question: when will your algorithm fail to converge?"
tags: ["Optimization", "Direct Search", "Probability"]
coverImage: "/images/blog/ncpds.pdf"
cardGradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
math: true
---

> **Paper**: C. Huang and Z. Zhang. *Non-convergence analysis of probabilistic direct search*. Preprint, 2026.
>
> [PDF](/documents/ncpds.pdf)

## Overview

This paper establishes the non-convergence theory for probabilistic direct search. Probabilistic direct search is a class of derivative-free optimization methods that uses randomized polling directions to improve efficiency. Existing convergence theory shows that the algorithm converges when the polling direction sets satisfy a probabilistic descent assumption. We study a natural question: **how will the algorithm behave when these assumptions are not met?** We prove that when the polling direction sets form probabilistic ascent sets, the algorithm fails to converge with positive probability.

## Motivation

- **Theoretical completeness**: Convergence analysis and non-convergence analysis are equally important. A systematic study of "when will failure occur" deepens our understanding of algorithm behavior
- **Practical guidance**: Non-convergence theory guides the selection of algorithmic parameters (such as the number of polling directions $m$)
- **A deeper question**: Are submartingale-like assumptions essential for the convergence of randomized optimization methods?

Known convergence result: the algorithm converges when $m > \log_2(1 - \log\theta/\log\gamma)$, where $m$ is the number of polling directions, $\theta$ is the shrinking factor, and $\gamma$ is the expanding factor.

**Core question**: What happens when $m < \log_2(1 - \log\theta/\log\gamma)$?

## Main Contributions

- **Non-convergence theorem**: We prove that when the polling direction sets form $p$-probabilistic ascent sets with $p > 1 - p_0$ (where $p_0 = \log\theta/\log(\gamma^{-1}\theta)$), the algorithm fails to converge to the optimal solution with positive probability

- **Explicit results for typical cases**: For polling directions uniformly distributed on the unit sphere, the algorithm is not globally convergent when $m < \log_2(1 - \log\theta/\log\gamma)$

- **Quantitative analysis**: We provide not only qualitative results (positive probability of non-convergence) but also a lower bound for the non-convergence probability with decay rate $\zeta^{\log p/\log\theta}$

- **Tightness of theory**: We construct an example showing that the probabilistic ascent assumption $p > 1 - p_0$ cannot be weakened to $p \geq 1 - p_0$

- **Extension to nonsmooth case**: We extend the results to nonsmooth convex functions using Clarke subdifferential

## Key Ideas

**Key observation**: The convergence of the algorithm is closely related to the convergence of the random series
$$\sum_{k=0}^\infty Y_k \prod_{\ell=0}^{k-1}\gamma^{Y_\ell}\theta^{1-Y_\ell},$$
where $Y_k = \mathbb{1}(\min_{d \in D_k} d^T \nabla f(X_k) < 0)$ indicates whether a descent direction is found at iteration $k$.

- If the series diverges, the iterates can move arbitrarily far
- If the series converges, the iterates are confined to a bounded region

**Analysis strategy**:
1. The probabilistic ascent assumption guarantees $P(Y_k = 0 \mid \mathcal{F}_{k-1}) \geq p$ (often failing to find a descent direction)
2. Use Chernoff bounds and random series analysis to show that the series converges with positive probability
3. Conclude that the iterates stay away from the optimal solution with positive probability

**Complete theoretical picture**:
- Convergence regime: $m > \log_2(1 - \log\theta/\log\gamma)$ → almost sure convergence
- Non-convergence regime: $m < \log_2(1 - \log\theta/\log\gamma)$ → positive probability of non-convergence
- Critical point: $m = \log_2(1 - \log\theta/\log\gamma)$ → still an open question
