import { create, insert, search, save, load } from '@orama/orama'
async function test() {
  const db = await create({ schema: { title: 'string' } })
  await insert(db, { title: 'Hello World' })
  const saved = await save(db)
  const db2 = await create({ schema: { title: 'string' } })
  await load(db2, saved)
  const res = await search(db2, { term: 'hello' })
  console.log(res.hits)
}
test()
