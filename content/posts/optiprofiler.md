---
title: "OptiProfiler: a platform for benchmarking optimization solvers"
date: 2026-01-20
description: "We present OptiProfiler, an automated and flexible benchmarking platform for optimization solvers, with a focus on derivative-free optimization."
tags: ["Optimization", "Benchmarking", "Software", "DFO"]
coverImage: "/images/blog/optiprofiler_logo.jpg"
cardGradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
math: true
---

> **Paper**: C. Huang, T. M. Ragonneau, and Z. Zhang. *OptiProfiler: a platform for benchmarking optimization solvers*. Preprint, 2026.
>
> [PDF](/documents/optiprofiler.pdf)

<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 1.5rem; border-radius: 10px; margin: 1.5rem 0;">

**🌐 Official Website**: [**www.optprof.com**](https://www.optprof.com)

**📦 GitHub Repository**: [**github.com/optiprofiler/optiprofiler**](https://github.com/optiprofiler/optiprofiler)

</div>

## Overview

**OptiProfiler** is a benchmarking platform for optimization solvers, with a current focus on derivative-free optimization (DFO). It provides automated, flexible tools for evaluating solver performance, supporting **performance profiles**, **data profiles**, and **log-ratio profiles**. The platform enables users to benchmark their solvers on a variety of testing environments with built-in features and problem libraries, while allowing full customization.

## Motivation

- **Limited existing tools**: Despite the importance of benchmarking, existing tools for DFO are limited in automation, usability, and flexibility. The basic code from Moré and Wild (2009) is aimed at experts
- **Reproducibility**: There is a clear need for a comprehensive and user-friendly platform that facilitates reproducible and insightful benchmarking
- **Flexibility**: Researchers need to test solvers under various conditions (noise, perturbed starting points, etc.) with minimal effort

## Main Contributions

- **Automated benchmarking**: Run comprehensive benchmarks with minimal code—just one line to compare solvers:
  ```matlab
  benchmark({@fminsearch, @fminunc})
  ```

- **Rich testing environments**: Built-in features including `plain`, `noisy`, `perturbed_x0`, `truncated`, `linearly_transformed`, `random_nan`, and more

- **Multiple profile types**: Supports performance profiles, data profiles, and log-ratio profiles, with both history-based and output-based variants

- **Default problem library**: Based on CUTEst via S2MPJ (pure MATLAB/Python/Julia) and MatCUTEst (MEX interface)

- **Solver scoring**: Computes area under the curve (AUC) to quantitatively compare solvers

- **Theoretical contribution**: Proves equivalence between performance profiles and log-ratio profiles when comparing two solvers

## Key Ideas

**Testing environment = Problems + Features**

A testing environment consists of:
- **Problems**: Optimization problems from libraries like CUTEst
- **Features**: Modifications applied to problems (noise, perturbations, etc.)

**History-based vs. Output-based costs**

- **History-based**: Number of function evaluations to first reach a point passing the convergence test (measures intrinsic search efficiency)
- **Output-based**: Total evaluations if the final output passes the test (measures practical usability including stopping criterion)

**Use cases demonstrated**

1. **Benchmarking solvers**: Compare NEWUOA, Nelder-Mead, and finite-difference BFGS across multiple features
2. **Hyperparameter tuning**: Use OptiProfiler's scoring function as the objective to tune solver parameters with BOBYQA

**Future directions**

- Python, C, and Julia support
- Benchmarking gradient-based solvers
- Multi-objective optimization
- Online benchmarking platform
