# Changesets

This directory contains changesets — structured descriptions of changes that will be used to version and document releases.

## How to Add a Changeset

When you make a change that should be versioned, run:

```bash
bun changeset
```

This will prompt you to:

1. Select which packages were changed
2. Choose the bump type: `patch`, `minor`, or `major`
3. Write a summary of the change

A new `.md` file is created in this folder. Commit it alongside your code changes.

## Bump Types

| Type    | When to use                                                             |
| ------- | ----------------------------------------------------------------------- |
| `patch` | Bug fixes, typo corrections, non-breaking tweaks                        |
| `minor` | New components, new features, backward-compatible additions             |
| `major` | Breaking changes (renamed props, removed components, changed CLI flags) |

## Release Flow

1. A PR is opened with code + a changeset file.
2. On merge to `main`, CI detects changesets and either:
   - Opens a "Version Packages" PR (changeset PR flow), or
   - Directly bumps the version and publishes (current script flow).

## Example Changeset File

```md
---
'@leitware/composables-cli': minor
---

Added `form-slider` and `form-switch` opinionated form components.
```

## No Changeset Needed For

- Documentation-only changes
- Internal refactors with no user-facing impact
- CI/workflow changes

For those, prefix your commit with `chore:` and skip adding a changeset.
