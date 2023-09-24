import { randomUUID } from "node:crypto"

export class DatabaseMemory {

    #books = new Map()

    list() {
        return Array.from(this.#books.entries()).map((bookArray) => {
            const id = bookArray[0]
            const data = bookArray[1]

            return {
                id,
                ...data,
            }
        })
    }


    create(book) {
        const bookId = randomUUID()

        this.#books.set(bookId, book)
    }

    update(id, book) {
        this.#books.set(id, book)
    }

    delete(id) {
        this.#books.delete(id)
    }



}