import { fastify }from "fastify"

import { DatabasePostgres } from "./database-postgres.js"

const server = fastify()
const database = new DatabasePostgres()

server.post("/books", async (request, reply) => {

    const { title, description, author, pages} = request.body

    await database.create({
        title,
        description,
        author,
        pages,
    })

    return reply.status(201).send()

})

server.get("/books", async (request) => {
    const search = request.query.search

    const books = await database.list(search)

    return books
})

server.put("/books/:id", async (request, reply) => {
    const bookId = request.params.id
    const { title, description, author, pages} = request.body

    await database.update(bookId, {
        title,
        description,
        author,
        pages,
    })

    return reply.status(204).send()
})

server.delete("/books/:id", async (request, reply) => {
    const bookId = request.params.id
    
    await database.delete(bookId)

    reply.status(204).send()
})

server.listen({
    port: process.env.PORT ?? 3333,
})