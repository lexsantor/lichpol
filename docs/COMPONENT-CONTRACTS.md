# LICHPOL · Component contracts & maturity registry

V6 distinguishes **implemented product patterns** from the preserved V4 reference showcase. Merely appearing in `componentes.html` does **not** make a component production-ready. These contracts define required behaviors prior to shipping.

## Implemented and exercised in V6

| Pattern | Contract | Verification |
|---|---|---|
| Header and mobile menu | Site navigation with current-page state, toggle control, Escape to close, proper focus return | Browser-tested 390 px and desktop |
| Campaign filtering | Native buttons using `aria-pressed`, category metadata, immediate results and live count | Browser-tested |
| Campaign card | `<article>`, meaningful image alt text, visible status source, direct route to details | Browser-rendered across viewports |
| Campaign details | Semantic `<article>` plus sticky desktop info panel; no fabricated slot status | Browser-rendered across viewports |
| Joining dialog | Native `<dialog>`, `showModal()`, Escape and click-away close, verified official fallback | Browser-tested |
| Design tabs | `role=tablist`, `role=tab`, `role=tabpanel`; arrows, Home, End, selection sync | Browser-tested |
| Custom Select | Trigger + `role=listbox`, option focus, Escape, arrows, Home/End, selected state and value | Browser-tested in V6 |
| Accordion / FAQ | Native `<details>` + `<summary>`, keyboard operability, no JS required | Browser-rendered |
| D20 | Explicit demo state, output announced via `aria-live`, reduced-motion branch | Browser-tested |
| Buttons | Primary, secondary, tertiary (border = 0), danger; hover, active, focus, disabled | CSS checked; hover screenshot review recommended |
| Status badge | Font-weight 500, semantic tones and text labels | CSS checked |
| Responsive containers | 1200px max, 20-48 px fluid gutters, mobile recomposition | 320 / 390 / 768 / 1024 / 1440 tested |

## V4 reference library · 64 components

The categories below preserve the full earlier scope. Status **Reference** means the component is included in the original 64-item demonstration and its production API, async states, accessibility and browser behavior remain pending.

