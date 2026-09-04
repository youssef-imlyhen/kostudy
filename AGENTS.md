# Repository Agent Instructions

## Durable Workstream Continuation

Substantial work must be resumable outside the current chat/worker/runtime. Use `docs/agent-work/` for repo-owned living state and handoffs.


## Project Source of Truth

This repository participates in Youssef's cross-project source-of-truth system.

- Global project identity/routing registry: `youssef-imlyhen/ai-workspace/projects-registry/`
- Repo-owned execution memory: `docs/agent-work/`
- `MASTER_TASKS.md` is a lightweight index of resumable workstreams; it is not a replacement for the relevant living project/feature state file.
- When present, read `docs/agent-work/PROJECT_STATE.md` for the repository-level current state and `docs/agent-work/FEATURES.md` plus linked feature/workstream files for detailed feature state.

### Required behavior

1. Identify the durable `project_id` from the global registry before substantial work. Do not use a machine, sandbox, chat thread, branch, or temporary worker name as project identity.
2. Read the relevant repo-local living state/workstream file before continuing work. Historical handoffs and run notes are evidence, not competing current copies.
3. Treat ChatGPT Web, Oracle, E2B, Hyperagent, local machines, coding agents, branches, and worktrees as execution environments only. If meaningful work happens there, write the resulting state back to the canonical repo/workstream before the session ends.
4. Keep feature state explicit: `idea`, `scoped`, `active`, `blocked`, `verification`, `shipped`, `maintenance`, `paused`, or `archived`. Separately use activity temperature such as `hot`, `active`, `warm`, or `dormant` when useful.
5. Record generated assets that live outside git (S3/object storage, Oracle filesystem, E2B, Drive, etc.) with enough location/provenance to recover them. A runtime-only asset must never be the only durable record of meaningful work.
6. If a substantial project has no natural repository yet, register it globally and use `ai-workspace/docs/agent-work/standalone/` as the fallback. Code/visual artifact-heavy experiments should preferentially gain a durable home under `artifacts/projects/<project-id>/`; research/strategy/learning work may remain under `ai-workspace` until it gains a better owner.
7. Before closing a substantial session, update the living state with what changed, verified evidence, current blockers, runtime/location changes, and the exact next action.
8. Avoid two independently maintained current truths. Other dashboards (including Notion) should mirror or point to the canonical GitHub state.

If the global registry and repo-local detailed state appear inconsistent, preserve both observations, verify current repository/runtime evidence, and reconcile the registry rather than silently choosing one.
