const pipe2 = (f, g) => x => g(f(x))
export const pipe = (...fns) => fns.reduce(pipe2)
