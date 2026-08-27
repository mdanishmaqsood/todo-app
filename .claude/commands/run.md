# Zero-Touch Development

Automatically develop, test, review, and deploy a feature with no manual intervention.

**This is the standard entry point for all implementation work.** It orchestrates the full SDLC by calling each phase command in sequence: develop → test → review → document → deploy.

## Variables

- `feature`: $1 - Linear issue ID (e.g., "ACA-123") or feature description

## Instructions

Execute the complete development pipeline automatically.

### If Linear Issue

If `feature` looks like a Linear issue ID (e.g., "LIN-123", "ACA-42"):
1. Fetch issue details using `mcp__linear-server__get_issue`
2. Store the issue ID for commenting throughout the pipeline
3. Use issue title and description as requirements

### Pipeline Phases

Execute each phase in sequence. If a phase fails, follow the retry/stop rules below.

#### 1. DEVELOP
- Create feature branch: `feat-{issue-id}-{slug}`
- **Read and follow `.claude/commands/develop.md`** using the issue ID
- This phase fetches requirements from Linear, posts a plan comment, then implements
- **Linear Comment**: Plan posted before coding, completion posted after

#### 2. TEST
- **Read and follow `.claude/commands/test.md`** using the issue ID
- Run tests with auto-fix (up to 3 retries)
- **If tests fail after 3 retries, STOP the pipeline.** Post a failure comment to Linear and report the failure. Do not proceed to REVIEW.
- **Linear Comment**: Post test results (pass/fail counts)

#### 3. REVIEW
- **Read and follow `.claude/commands/review.md`** using the issue ID
- Review implementation against Linear issue requirements
- If blockers are found, fix them and re-review (up to 2 times)
- **If blockers remain after 2 re-reviews, STOP the pipeline.** Post a failure comment to Linear and report the failure. Do not proceed to DEPLOY.
- **Linear Comment**: Post review summary with any issues found

#### 4. DOCUMENT (MANDATORY — DO NOT SKIP)
- **This step runs BEFORE deploy so documentation is included in the same commit and PR as the feature code.**
- **Read and follow `.claude/commands/document.md`**
- Updates all directory READMEs to reflect the changes just implemented
- **Do NOT commit separately** — the README changes will be staged and committed together with the feature code in the DEPLOY step
- **Linear Comment**: Post documentation summary

#### 5. DEPLOY
- Update `.claude/current-work.md` to reflect completion (set Active Issue to "None", status to idle, summarize recent changes)
- Commit all changes (feature code + documentation) with conventional commit message
- Push branch to remote
- Create pull request
- **Wait for CI Checks:** After creating the PR, wait for all CI checks to complete:
  1. Run `gh pr checks <PR_NUMBER> --watch` to wait until all checks finish
  2. Display the check results (pass/fail) to the user
  3. **If any checks fail — auto-fix loop:**
     - Read the failure logs using `gh run view <RUN_ID> --log-failed` to identify the errors
     - Fix the errors in code
     - Commit the fixes, push to the branch
     - Wait for CI checks again with `gh pr checks <PR_NUMBER> --watch`
     - **Repeat this loop until ALL checks pass with zero errors.** Do not prompt the user until every check is green.
  4. Once all checks pass, display the final results to the user
- **STOP — User Review Gate:** Only after all CI checks pass, present the PR link to the user and use `AskUserQuestion` to ask for confirmation before merging. Offer two options:
  - **"Yes, merge it"** — Continue with merge
  - **"No, I'll review first"** — Stop and wait
- If the user approves: Auto-merge the PR (squash merge, delete branch)
- If the user declines: STOP the pipeline immediately. Do not post any Linear comments, do not take any further action. Simply stop and wait. The user can resume later by typing "continue deployment" or similar, at which point continue from the merge step onward.
- **Linear Comment**: Post final summary with branch name, PR link, and merge status

### Linear Comment Templates

Use `mcp__linear-server__create_comment` with these formats:

**TEST Results:**
```markdown
## Test Results

| Test | Status |
|------|--------|
| {test_name} | Pass / Fail |

{error details if any failures}
```

**REVIEW Summary:**
```markdown
## Review Complete

**Status:** {Approved / Changes Needed}

### Findings
{list any issues or confirm all requirements met}
```

**DEPLOY Complete:**
```markdown
## Deployed & Merged

**Branch:** `{branch_name}`
**Commit:** `{commit_hash}`
**PR:** {github_pr_link}
**Status:** Merged / Pending review

{merge_status_details}
```

**DOCUMENT Summary:**
```markdown
## Documentation Updated

**READMEs Created:** {list or "none"}
**READMEs Updated:** {list or "none"}

_README changes included in the feature commit and PR._
```

**Pipeline Failure:**
```markdown
## Pipeline Stopped

**Phase:** {TEST / REVIEW}
**Reason:** {description of failure}
**Retries:** {n} of {max}

{error details}
```

### On Completion

**IMPORTANT: Do NOT proceed to completion until DOCUMENT (step 4) and DEPLOY (step 5) have both been executed.** The pipeline is: DEVELOP → TEST → REVIEW → DOCUMENT → DEPLOY → Done.

1. Verify DOCUMENT step was completed (READMEs committed and pushed)
2. Update Linear issue status to "Done" using `mcp__linear-server__update_issue`
3. Report summary:

```
BRANCH: {branch_name}
STATUS: deployed
REMOTE: pushed
PR: {pr_url}
MERGED: yes/no
DOCS: {n} READMEs created, {n} updated
LINEAR: {issue_id} -> Done (with {n} comments)
```

The feature has been deployed, documented, and merged to main.
