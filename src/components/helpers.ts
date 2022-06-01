function idGenerator() {
  const seeds = new Map<string, number>()
  return function (name: string): number {
    const seed = seeds.get(name)
    if (seed) {
      const nextId = seed + 1
      seeds.set(name, nextId)
      return nextId
    } else {
      seeds.set(name, 1)
      return 1
    }
  }
}

export const getNextId = idGenerator()
