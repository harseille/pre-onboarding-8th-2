const flexbox = (
  direction = 'row',
  justify = 'flex-start',
  items = 'stretch',
  wrap = 'nowrap',
) => `
    display: flex;
    flex-flow: ${direction} ${wrap};
    justify-content: ${justify};
    align-items: ${items};
  `;

const autoMargin = (marginX = 'auto') => `
  margin-left: ${marginX};
  margin-right: ${marginX};
  `;

const buttonNone = () => `
    appearance: none;
    border: 0;
    padding: 0;
    background: none;
  `;

export { flexbox, autoMargin, buttonNone };
