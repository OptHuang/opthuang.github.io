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

### One Problem Suite, Four Task Settings

As of November 9, the [public benchmark](https://nexteval.github.io/bench/#method) uses 92 unconstrained S2MPJ problems with at most five variables. It applies four settings to the same underlying problems:

| Task | Setting and decision |
| --- | --- |
| Perturbed starts | Move the initial point away from its standard location; adapt the search to the observations at the new starting point. |
| Noisy observations | Add noise to returned values; make progress despite uncertainty in apparent improvements. |
| Rotated coordinates | Rotate the coordinate system; search when useful directions need not align with coordinate axes. |
| Random NaN | Some evaluations return no usable value; continue searching after an unsuccessful query. |

The noisy, rotated, and random-NaN tasks also use perturbed starts. Each setting has **three repetitions with fixed seeds**, giving 276 problem-repetition cases per task. Across all four tasks, a complete configuration covers **1,104 cases**, drawn from 92 underlying problems.

Every run has a budget of **50 times the dimension**: a two-variable problem allows 100 objective evaluations; a five-variable problem allows 250. Objective calls consume this budget, while inspecting existing observations does not. Tool calls, LLM calls, tokens, and elapsed time are separate quantities. An agent can spend more reasoning effort without receiving more objective evaluations.

### What Counts as an Agent Configuration?

The public results identify the **model, harness, and reasoning effort together**. For example, a model running through Codex and the same model running through Claude Code are different configurations: conversation management, tool execution, and recovery can affect the outcome.

Matched problems and seeds make these configurations comparable under the stated protocol. Failures and timeouts remain in the evaluation denominator. A result therefore reflects both the ability to improve the objective and the ability to complete the optimization session reliably.

### How the COBYQA Pair Score Works

The current website compares each agent with **COBYQA alone**, separately on each task. Both members of a pair use a common starting value and a reference value equal to the best of that starting value and their two best achieved values. The reference is used for scoring and is not given to the agent. Noisy runs are scored using clean objective values.

For each pair, the evaluator checks ten relative-reduction tolerances, from `1e-1` through `1e-10`. It records the first evaluation that reaches each target; an unreached target has an infinite evaluation count. OptiProfiler turns these counts into performance profiles. At each tolerance, each profile's area is divided by the larger area of the pair; averaging over the ten tolerances gives `s_agent` and `s_COBYQA`.

The displayed score is:

**score = (1 + s_agent - s_COBYQA) / 2**

Thus, **0.500 means level with COBYQA**, and a higher score means a better profile-area result relative to that reference. For illustration, normalized areas of 1.0 for the agent and 0.8 for COBYQA give a score of 0.600. This does not mean the agent wins 60% of problems. The four-task mean is the arithmetic mean of the four task scores.

Adding another agent leaves an existing pair score unchanged, provided the two members' runs remain unchanged. However, different agents can have different pair-specific targets. Similar scores against COBYQA do not establish a direct head-to-head tie between those agents. The exact profile integration and scoring conventions are documented in the [methodology](https://nexteval.github.io/bench/#method).

### Reading the Results Beyond One Number

- **[Matrix](https://nexteval.github.io/bench/#matrix):** compare the four settings, filter configurations by model family or harness, and see where performance changes across tasks. Empty cells indicate unavailable results.
- **[Profiles](https://nexteval.github.io/bench/#profiles):** performance profiles show the fraction of targets reached within an evaluation-count ratio to the faster member of each pair. Data profiles instead use evaluation counts scaled by the dimension plus one. Higher curves mean more targets reached within the corresponding allowance.
- **Individual agent and task pages:** inspect each agent alongside its COBYQA reference, then look at per-problem histories. Log-ratio plots distinguish cases where the agent or COBYQA needed fewer evaluations; cases solved by only one member are marked separately.
- **[Pareto view](https://nexteval.github.io/bench/#pareto):** consider performance together with reported usage and API-equivalent cost. Some usage is estimated, so these figures should be read with their labels rather than as actual bills.

I recommend starting with task-level differences and then inspecting histories on a few problems. Small aggregate gaps can reflect repeat-to-repeat variation, and the website currently advises treating gaps below about 0.05 cautiously. The suite remains low-dimensional and public; perturbation and rotation do not guarantee that a model cannot recognize a problem. These details matter when interpreting what the benchmark measures.

## NextEval Solver: Agent Decisions, Numerical Execution

The [NextEval Solver](https://nexteval.github.io/solver/) combines an LLM agent with a numerical environment. The agent selects tools, adjusts parameters, and assigns evaluation allowances. Numerical routines compute candidate points and evaluate the objective.

Tools support inspecting progress, fitting local models, and performing searches such as trust-region steps, polling, and line search. The environment maintains a shared evaluation history and each method's numerical state. The agent can therefore change methods and later resume earlier work, with state checked and updated when needed.

![NextEval overview: an agent uses observed evaluations and numerical tools to guide a budget-limited search.](/images/blog/nexteval-overview.png)

*Overview from [Figure 1 of our paper](https://arxiv.org/html/2610.36553v1#S1.F1). The illustrated objective landscape is not visible to the agent.*

## What the Paper Establishes

The paper reports improved function-evaluation efficiency against the tested classical baselines on its low-dimensional suite. It also studies model choice, reasoning settings, and execution harnesses through controlled comparisons. These are results for complete agent-and-tool systems; they do not isolate the LLM's contribution or establish performance on unseen problem families.

The website continues to evolve beyond the paper's experiment snapshot. In particular, its four-task, three-repeat protocol and current COBYQA pair score should be read using the website's methodology, separately from the paper's reported comparisons.

For me, NextEval connects two interests: building useful numerical optimization tools and understanding how agents make decisions from feedback. The [Solver guide](https://nexteval.github.io/solver/guide/) is a starting point for using the system; the [Bench](https://nexteval.github.io/bench/) lets readers inspect the evidence.
