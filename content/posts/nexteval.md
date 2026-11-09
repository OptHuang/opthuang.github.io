---
title: "NextEval: A Benchmark and Agentic Solver for Black-Box Optimization"
date: 2026-11-09
description: "Our benchmark tests how agents use limited function evaluations; our solver combines agent decisions with stateful numerical tools."
tags: ["AI for Science", "Agent Evaluation", "DFO"]
coverImage: "/images/blog/nexteval-bench.png"
math: false
---

When a simulation or experiment is expensive, choosing the next evaluation matters. **NextEval** brings this question to both optimization and agent evaluation: how well can an agent use the observations it has already collected to decide what to do next?

This is joint work with my collaborators. I am one of the project leads and corresponding authors of [*NextEval: An Agent-Based Solver and Benchmark for Derivative-Free Optimization*](https://arxiv.org/abs/2610.36553), released on arXiv on October 27, 2026.

> **Project**: [NextEval](https://nexteval.github.io/)  
> **Explore**: [Bench and results](https://nexteval.github.io/bench/) · [Solver](https://nexteval.github.io/solver/) · [Paper](https://arxiv.org/abs/2610.36553)

## NextEval Bench: Evaluating Sequential Decisions

NextEval Bench tests agents through derivative-free optimization (DFO). An agent interacts with an opaque objective, observes the results of its queries, and chooses further actions within a fixed function-evaluation budget. This makes progress depend on a sequence of decisions and their feedback.

For comparisons between agent configurations, we hold tasks, numerical tools, evaluation budgets, and permitted information fixed. A configuration includes the model, execution harness, prompts, and inference settings. The agent receives observations and tool feedback; problem identities, formulas, and known optima are withheld.

As of November 9, the [public benchmark](https://nexteval.github.io/bench/#method) uses 92 unconstrained S2MPJ problems with at most five variables. Each run has a budget of **50 times the dimension**. Four task settings cover perturbed starts, noisy observations, rotated coordinates, and random NaN evaluations. With three repetitions per setting, a complete configuration covers **1,104 problem-setting-repetition cases**, drawn from the same 92 problems.

The website provides a task matrix, performance and data profiles, and individual optimization histories. Its current score compares each agent with **COBYQA**: 0.500 means level with that reference. It is a profile-based score, not a win rate. The [methodology page](https://nexteval.github.io/bench/#method) explains the calculation and comparison limits.

## NextEval Solver: Agent Decisions, Numerical Execution

The [NextEval Solver](https://nexteval.github.io/solver/) combines an LLM agent with a numerical environment. The agent selects tools, adjusts parameters, and assigns evaluation allowances. Numerical routines compute candidate points and evaluate the objective.

Tools support inspecting progress, fitting local models, and performing searches such as trust-region steps, polling, and line search. The environment maintains a shared evaluation history and each method's numerical state. The agent can therefore change methods and later resume earlier work, with state checked and updated when needed.

![NextEval overview: an agent uses observed evaluations and numerical tools to guide a budget-limited search.](/images/blog/nexteval-overview.png)

*Overview from [Figure 1 of our paper](https://arxiv.org/html/2610.36553v1#S1.F1). The illustrated objective landscape is not visible to the agent.*

## What the Paper Establishes

The paper reports improved function-evaluation efficiency against the tested classical baselines on its low-dimensional suite. It also studies model choice, reasoning settings, and execution harnesses through controlled comparisons. These are results for complete agent-and-tool systems; they do not isolate the LLM's contribution or establish performance on unseen problem families.

The website continues to evolve beyond the paper's experiment snapshot. In particular, its four-task, three-repeat protocol and current COBYQA pair score should be read using the website's methodology, separately from the paper's reported comparisons.

For me, NextEval connects two interests: building useful numerical optimization tools and understanding how agents make decisions from feedback. The [Solver guide](https://nexteval.github.io/solver/guide/) is a starting point for using the system; the [Bench](https://nexteval.github.io/bench/) lets readers inspect the evidence.