| Component | Required acceptance contract | Current scope |
|---|---|---|
| Accordion | details/summary or ARIA accordion, keyboard, expanded state | Reference; V6 pattern available |
| Collapsible | named semantics, responsive states, keyboard support, focus, error/empty/loading where applicable | Reference (V4 atlas) |
| Dialog | modal focus containment, Escape, accessible name, close return focus | Reference; V6 pattern available |
| Alert Dialog | blocking confirmation, destructive-safe default, focus restore | Reference (V4 atlas) |
| Drawer | backdrop, focus management, Escape, scroll locking | Reference; V6 pattern available |
| Sheet | clear open/close state, focus management, viewport-safe scroll | Reference (V4 atlas) |
| Popover | trigger state, collision positioning, click-away, Escape | Reference (V4 atlas) |
| Tooltip | hover and focus, describedby, noncritical content | Reference (V4 atlas) |
| Hover Card | named semantics, responsive states, keyboard support, focus, error/empty/loading where applicable | Reference (V4 atlas) |
| Dropdown Menu | menu key model, disabled items, Escape and focus restore | Reference (V4 atlas) |
| Context Menu | secondary path only, discoverable alternative to right-click | Reference (V4 atlas) |
| Breadcrumb | named semantics, responsive states, keyboard support, focus, error/empty/loading where applicable | Reference (V4 atlas) |
| Navigation Menu | named semantics, responsive states, keyboard support, focus, error/empty/loading where applicable | Reference; V6 pattern available |
| Menubar | named semantics, responsive states, keyboard support, focus, error/empty/loading where applicable | Reference (V4 atlas) |
| Sidebar | named semantics, responsive states, keyboard support, focus, error/empty/loading where applicable | Reference (V4 atlas) |
| Tabs | aria-selected, panel relationships, arrows/Home/End and hidden panels | Reference; V6 pattern available |
| Pagination | named semantics, responsive states, keyboard support, focus, error/empty/loading where applicable | Reference (V4 atlas) |
| Command | named semantics, responsive states, keyboard support, focus, error/empty/loading where applicable | Reference (V4 atlas) |
| Carousel | accessible previous/next, visible position, no forced autoplay | Reference (V4 atlas) |
| Field | named semantics, responsive states, keyboard support, focus, error/empty/loading where applicable | Reference (V4 atlas) |
| Label | named semantics, responsive states, keyboard support, focus, error/empty/loading where applicable | Reference (V4 atlas) |
| Input | named semantics, responsive states, keyboard support, focus, error/empty/loading where applicable | Reference (V4 atlas) |
| Input Group | named semantics, responsive states, keyboard support, focus, error/empty/loading where applicable | Reference (V4 atlas) |
| Input OTP | one-time-code semantics, paste, errors and no premature submit | Reference (V4 atlas) |
| Textarea | named semantics, responsive states, keyboard support, focus, error/empty/loading where applicable | Reference (V4 atlas) |
| Checkbox | named semantics, responsive states, keyboard support, focus, error/empty/loading where applicable | Reference (V4 atlas) |
| Radio Group | named semantics, responsive states, keyboard support, focus, error/empty/loading where applicable | Reference (V4 atlas) |
| Switch | named semantics, responsive states, keyboard support, focus, error/empty/loading where applicable | Reference (V4 atlas) |
| Slider | named semantics, responsive states, keyboard support, focus, error/empty/loading where applicable | Reference (V4 atlas) |
| Select | combobox/listbox keyboard and stable chosen value | Reference; V6 pattern available |
| Native Select | native behavior preserved with styled closed state and adequate chevron space | Reference (V4 atlas) |
| Combobox | type filtering, ARIA options, empty state, keyboard and screen reader | Reference (V4 atlas) |
| Calendar | grid semantics, month changes, disabled days, localized labels | Reference (V4 atlas) |
| Date Picker | date parsing, keyboard day selection, timezone constraints | Reference (V4 atlas) |
| Questionnaire | named semantics, responsive states, keyboard support, focus, error/empty/loading where applicable | Reference (V4 atlas) |
| Button | true disabled/working states, keyboard activation, discernible name | Reference; V6 pattern available |
| Button Group | named semantics, responsive states, keyboard support, focus, error/empty/loading where applicable | Reference (V4 atlas) |
| Toggle | named semantics, responsive states, keyboard support, focus, error/empty/loading where applicable | Reference (V4 atlas) |
| Toggle Group | named semantics, responsive states, keyboard support, focus, error/empty/loading where applicable | Reference (V4 atlas) |
| Alert | named semantics, responsive states, keyboard support, focus, error/empty/loading where applicable | Reference (V4 atlas) |
| Toast | polite live region, optional persistence/dismiss action, non-blocking | Reference (V4 atlas) |
| Progress | named semantics, responsive states, keyboard support, focus, error/empty/loading where applicable | Reference (V4 atlas) |
| Spinner | named semantics, responsive states, keyboard support, focus, error/empty/loading where applicable | Reference (V4 atlas) |
| Skeleton | named semantics, responsive states, keyboard support, focus, error/empty/loading where applicable | Reference (V4 atlas) |
| Empty | named semantics, responsive states, keyboard support, focus, error/empty/loading where applicable | Reference (V4 atlas) |
| Card | named semantics, responsive states, keyboard support, focus, error/empty/loading where applicable | Reference; V6 pattern available |
| Item | named semantics, responsive states, keyboard support, focus, error/empty/loading where applicable | Reference (V4 atlas) |
| Avatar | named semantics, responsive states, keyboard support, focus, error/empty/loading where applicable | Reference (V4 atlas) |
| Badge | named semantics, responsive states, keyboard support, focus, error/empty/loading where applicable | Reference; V6 pattern available |
| Bubble | named semantics, responsive states, keyboard support, focus, error/empty/loading where applicable | Reference (V4 atlas) |
| Marker | named semantics, responsive states, keyboard support, focus, error/empty/loading where applicable | Reference (V4 atlas) |
| Attachment | named semantics, responsive states, keyboard support, focus, error/empty/loading where applicable | Reference (V4 atlas) |
| Message | sender/time semantics and assistive announcement priority | Reference (V4 atlas) |
| Message Scroller | named semantics, responsive states, keyboard support, focus, error/empty/loading where applicable | Reference (V4 atlas) |
| Kbd | named semantics, responsive states, keyboard support, focus, error/empty/loading where applicable | Reference (V4 atlas) |
| Code Block | copy action with feedback, overflow behavior and language labeling | Reference (V4 atlas) |
| Aspect Ratio | named semantics, responsive states, keyboard support, focus, error/empty/loading where applicable | Reference (V4 atlas) |
| Table | named semantics, responsive states, keyboard support, focus, error/empty/loading where applicable | Reference (V4 atlas) |
| Data Table | th/scope semantics, sorting state, pagination/empty/error if async | Reference (V4 atlas) |
| Chart | text alternative, legend, readable visual data and source | Reference (V4 atlas) |
| Resizable | named semantics, responsive states, keyboard support, focus, error/empty/loading where applicable | Reference (V4 atlas) |
| Scroll Area | named semantics, responsive states, keyboard support, focus, error/empty/loading where applicable | Reference (V4 atlas) |
| Separator | named semantics, responsive states, keyboard support, focus, error/empty/loading where applicable | Reference (V4 atlas) |
| Direction | named semantics, responsive states, keyboard support, focus, error/empty/loading where applicable | Reference (V4 atlas) |

## Delivery rules

1. A component is **production-ready** only after its API, states, keyboard handling, screen-reader verification, contrast, loading/error behavior, mobile behavior and unit/integration tests pass.
2. Use small, semantic native controls when custom solutions provide no additional product value.
3. Prevent demo-to-production confusion. Story/campaign data cannot imply that registration is live.
4. Component colors and spacing come from `css/tokens.css`; avoid one-off CSS overrides.
5. Require textual/error alternatives for non-decorative icons or animations.
6. For any new library framework, inspect current dependencies first. V6 currently uses zero runtime dependencies.

## Known limitation

The original V4 64-component atlas is preserved, not fully refactored into 64 independent production modules. The V6 site patterns and documentation cover the actual user journeys, while the remaining reference components require specific implementation and accessibility hardening before reuse in a live product.
