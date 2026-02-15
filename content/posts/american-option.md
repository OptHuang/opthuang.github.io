---
title: "Error analysis of finite difference scheme for American option pricing under regime-switching with jumps"
date: 2023-09-01
description: "We provide a rigorous error analysis for the finite difference scheme applied to American option pricing under regime-switching models with jumps, establishing convergence rates and stability conditions."
tags: ["Numerical Analysis", "Mathematical Finance", "Option Pricing"]
coverImage: "/images/blog/american-option.jpg"
cardGradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
math: true
---

> **Paper**: C. Huang, H. Song, J. Yang, and B. Zhou. *Error analysis of finite difference scheme for american option pricing under regime-switching with jumps*. J. Comput. Appl. Math., accepted for publication, 2023.
>
> [PDF](/documents/option_pricing.pdf)

## Overview

This paper develops an efficient numerical method for pricing American options under regime-switching jump-diffusion models (Merton's and Kou's models). The problem is formulated as a free-boundary problem or complementarity problem with integral and differential terms on an unbounded domain. We propose a novel truncation technique, apply composite trapezoidal formula and finite difference schemes, and use a projection and contraction method (PCM) to solve the resulting linear complementarity problem (LCP).

## Motivation

Classical option pricing models face several limitations:
- The Black-Scholes model cannot explain asset price jumps caused by external factors
- Standard models fail to capture cyclical changes in option prices due to short-term political or economic uncertainty
- Combining regime-switching and jump-diffusion models leads to a system of coupled partial integro-differential equations (PIDEs) without closed-form solutions

Two main challenges arise:
1. The problem is a partial integro-differential equation defined on an infinite domain with integral terms over unbounded regions, requiring reasonable truncation
2. Designing a numerical scheme with complete theoretical analysis and efficient solution methods is difficult

## Main Contributions

- **Novel truncation technique**: We analyze the relation of optimal exercise boundaries among several options to localize the infinite domain problem. The left boundary condition is exact (based on permanent American option bounds), while the right boundary is relaxed.

- **Efficient discretization**: We apply a composite trapezoidal formula for integral terms (ensuring the discretized integral matrix is Toeplitz) and finite difference methods for differential terms, resulting in an LCP with numerically friendly structure.

- **Complete theoretical analysis**: We prove stability, monotonicity, and consistency of the discretization scheme, and establish error estimates of order $O(\Delta\tau + \Delta x^2)$.

- **Efficient solver**: A tailored projection and contraction method (PCM) is proposed to solve the discretized LCP, exploiting the special structure of the matrices.

- **Numerical validation**: Extensive experiments verify the theoretical results and demonstrate efficiency for both Merton's and Kou's models.

## Key Ideas

**Truncation Strategy**

We establish inequalities for option prices and optimal exercise boundaries between the original problem and two related problems (permanent American options and standard American options without regime-switching). This allows us to:
- Use the optimal exercise boundary of permanent American options as the left truncation point
- Apply an empirical estimate ($\ln 3K$) for the right truncation
- Obtain exact boundary conditions on the left and zero boundary conditions on the right

**Discretization Approach**

- **Integral terms**: Composite trapezoidal formula creates a Toeplitz structure, enabling potential FFT acceleration
- **Differential terms**: Backward Euler method in time, central difference for second-order spatial derivatives
- **Result**: An LCP in finite dimension with a positive definite coefficient matrix $B$

**Theoretical Guarantees**

- **Stability**: Solution norms are uniformly bounded for all time steps
- **Monotonicity**: The scheme is monotone and independent of mesh partitions  
- **Consistency**: Truncation error is $O(\Delta\tau + \Delta x^2)$
- **Convergence**: The numerical scheme converges to the viscosity solution

**Solution Method**

The projection and contraction method (PCM) efficiently solves the LCP at each time step by:
- Projecting onto the feasible region defined by the complementarity conditions
- Using contraction steps with adaptive step sizes
- Exploiting the structure of matrix $B$ (symmetric, positive definite, tridiagonal-block)

---

*This note is being updated. Stay tuned!*
