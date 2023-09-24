import { randomUUID } from "node:crypto"
import { sql } from "./db.js"

export class DatabasePostgres {

    async list(search) {
        let books

        if (search) {
            books = await sql`select * from books where title ilike ${'%' +search+ '%'}`
        } else {
            books = await sql`select * from books`
        }

        return books
    }


    async create(book) {
        const bookId = randomUUID()
        const { title, description, author, pages } = book

        await sql`insert into books (id, title, description, author, pages) VALUES (${bookId}, ${title}, ${description}, ${author}, ${pages})`
    }

    async update(id, book) {
        const { title, description, author, pages } = book

        await sql`update books set title = ${title}, description = ${description}, author = ${author}, pages = ${pages} WHERE id = ${id}`
    }

    async delete(id) {
        await sql`delete from books WHERE id = ${id}`
    }



}