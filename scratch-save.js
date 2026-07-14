import { create, insert, search } from '@orama/orama'
import { persist } from '@orama/plugin-data-persistence'

const db = await create({ schema: { title: 'string' } })
await insert(db, { title: 'Hello World' })

console.log(typeof persist)
