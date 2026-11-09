---
title: "NextEval：面向黑盒优化的 Benchmark 与 Agentic Solver"
date: 2026-11-09
description: "用有限的函数评估测试 Agent 的序贯决策能力，并让 Agent 与有状态的数值工具协同求解黑盒优化问题。"
tags: ["AI for Science", "智能体评测", "DFO"]
coverImage: "/images/blog/nexteval-bench.png"
math: false
---

当一次仿真或实验代价很高时，下一次评估应该放在哪里？**NextEval** 将这个问题同时用于优化求解和 Agent 评测：Agent 能否利用已经获得的观测，决定接下来该做什么，并在有限预算内取得更好的结果？

这是我与合作者共同开展的工作。我是项目负责人和通讯作者之一，论文 [*NextEval: An Agent-Based Solver and Benchmark for Derivative-Free Optimization*](https://arxiv.org/abs/2610.36553) 已于 2026 年 10 月 27 日在 arXiv 公开。

> **项目主页**：[NextEval](https://nexteval.github.io/)  
> **相关入口**：[Bench 与结果](https://nexteval.github.io/bench/) · [Solver](https://nexteval.github.io/solver/) · [论文](https://arxiv.org/abs/2610.36553)

## NextEval Bench：评测连续决策的能力

NextEval Bench 通过无导数优化（DFO）任务评测 Agent。Agent 面对一个黑盒目标函数，在固定的函数评估预算内获得观测、选择动作，并根据反馈继续搜索。最终表现取决于一连串决策及其相互影响。

比较不同 Agent 配置时，我们固定任务、数值工具、函数评估预算和可用信息。配置包含模型、执行框架（harness）、提示词和推理设置。Agent 可以使用观测与工具反馈，但不能访问问题名称、函数公式或已知最优解。

截至 11 月 9 日，[官网公开评测](https://nexteval.github.io/bench/#method) 使用 S2MPJ 中 92 个维度不超过 5 的无约束问题，每次运行最多进行 **50 × 维度** 次函数评估。四类任务分别考察起点扰动、观测噪声、坐标旋转和随机 NaN 评估。每类重复三次，因此一套完整配置覆盖 **1,104 个“问题 × 设置 × 重复”案例**，它们来自同一组 92 个问题。

网站提供任务矩阵、性能与数据剖面，以及逐个问题的优化历史。当前分数将每个 Agent 单独与 **COBYQA** 比较：0.500 表示与该参考求解器持平。这个分数由性能剖面计算而来，并不是胜率；具体定义和比较范围见[评测方法](https://nexteval.github.io/bench/#method)。

## NextEval Solver：Agent 决策，数值工具执行

[NextEval Solver](https://nexteval.github.io/solver/) 将 LLM Agent 与数值环境结合。Agent 选择工具、调整参数、分配每次调用的评估额度；数值方法负责计算候选点并评估目标函数。

工具支持检查搜索进展、拟合局部模型，以及执行信赖域搜索、轮询搜索、线搜索等操作。环境统一保存函数评估历史，并分别保留各数值方法的状态。因此，Agent 可以根据反馈切换方法，之后再继续之前的搜索；恢复时，环境会检查并按需更新保存的状态。

![NextEval 概览：Agent 根据观测和反馈，调用数值工具完成有限预算下的搜索。](/images/blog/nexteval-overview.png)

*配图来自[论文图 1](https://arxiv.org/html/2610.36553v1#S1.F1)。图中的目标函数地形仅用于示意，Agent 在求解时无法看到。*

## 论文结果与官网更新

论文在所测试的低维问题上，展示了 NextEval 相对于所比较的经典求解器的函数评估效率优势，并通过控制实验考察模型、推理设置和执行框架的影响。这里评价的是 Agent 与数值工具构成的完整系统；这些实验尚不能单独归因于 LLM，也没有确立在未见问题族上的泛化表现。

官网会继续更新。当前四类任务、三次重复的公开评测及其 COBYQA 配对分数，应按网站的方法说明解读，与论文中报告的实验快照分别阅读。

对我而言，NextEval 将两件感兴趣的事连接起来：构建实用的数值优化工具，以及理解 Agent 如何利用反馈作出决策。想尝试求解器，可以从 [Solver 使用指南](https://nexteval.github.io/solver/guide/) 开始；想了解评测结果和具体搜索过程，可以直接浏览 [Bench](https://nexteval.github.io/bench/)。
