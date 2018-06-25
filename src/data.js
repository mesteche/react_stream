export const setupInitialState = (nbRows, nbCols) =>
  Array.from(Array(nbRows), (r, id) => ({
    id,
    cols: Array.from(Array(nbCols), (c, id) => ({
      id,
      value: Math.random(),
    })),
  }))

export const UPDATES = 600
