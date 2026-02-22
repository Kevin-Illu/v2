# MVP QA Checklist

Run this checklist on each target platform before broad MVP rollout.

## Core flows

- [ ] Create a todo with title + description.
- [ ] Create multiple todos and verify they render in the list.
- [ ] Restart app and verify todos persist.

## List + refresh behavior

- [ ] Open todo list and verify existing items load.
- [ ] Trigger list revalidation (create/update flow) and confirm UI refreshes.
- [ ] Confirm empty-state UI appears when there are no todos.

## Update + archive behavior

- [ ] Edit or update a todo and verify changes persist.
- [ ] Archive a todo and verify it no longer appears in active list.
- [ ] Confirm archived items remain archived after restart.

## Visual + UX checks

- [ ] Verify light/dark/system theme behavior.
- [ ] Verify no console errors in renderer during basic flows.
- [ ] Verify window controls/layout render correctly at minimum size.

## Packaging sanity

- [ ] Install packaged build on target OS.
- [ ] Launch packaged app successfully.
- [ ] Smoke-test create/list/archive in packaged build.
