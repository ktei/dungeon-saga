# Getting started

```
npm install -g yarn # in case you don't have yarn
yarn
yarn dev
```

# Data format

## Request (to server)

```typescript
type Request = {
  id: string
  name: 'Lizard' | 'Wall'
  x: number
  y: number
  direction: 0 | 1 | 2 | 3 // clockwise, starting with UP
  state?: {
    hitPoints: number
  }
  collision?: {
    collidedWith: 'Lizard' | 'Wall'
    id?: number
    collisionX: number
    collisionY: number
  }
}[]
```

## Response (to client)

```typescript
type Response = {
  id: string
  direction: 0 | 1 | 2 | 3 // clockwise, starting with UP
}[]
```
