---
title: "OptiProfiler Platform：在线基准测试沙箱平台"
date: 2026-05-07
description: "浏览器端上传求解器，在 Docker 隔离环境中运行 OptiProfiler 的 benchmark()，通过 FastAPI 与 Celery 异步任务返回结果。"
tags: ["优化", "软件", "Web", "基准测试", "DFO"]
coverImage: "/images/blog/opplatform.png"
cardGradient: "linear-gradient(135deg, #0f766e 0%, #6366f1 100%)"
math: false
---

> **项目**: 面向 [**OptiProfiler**](https://www.optprof.com) 的**在线沙箱**：用户上传求解器代码、选择测试配置，平台在 Docker 中执行 `benchmark()`，网络与资源受限，结果统一回传。
>
> **线上地址**: [**app.optprof.com**](https://app.optprof.com)  
> **代码仓库**: [**github.com/optiprofiler/optiprofiler-platform**](https://github.com/optiprofiler/optiprofiler-platform)

<div style="background: linear-gradient(135deg, #0f766e 0%, #6366f1 100%); padding: 1.5rem; border-radius: 10px; margin: 1.5rem 0;">

**🌐 平台**: [**app.optprof.com**](https://app.optprof.com)

**📦 GitHub**: [**github.com/optiprofiler/optiprofiler-platform**](https://github.com/optiprofiler/optiprofiler-platform)

**🔗 OptiProfiler（包与文档）**: [**www.optprof.com**](https://www.optprof.com)

</div>

## 概述

**OptiProfiler Platform** 把「我有一份求解器实现」到「我有性能曲线和分数」之间的路径搬到浏览器里。前端连接 **FastAPI** 后端：上传经校验后进入 **Celery + Redis** 任务队列，工作进程在 **Docker 沙箱**里运行 **OptiProfiler**（预装依赖、限制资源、隔离网络）。产物写入持久化存储；界面可查任务状态、下载打包结果，并可接入 **LLM 辅助**能力（悬浮 **Advisor** 对话、任务完成的**解读报告**、失败时的**自动调试**等），与 **optiprofiler-agent** 集成。

## 动机

- **降低门槛**：很多人只需要临时对比几款求解器；网页沙箱省掉本地环境与版本对齐成本
- **安全与可控**：不可信代码不能直接接触宿主机 —— **容器隔离**配合上传代码的 **AST 静态检查**，降低明显滥用面
- **贴合运行形态**：真实基准测试耗时长、偶发失败多；异步任务、重试与配额更符合实际运维需求

## 主要贡献

- **端到端 Web 技术栈** — **Next.js** 前端（**app.optprof.com**）、**FastAPI** API（认证、任务、文件）、**Celery** 工作者、**Redis** 消息代理
- **沙箱执行** — 独立运行器在受限环境中调用 `optiprofiler.benchmark()`；工作者侧通过子进程边界保证任务内并行策略稳定
- **账户与治理** — **GitHub OAuth** + JWT 会话、**频控**与**每用户任务上限**、旧任务淘汰等存储治理策略
- **与 Agent 协同** — 设计文档（ADR）说明如何挂载 **OptiProfiler Agent**：产品顾问对话、结果解读、失败自动调试等路径

## 核心思想

**上传 → 校验 → 入队 → 执行 → 落盘。** 架构文档描述了主路径：在任务排队前先做 AST 扫描拦截危险写法；工作者驱动状态从 `queued` 到 `running` 再到 `success`，前端在排队/执行阶段轮询。

**与本地 OptiProfiler 语义一致。** 沙箱调用的是熟悉的 `benchmark()` 工作流，结果可与桌面端运行对照。

**与 Agent 包互补。** [**OptiProfiler Agent**](/zh-cn/posts/optiprofiler-agent/) 偏向终端与嵌入式 API；**Platform** 面向浏览器优先的流程，并提供认证、存储与作业编排等共享基础设施。
