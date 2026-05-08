---
title: "OptiProfiler Agent: An AI Assistant for DFO Benchmarking Workflows"
date: 2026-03-06
description: "An open-source agent system that guides users through the full OptiProfiler journey: questions, scripts, debugging, and interpreting benchmark results."
tags: ["Optimization", "Software", "AI Agent", "Benchmarking", "DFO"]
coverImage: "/images/blog/opagent.png"
cardGradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
math: false
---

> **Project**: AI agent toolkit for [**OptiProfiler**](https://www.optprof.com) — covers the full user journey of derivative-free optimization benchmarking: **ask → script → debug → interpret**.
>
> **Repository**: [**github.com/optiprofiler/optiprofiler-agent**](https://github.com/optiprofiler/optiprofiler-agent)

<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 1.5rem; border-radius: 10px; margin: 1.5rem 0;">

**📦 GitHub Repository**: [**github.com/optiprofiler/optiprofiler-agent**](https://github.com/optiprofiler/optiprofiler-agent)

**🌐 OptiProfiler (parent platform)**: [**www.optprof.com**](https://www.optprof.com)

</div>

## Overview

**OptiProfiler Agent** is a Python package and CLI built to sit on top of the OptiProfiler benchmarking stack. Instead of treating documentation as static pages only, it packages **Advisor**, **Debugger**, and **Interpreter** capabilities so users can move from “how do I benchmark these solvers?” to “here is a validated script and a readable report” in one workflow. A **unified agent** (default `opagent` with no subcommand) exposes tool use via a ReAct-style loop and routes between sub-agents automatically.

## Motivation

- **End-to-end friction**: Benchmarking involves learning APIs, writing glue code, fixing runtime errors, and reading performance profiles. Each step drops users into a different mental mode; a single conversational surface reduces context switching
- **Repeatable expertise**: OptiProfiler has rich behavior (features, profile types, solver interfaces). Encoding that knowledge in an **LLM Wiki + optional RAG** keeps answers grounded and teachable
- **Failure is normal**: Scripts break (bad parameters, environment quirks). A dedicated **debug path** that can run, patch, and retry closes the loop without manual copy-paste

## Main Contributions

- **Three specialized sub-agents**
  - **Advisor** — product Q&A, adapting solver interfaces, generating benchmark scripts (before you run)
  - **Debugger** — analyzes failures, proposes fixes, optional auto-run + retry loop (while testing)
  - **Interpreter** — reads scores and profile curves, produces structured natural-language reports (after success)

- **Unified agent** — one CLI entry (`opagent` / `optiprofiler-agent`) delegates to tools from all three; slash shortcuts such as `/debug`, `/interpret`, `/chat` keep power users fast

- **Batteries-included distribution** — `pip install optiprofiler-agent`; optional extras for **RAG** (ChromaDB + sentence-transformers), **Anthropic**, and **web search** (Tavily). `opagent init` writes a mode-`0600` `~/.opagent/.env` so provider setup stays mechanical

- **Knowledge architecture** — **LLM Wiki** layout (`knowledge/wiki/`) with two-stage RAG (index scan → vector retrieval), aligned with how humans browse concepts → API → troubleshooting

## Key Ideas

**Same package, two interfaces.** The README positions the **CLI** as primary (`opagent chat`, `opagent check`, `opagent debug`, `opagent interpret`), while the **Python API** (`AdvisorAgent`, `interpret`, `create_unified_agent`) suits embedding in larger tools.

**Provider flexibility.** Multiple LLM backends (OpenAI, Anthropic, DeepSeek, Kimi, etc.) plus **custom** OpenAI-compatible endpoints; models and base URLs can be pinned via environment variables for proxies or internal gateways.

**What this is not (today).** It is an assistant for OptiProfiler-style benchmarking workflows — not a replacement for the core OptiProfiler MATLAB/Python libraries, but a companion that shortens the path from intent to insight.
