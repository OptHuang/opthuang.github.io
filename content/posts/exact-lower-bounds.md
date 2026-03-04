---
title: "Exact lower bounds on the non-convergence probability of probabilistic direct search"
date: 2026-02-01
description: "We study the distribution of a random series arising from probabilistic direct search, revealing power-law tails, fractal structure, and exact non-convergence probability bounds."
tags: ["Optimization", "Probability", "Fractal"]
coverImage: "/images/blog/fractal.png"
cardGradient: "linear-gradient(135deg, #0c3483 0%, #a2b6df 100%)"
math: true
---

> **Paper**: C. Huang and Z. Zhang. *Exact lower bounds on the non-convergence probability of probabilistic direct search: distribution of a random series*. In preparation, 2026.

## Overview

This paper provides a deep distributional analysis of the random series
$$S = \sum_{k=0}^\infty Y_k \prod_{\ell=0}^{k-1} \gamma^{Y_\ell} \theta^{1-Y_\ell},$$
which governs the non-convergence behavior of probabilistic direct search (PDS). While the companion paper establishes that PDS fails to converge with positive probability, this work goes further: it characterizes the **exact distribution** of the failure magnitude, uncovering power-law tails, fractal geometry, and precise convergence rates.

## Motivation

- The companion paper on non-convergence of PDS provides a qualitative result (positive probability of failure) and a coarse lower bound on the non-convergence probability. Can we obtain **exact** and **structured** bounds?
- The distribution of $S$ encodes everything about how the algorithm fails: how likely, how far, and at what scales. Understanding it fully turns the binary "converge vs. not converge" verdict into a rich quantitative picture

## Main Contributions

- **Sharp phase transition**: The series $S$ converges a.s. if and only if $p > p^\ast = \log\gamma / \log(\theta^{-1}\gamma)$, matching the critical threshold in PDS convergence theory

- **Power-law tails**: The left tail satisfies $\nu((-\infty, t]) \sim t^{\log p/\log\theta} c(-\log t)$ as $t \to 0$, and the right tail satisfies $\nu((t, \infty)) \sim c_+ t^{-\alpha}$ as $t \to \infty$, where $\alpha$ solves $p\theta^\alpha + (1-p)\gamma^\alpha = 1$

- **Fractal structure**: The distribution $\nu$ is atomless and of pure type. Under a sufficient condition ($h_\mu / \lvert\chi_\mu\rvert < 1$), $\nu$ is singular continuous with Hausdorff dimension strictly less than one — the non-convergence probability concentrates on a **fractal set**

- **Convergence rates of truncated series**: Almost sure exponential convergence, exact $L^q$ geometric rates, and a CLT refinement for finite-step approximation

## Key Ideas

The random series $S$ satisfies the stochastic fixed-point equation $S \stackrel{d}{=} \gamma^Y \theta^{1-Y} S + Y$, identifying its distribution as the invariant measure of the random IFS $\lbrace x \mapsto \theta x,\; x \mapsto \gamma x + 1 \rbrace$ with probabilities $(p, 1-p)$. This connection enables the use of powerful tools from the theory of stochastic recurrence equations and iterated function systems to derive tail asymptotics, singularity conditions, and dimension formulas.

**Practical implications**: The distributional results translate into concrete guidance for PDS parameter selection — the left-tail exponent $\log p / \log\theta$ governs how fast the non-convergence probability decays, while the right-tail exponent $\alpha$ controls displacement risk.
