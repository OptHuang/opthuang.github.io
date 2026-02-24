---
title: "OptiProfiler: 优化求解器基准测试平台"
date: 2026-01-20
description: "我们介绍 OptiProfiler，一个自动化、灵活的优化求解器基准测试平台，专注于无导数优化。"
tags: ["优化", "基准测试", "软件", "DFO"]
coverImage: "/images/blog/optiprofiler_logo.jpg"
cardGradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
math: true
---

> **论文**: C. Huang, T. M. Ragonneau, and Z. Zhang. *OptiProfiler: A Platform for Benchmarking Optimization Solvers*. 预印本, 2026.
>
> [PDF](/documents/optiprofiler.pdf) | [海报 (Nonsmooth 2026)](/documents/Nonsmooth_2026_Guangzhou_poster.pdf)

<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 1.5rem; border-radius: 10px; margin: 1.5rem 0;">

**🌐 官方网站**: [**www.optprof.com**](https://www.optprof.com)

**📦 GitHub 仓库**: [**github.com/optiprofiler/optiprofiler**](https://github.com/optiprofiler/optiprofiler)

</div>

## 概述

**OptiProfiler** 是一个优化求解器基准测试平台，当前专注于无导数优化（DFO）。它提供自动化、灵活的工具来评估求解器性能，支持**性能曲线（performance profiles）**、**数据曲线（data profiles）**和**对数比曲线（log-ratio profiles）**。该平台使用户能够在多种测试环境中对求解器进行基准测试，提供内置特性和问题库，同时允许完全自定义。

## 研究动机

- **现有工具的局限性**：尽管基准测试很重要，但现有的 DFO 工具在自动化、易用性和灵活性方面存在局限。Moré 和 Wild (2009) 提供的基础代码面向专家用户
- **可重复性**：需要一个全面且用户友好的平台，以促进可重复和有洞察力的基准测试
- **灵活性**：研究人员需要在各种条件下（噪声、扰动初始点等）测试求解器，且付出最少的努力

## 主要贡献

- **自动化基准测试**：用最少的代码运行全面的基准测试——只需一行代码即可比较求解器：
  ```matlab
  benchmark({@fminsearch, @fminunc})
  ```

- **丰富的测试环境**：内置特性包括 `plain`（无修改）、`noisy`（噪声）、`perturbed_x0`（扰动初始点）、`truncated`（截断）、`linearly_transformed`（线性变换）、`random_nan`（随机 NaN）等

- **多种曲线类型**：支持性能曲线、数据曲线和对数比曲线，包括基于历史和基于输出两种变体

- **默认问题库**：基于 CUTEst，通过 S2MPJ（纯 MATLAB/Python/Julia）和 MatCUTEst（MEX 接口）提供

- **求解器评分**：计算曲线下面积（AUC）来定量比较求解器

- **理论贡献**：证明了比较两个求解器时性能曲线和对数比曲线的等价性

## 核心思想

**测试环境 = 问题 + 特性**

测试环境由以下组成：
- **问题**：来自 CUTEst 等库的优化问题
- **特性**：应用于问题的修改（噪声、扰动等）

**基于历史 vs. 基于输出的代价**

- **基于历史**：首次达到通过收敛测试的点所需的函数求值次数（衡量内在搜索效率）
- **基于输出**：如果最终输出通过测试的总求值次数（衡量包含停止准则的实际可用性）

**展示的用例**

1. **求解器基准测试**：在多种特性下比较 NEWUOA、Nelder-Mead 和有限差分 BFGS
2. **超参数调优**：使用 OptiProfiler 的评分函数作为目标，用 BOBYQA 调优求解器参数

**未来方向**

- Python、C 和 Julia 支持
- 基于梯度的求解器基准测试
- 多目标优化
- 在线基准测试平台
