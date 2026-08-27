# Document

Generate or update directory-level README files for all source directories in the repository.

## Instructions

### 1. Discover Source Directories

Run `git ls-files` to get all tracked files. Group them by their parent directory. Exclude directories that are tooling/config only:
- `.claude/`
- `public/`
- `node_modules/`
- `.next/`
- `.git/`
- Any directory that only contains config files (e.g., root-level `package.json`, `tsconfig.json`, etc.)

A directory is a "source directory" if it contains at least one source file (`.ts`, `.tsx`, `.js`, `.jsx`, `.py`, `.sql`, `.css`, `.md` inside `src/` or `app/`, etc.). Use your judgment — the goal is to document directories where developers write and maintain code or content.

Include nested directories (e.g., `src/app/api/compensation/`) as their own entries if they contain source files.

**Do NOT hardcode directory paths.** Discover them dynamically from `git ls-files` output.

### 2. Generate/Update README for Each Directory

For each source directory, create or update a `README.md` with this format:

```markdown
# {DirectoryName}

{One sentence describing what this directory contains and its purpose.}

## Files

| File | Description |
|------|-------------|
| `filename.ts` | One-line description of what this file does |
| `filename.tsx` | One-line description of what this file does |
```

**Rules:**
- Read every file in the directory to write accurate descriptions
- Keep descriptions concise — one sentence for purpose, one line per file
- No code examples, no boilerplate, no usage instructions
- List only files, not subdirectories (subdirectories get their own READMEs)
- If a README already exists, **preserve any manually-added sections** (anything below the Files table that isn't auto-generated). Replace only the purpose sentence and Files table.
- Sort files alphabetically in the table

### 3. Skip Directories That Don't Need READMEs

Skip a directory if:
- It contains only a single `index.ts`/`index.js` re-export file
- It contains only config files (`.json`, `.config.js`, `.config.ts`)
- It's a test directory with only test files (document these inline)
- It already has an up-to-date README that matches the current files

### 4. Update Linear Project Description

After generating READMEs:

1. Read the repo's root `README.md` and find the **Project Tracking** section
2. Extract the Linear project name listed there
3. Fetch that project using `mcp__linear-server__get_project`
4. Update the project description using `mcp__linear-server__update_project` to append/update a section listing all README paths:

```markdown
## Directory Documentation

READMEs maintained in the following directories:
- `src/app/` — {purpose}
- `src/lib/` — {purpose}
- ...
```

If the project description already has a "Directory Documentation" section, replace it. Preserve all other content in the description.

### 5. Report

After completion, output a summary:

```
## Documentation Updated

### READMEs Created
- path/to/new/README.md

### READMEs Updated
- path/to/updated/README.md

### Skipped Directories
- path/to/skipped/ (reason)

### Linear
- Updated project "{project_name}" description with {n} directory entries
```
