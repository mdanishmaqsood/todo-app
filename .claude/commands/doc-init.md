# Documentation Init

Bootstrap directory-level documentation for an existing repository that has never been documented.

## Instructions

### 1. Explore the Codebase

Run `git ls-files` and build a tree view of the repository structure. Group files by directory and identify:
- Which directories contain source code
- The general architecture (monorepo, Next.js app, API + client, etc.)
- Any existing READMEs or documentation

Present the tree to the user:
```
Here's the repo structure I found:

src/
  app/
    api/
      compensation/  (3 files)
      hospitals/     (1 file)
    dashboard/       (5 files)
  lib/               (4 files)
  components/        (8 files)

Existing docs: README.md (root)
No directory-level READMEs found.
```

### 2. Confirm Directories to Document

Ask the user to confirm which directories should get READMEs. Present the list of discovered source directories and let them:
- Remove any directories they don't want documented
- Add any directories that were missed
- Confirm the final list

### 3. Link Linear Projects

1. **List existing projects**: Use `mcp__linear-server__list_projects` to show available Linear projects
2. **Ask user to select** which project(s) are tracked by this repo
3. **Ensure root README.md has a Project Tracking section**. If missing, add one:

```markdown
## Project Tracking

Linear projects tracked in this repo:
- {Project Name 1}
- {Project Name 2}
```

If the section already exists, update it with any newly selected projects.

4. **Update Linear project description**: Fetch the selected project(s) using `mcp__linear-server__get_project`. If the project already has a description, **ask the user**:

> The Linear project "{Project Name}" already has an existing description. Since directory-level READMEs now live in the repo, would you like to:
> - **Replace** — Replace the entire project description with a concise overview + Directory Documentation section (recommended if the old description duplicated what's now in READMEs)
> - **Append** — Keep the existing description and append the Directory Documentation section at the bottom

If the user chooses **Replace**, generate a new concise project description:

```markdown
# Project: {Project Name}

## Overview

{1-2 sentence summary from the root README or existing description}

## Technical Stack

{Brief bullet list of key technologies}

## Directory Documentation

READMEs maintained in the following directories:
- `path/to/dir/` — {purpose}
- ...
```

If the user chooses **Append**, preserve all existing content and add/update only the "Directory Documentation" section at the bottom.

If the project has no description, create a fresh one using the Replace format above.

### 4. Generate All READMEs

**Read and follow `.claude/commands/document.md`** to generate READMEs for all confirmed directories.

### 5. Commit

Stage and commit all new/updated files:
```
docs: Bootstrap directory-level documentation
```

Include the root README.md if the Project Tracking section was added/updated, plus all generated directory READMEs.

### 6. Report

```
## Documentation Bootstrapped

### READMEs Generated
- path/to/README.md
- path/to/README.md
- ...

### Linear Projects Linked
- {Project Name} — linked in root README.md

### Next Steps
- Documentation will auto-update via /run and /bugfix pipelines
- Run /document manually anytime to refresh all READMEs
```

## Conversation Style

- Be concise when presenting the tree — don't dump raw file lists
- Ask one question at a time (directories, then Linear projects)
- Default to documenting all source directories — user only needs to remove exceptions
