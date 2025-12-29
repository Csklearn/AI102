# Definition of Ready

## Ready for Refinement

When a work item is created, it stays in the "New" state until "Ready for Refinement". Anyone on the RDS team can create a work item, and leave it in the "New" state as long as it takes to reach a ready state.

A work item must have a description and acceptance criteria (AC) to be moved to "Ready for Refinement" state.

We have multiple types of work that can be utilized when creating a work item: 

- Maintenance: Dependency updates, house-keeping items, releases
- Spike: Research-related task, estimated in hours not effort points
- PBI: Component updates, feature work, documentation
- Bug: Bug fixes, not estimated at all
- Technical Debt: Refactor/update of our code

(Commitizen should match this)

## Ready for Work

We ensure we have everything needed to accomplish a given task. This is the list of items we need to properly estimate effort. Once we have estimated the effort, a PBI can be committed to a sprint.
 
We use the Fibonacci sequence of numbers: (1, 2, 3, 5, 8, 13) for all work items types besides Spikes and Bugs. 

For Spikes, we add an hourly effort that we want to spend on the item. 

We do not point bugs with an effort number or an hourly effort, because bugs have unknown complexities and because they are fixes, and prioritized above all other work. We keep track of bug effort by # of bugs completed per sprint/release. Our goal is to keep bug count down.

We follow a broad guideline when pointing a work item to a numbered effort:

- 1: Smallest possible effort; expected to take 1/2 day at most 
- 2: 
- 3:
- 5:
- 8:
- 13: Largest possible effort; expected to take a whole sprint (2 weeks) to complete

We point up to a 13, and if a PBI is scoped at a 13, look to split it into 2 or more parts.

For a work item to be "Ready for Work", a work item must be:
- efforted
- agreed to by the team
- description is clear
- AC is clear and falsifiable 
- ensure we have the resources + assets needed to complete the work

### Bug Scope

Sometimes, bug reports state they require additional features/API updates to a component. If this is the case, the bug should be converted to a PBI.

When targeting to a release, if the next-planned release is a _patch_, the patch can be incremented to a _minor_.

### Blocked Work

If a work item needs additional info after work has begun, the "Blocked" tag needs to be added so it can be called out in ceremonies. 