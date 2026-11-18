# SkyFire Sprint Operating Agreement
**Status:** Approved by product owner in planning discussion, November 12, 2026
**Applies:** SkyFire Safety Library from the next sprint onward
**Roles:** Product Owner (scope, vision, acceptance, release decision); CTO (implementation, engineering decisions, internal QA, delivery and closeout execution)
**Supersedes:** The high-touch, issue-by-issue approval practice used during v0.17. Retains existing source-quality, offline, scope and release-control rules.

## 1. Sprint planning and authorization
- Start with product/operational strategy and a prioritized backlog review; do not automatically pull every open issue into the next sprint.
- Prefer **one coherent outcome/theme**, generally **one principal deliverable plus zero to two tightly related supporting items**; a single substantial issue may be an entire sprint.
- Before opening, the CTO gathers essential missing functional, regulatory, security, data, architecture, UX, cross-device and acceptance requirements **as a consolidated planning discussion**, minimizing follow-up questions.
- Record the approved issue set, outcome, acceptance criteria, dependencies, explicit exclusions, sources/authority labels, data/offline requirements, QA device matrix and release conditions in the sprint issue.
- Product owner approves the plan; only then open/lock the sprint.

## 2. CTO-led build and self-test
- The CTO owns implementation across **all** committed items as **one package**, without pausing for product-owner approval after each subtask.
- The CTO may independently complete necessary related engineering/support work discovered during implementation if it **directly contributes** to the approved sprint outcome and does not introduce material new scope, cost, security, legal, operational or regulatory risk.
- Record supporting additions in the sprint log and explain them succinctly at the final handoff, not as repeated permission requests.
- A finding outside scope or not needed for the present build becomes a separate unscheduled backlog issue with rationale and priority; do not silently absorb it into the sprint.
- CTO owns technical diagnosis, code, refactoring, source research, migration, caching, versioning, automated/unit/regression tests, documentation, code review, and safe QA deployment. Root causes and regressions should be fixed before the handoff.
- Preserve the live production app until the approved release decision; develop on branches and verify staging/QA isolation and rollback.

## 3. Critical escalation only
Ask the product owner while building only for:
- Ambiguous or materially changed product behavior that cannot be inferred from the agreed acceptance criteria;
- An unresolved safety, compliance, or legal-interpretation risk that could mislead field users;
- Data loss/privacy/security risk, a new recurring expense, or major platform/architectural commitment;
- A meaningful change of sprint scope, an impractical dependency, or a release-blocking decision requiring risk acceptance.
Routine technical implementation choices and necessary supporting fixes do **not** need permission.

## 4. Unified acceptance handoff
- Return to the product owner **once the entire committed sprint is built** and all feasible internal QA has passed, not after every issue.
- Present a concise handoff: delivered outcomes, acceptance checklist, automated test evidence, data/source provenance, known limitations, any new backlog items, QA URL, and recommended test order.
- Product owner tests one user workflow at a time, especially iPhone installed PWA/offline; iPad/desktop testing as agreed in sprint planning.
- Any defects discovered during acceptance go back to CTO-led repair and targeted regression before repeating the affected acceptance test. Do not ask the owner to supervise debugging.
- A source date, a legal effective date, a last-verified date, and an application release date must never be conflated. Official law versus agency guidance versus SkyFire commentary must remain distinct.

## 5. Release and closeout
- The product owner evaluates acceptance and authorizes production release, or explicitly approves any documented deferral/exception. Do not describe untested physical devices or unresolved source editions as verified.
- CTO performs merge, deployment and live/offline smoke checks, release metadata, rollback verification as needed, issue disposition, release notes, master register and sprint-history reconciliation.
- Verify all writes/results by reading back current GitHub and Drive state; then close sprint and only afterward plan the next.
- Avoid routine completion emails. Record work in GitHub/Drive and summarize to the owner in the conversation. Preserve account-security notifications.
- Existing product guardrails (issue #13), architecture rules and `docs/RELEASE_QA_CHECKLIST.md` remain authoritative.

## 6. Execution availability
A sprint's work may be carried out through connected tools during an active chat/work execution. Do not imply unseen ongoing background engineering. For a substantial unattended handoff, use ChatGPT Work if available, or an explicitly scheduled/authorized automation when appropriate. The CTO must report actual completed outcomes, not promises of work continuing after execution ends.

## 7. Planning status
This is the agreed **operating model**, not authorization to implement, merge or publish v0.18. The scope/theme for v0.18 still requires a separate strategic decision and explicit approval.
