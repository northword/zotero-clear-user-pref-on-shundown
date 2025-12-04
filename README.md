# Minimal Reproduction for Zotero Bug #5646

This repository provides a minimal reproduction case for a bug in Zotero where user-modified plugin preferences are lost when the plugin is disabled, specifically when a parent preference remains at its default value.

## Bug Description

When a Zotero plugin is disabled, user preferences that are part of a preference "branch" can be inadvertently reset. This occurs under the following specific conditions:

1.  A plugin defines two default preferences, where one is a "parent" and the other is a "child" (e.g., `feature-1` and `feature-1.option-1a`).
2.  The "parent" preference (`feature-1`) has **not** been modified by the user (it retains its default value).
3.  The "child" preference (`feature-1.option-1a`) **has** been modified by the user (it has a user-defined value).

Upon disabling the plugin, `feature-1.option-1a` is unexpectedly cleared, leading to the loss of the user's custom setting, even though it was explicitly modified.

## Reproduction Steps

Follow these steps to reproduce the bug:

1.  Install the plugin.
2.  Open plugin's settings panel.
3.  Edit the input field for "Feature 1" (corresponding to `feature-1.option-1a`), enter `111111`, and leave the checkbox (corresponding to `feature-1`) unchanged (i.e., at its default value).
4.  Disable the plugin.
5.  Re-enable the plugin.
6.  Observe that the "Feature 1" input field is cleared, while the expected behavior is for it to retain `111111`.

## Related Links

https://github.com/zotero/zotero/pull/5646
