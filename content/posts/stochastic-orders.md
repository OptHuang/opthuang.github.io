---
title: "Notes on stochastic orders and submartingale-like assumptions for optimization"
date: 2026-02-01
description: "We show that dependent Bernoulli sequences under submartingale-like assumptions are stochastically dominated by i.i.d. benchmarks, enabling direct transfer of classical concentration inequalities."
tags: ["Optimization", "Stochastic Analysis", "Probability"]
coverImage: "/images/blog/sto_order.png"
cardGradient: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)"
math: true
---

> **Paper**: C. Huang, Z. Jiang, and Z. Zhang. *Notes on stochastic orders and submartingale-like assumptions for optimization*. In preparation, 2026.

## Overview

Submartingale-like assumptions of the form $P(Y_k = 1 \mid \mathcal{F}_{k-1}) \geq p$ are ubiquitous in the convergence analysis of randomized optimization methods. This paper establishes a clean comparison principle: any such dependent Bernoulli process is **stochastically larger** than an i.i.d. Bernoulli($p$) process in the usual stochastic order. This means that probabilistic bounds for all increasing functionals transfer directly from the simpler i.i.d. case.

## Motivation

- Submartingale-like assumptions appear in trust-region, line-search, cubic-regularization, and direct search methods. Each paper re-derives tail bounds (e.g., Hoeffding-type inequalities) from scratch using ad hoc arguments
- A natural question: can we **systematically** relate these dependent sequences to their i.i.d. counterparts, so that classical results apply immediately?

## Main Contributions

- **Stochastic domination theorem**: If $\lbrace Y_k \rbrace$ satisfies $P(Y_k = 1 \mid \mathcal{F}_{k-1}) \geq p$, then $\lbrace \tilde{Y}_k \rbrace \preceq_{\text{st}} \lbrace Y_k \rbrace$, where $\lbrace \tilde{Y}_k \rbrace$ is i.i.d. Bernoulli($p$). This holds in the usual stochastic order for stochastic processes

- **Hoeffding-type bound**:
$$P\biggl(\frac{1}{n}\sum_{k=0}^{n-1} Y_k \geq p - \varepsilon\biggr) \geq 1 - e^{-2n\varepsilon^2},$$
with the same rate as the i.i.d. case

- **Kolmogorov-type bound**:
$$P\biggl(\inf_{k \geq n} \frac{1}{k}\sum_{\ell=0}^{k-1} Y_\ell \geq p - \varepsilon\biggr) \geq 1 - e^{-2n\varepsilon^2},$$
providing uniform concentration over all future iterations

## Key Ideas

The proof leverages the **multivariate stochastic order** (Definition via upper sets in $\mathbb{R}^n$) and a component-wise comparison lemma: it suffices to show that each $Y_k$, conditioned on any realization of the past, stochastically dominates a Bernoulli($p$) variable — which is exactly what the submartingale-like assumption guarantees. The paper also explores the connection between upper sets, Alexandrov topology, and preorders, providing a unified mathematical framework.
