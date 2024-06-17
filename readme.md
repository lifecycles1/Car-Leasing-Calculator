## Followed Business Case along with picture examples to design a clean and professional UI

- Used ChatGPT for the financial amortization formula and added inline documentation for it

### Responsiveness

- layout uses flex containers
- followed a mobile-first approach with only one breakpoint:
  @media max-width 600px (everything up to larger phones)
  @media min-width 601px (everything starting from smaller tablets and increasing)
- bug breakpoint
  @media (min-width: 600px) and (max-width: 698px)
  issue: input container boxes, and result display texts were misaligning when shrinking within those pixels on desktop.
  reproduce: hide some of the label- and p text by introducing extra span tags with display: none.

- additional: a demo "xxxtest.ts" TypeScript file with types
