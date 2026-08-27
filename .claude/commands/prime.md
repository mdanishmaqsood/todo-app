# Prime

Onboard to the codebase for a new session. Run this command when starting fresh to understand the project context and current work state.

## Instructions

1. Read Linear project overview and directory READMEs
2. Read current work state
3. Check Linear for incomplete issues
4. Summarize your understanding and what to do next

## Linear Project Overview

1. Read the **Project Tracking** section of `README.md` to get the list of Linear project names tracked by this repo.
2. For **each** project listed, fetch the project description using `mcp__linear-server__get_project`.
3. Find the **Directory Documentation** section in the project description. This lists all directory README paths and their purposes.
4. Read **every README listed** in the Directory Documentation section. These READMEs describe what each source directory contains and are the primary way to understand the codebase architecture.

## Read

Read these files in order:

1. **.claude/current-work.md** - Current work in progress (active issue, status, recent changes)

## Check Linear

**IMPORTANT: NEVER query for Done or Canceled issues. Only query the three states listed below.**

1. For **each** project found above, query all three states:
   - `mcp__linear-server__list_issues` with state "Backlog"
   - `mcp__linear-server__list_issues` with state "Todo"
   - `mcp__linear-server__list_issues` with state "In Progress"

Do NOT use `list_issues` without a state filter. Do NOT query for state "Done" or "Canceled".
Do NOT hardcode project names — always read them from README.md.

## Output

After reading, provide a concise summary:

1. **Project Overview**: Brief description of the project and its architecture (from Linear project description and READMEs)
2. **Current Work**: What's actively being worked on (from .claude/current-work.md)
3. **Open Issues**: List any incomplete issues (Backlog, Todo, In Progress). If none exist, state "All issues complete."
4. **Next Action**: What to do next — resume an issue with `/run <issue_id>`, or note that the workspace is idle
