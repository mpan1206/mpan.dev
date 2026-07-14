import { create, insert, search } from '@orama/orama'
const db = await create({ schema: { title: 'string' } })
await insert(db, { title: 'Hello World' })
const res = await search(db, { term: 'hello' })
console.log(res.hits)
