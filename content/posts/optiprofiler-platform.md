---
title: "OptiProfiler Platform: Web Sandbox for Online Benchmarking"
date: 2026-05-07
description: "Browser-based platform where users upload solvers, OptiProfiler runs benchmark() inside isolated Docker sandboxes, and results return through a FastAPI + Celery stack."
tags: ["Optimization", "Software", "Web", "Benchmarking", "DFO"]
coverImage: "/images/blog/opplatform.png"
cardGradient: "linear-gradient(135deg, #0f766e 0%, #6366f1 100%)"
math: false
---

> **Project**: Online sandbox for [**OptiProfiler**](https://www.optprof.com) — upload a solver, pick a test configuration, and let the platform run `benchmark()` in Docker with network isolation and resource limits.
>
> **Live site**: [**app.optprof.com**](https://app.optprof.com)  
> **Repository**: [**github.com/optiprofiler/optiprofiler-platform**](https://github.com/optiprofiler/optiprofiler-platform)

<div style="background: linear-gradient(135deg, #0f766e 0%, #6366f1 100%); padding: 1.5rem; border-radius: 10px; margin: 1.5rem 0;">

**🌐 Platform**: [**app.optprof.com**](https://app.optprof.com)

**📦 GitHub**: [**github.com/optiprofiler/optiprofiler-platform**](https://github.com/optiprofiler/optiprofiler-platform)

**🔗 OptiProfiler (packages & docs)**: [**www.optprof.com**](https://www.optprof.com)

</div>

## Overview

**OptiProfiler Platform** closes the loop between “I have a solver file” and “I have profiles and scores” without installing MATLAB/Python toolchains locally. The browser talks to a **FastAPI** backend: uploads are validated, tasks enter a **Celery + Redis** queue, and workers execute **OptiProfiler** inside a **Docker sandbox** (preinstalled deps, bounded CPU/memory, no open network). Results and artifacts land in structured storage; the UI tracks status, downloads bundles, and can tap **LLM-assisted** flows (Advisor chat, result interpretation, auto-debug) wired to **optiprofiler-agent**.

## Motivation

- **Lower the barrier**: Many users only need a one-off comparison; a web sandbox avoids local setup and version drift
- **Safety and fairness**: Untrusted code must not touch the host — container isolation plus **AST-based static checks** on uploads reduce obvious abuse paths
- **Operational scale**: Async jobs, retries, and quotas fit how real benchmarks behave (long runs, occasional failures)

## Main Contributions

- **End-to-end web stack** — **Next.js** frontend (`app.optprof.com`), **FastAPI** API (auth, tasks, file handling), **Celery** workers, **Redis** broker
- **Sandboxed execution** — Dedicated runner invokes `optiprofiler.benchmark()` in a constrained environment; workers use subprocess boundaries so in-task parallelism stays reliable
- **Accountability** — **GitHub OAuth** + JWT sessions, **rate limits** and **per-user task caps**, optional eviction of old runs (storage governance)
- **Agent ecosystem** — Platform ADRs describe integration with **OptiProfiler Agent**: floating **Advisor** chat, **Interpreter**-style reports on finished tasks, and **auto-debug** paths for failed runs

## Key Ideas

**Upload → validate → queue → run → store.** The architecture doc spells out the happy path: AST scan rejects unsafe patterns before a task is ever queued; the worker promotes status from `queued` to `running` to `success`, and the frontend polls while work is in flight.

**Same benchmarking semantics as local OptiProfiler.** The sandbox is not a different solver API — it runs the familiar `benchmark()` workflow so results stay comparable with desktop runs.

**Companion to the agent package.** [**OptiProfiler Agent**](/posts/optiprofiler-agent/) shines in the terminal; **Platform** targets the browser-first workflow and shared infrastructure (auth, storage, job orchestration).
