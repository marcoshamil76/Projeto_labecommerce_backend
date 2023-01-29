// import { addUsers2, getProductById, products, purchases,users } from "./database"
// import { addUsers } from "./database"
import express, { Request, Response } from 'express'
import cors from 'cors'
import { TProduct, TPurchase, TUser } from "./types"
import { db } from "./database/knex"

// https://documenter.getpostman.com/view/24460706/2s8ZDYZ2hE
// link do documento

// new Date().toISOString() para alterar a data para string
// Deus é +!
const app = express()

app.use(express.json())
app.use(cors())


app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})


//01 Get all users
app.get('/users', async (req: Request, res: Response) => {
    try {
        const result = await db("users")
        .select("id","name","email","password","created_at AS createdAt")
        res.status(200).send(result)
    } catch (error) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
    }
})

// 02 Create User
app.post('/users', async (req: Request, res: Response) => {
    try {
        const { id, name, email, password } = req.body
        if (typeof id !== "string") {
            res.status(400)
            throw new Error("'id' deve ser string")
        }
        if (id.length < 3) {
            res.status(400)
            throw new Error("'id' deve possuir pelo menos 4 caracteres")
        }

        if (typeof name !== "string") {
            res.status(400)
            throw new Error("'name' deve ser string")
        }

        if (typeof email !== "string") {
            res.status(400)
            throw new Error("'email' deve ser string")
        }

        if (typeof password !== "string") {
            res.status(400)
            throw new Error("'password' deve ser string")
        }

        const [userAlreadyExists]: TUser[] | undefined[] = await db("users").where({ id: id })

        if (userAlreadyExists) {
            res.status(400)
            throw new Error("'id' já existe")
        }

        const newUser = {
            id,
            name,
            email,
            password
        }

        await db("users").insert(newUser)
        res.status(201).send({
            message: "User criado com sucesso",
            user: newUser
        })

    }
    catch (error) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})


// 03 Create Product
app.post('/products', async (req: Request, res: Response) => {
    try {
        const { id, name, price, description, image_url } = req.body

        if (typeof id !== "string") {
            res.status(400)
            throw new Error("'id' deve ser string")
        }
        if (id.length < 3) {
            res.status(400)
            throw new Error("'id' deve possuir pelo menos 4 caracteres")
        }

        if (typeof name !== "string") {
            res.status(400)
            throw new Error("'name' deve ser string")
        }

        if (typeof description !== "string") {
            res.status(400)
            throw new Error("'description' deve ser string")
        }

        if (typeof image_url !== "string") {
            res.status(400)
            throw new Error("'image_url' deve ser string")
        }

        const [productAlreadyExists]: TProduct[] | undefined[] = await db("products").where({ id: id })

        if (productAlreadyExists) {
            res.status(400)
            throw new Error("'id' já existe")
        }


        const newProduct = {
            id,
            name,
            price,
            description,
            image_url
        }

        await db("products").insert(newProduct)
        const productToShow = await db("products")
        .select("id","name","price","description","image_url AS imageUrl")
        res.status(201).send({
            message: "Produto cadastrado com sucesso",
            user: productToShow
        })

    } catch (error) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

//04 Get All Products
app.get('/products', async (req: Request, res: Response) => {
    try {
        const result = await db("products")
        .select("id","name","price","description","image_url AS imageUrl")
        res.status(200).send(result)
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})



//05 Get all products search
app.get('/products/search', async (req: Request, res: Response) => {
    try {
        const q = req.query.q as string
        const id = req.params.id
        const productFind = await db("products")
        .select("id","name","price","description","image_url AS imageUrl")
        .where("name", "LIKE", `%${q}%`)

        if (productFind) {
            res.status(200).send(productFind)
        } else {
            res.status(400)
            throw new Error("Produto não localizado")
            console.log(q)
        }

    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})


// 06 Edit Product by Id
app.put("/products/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const newName = req.body.name as string | undefined
        const newPrice = req.body.price as number | undefined
        const newDescription = req.body.description as string | undefined
        const newImageUrl = req.body.image_url as string | undefined


        if (id === undefined) {
            res.status(400)
            throw new Error("Id não informado!")
        }
        if (newName !== undefined) {
            if (newName.length < 3) {
                res.status(400)
                throw new Error("Nome precisa ter ao menos 3 caracteres")
            }
            if (typeof newName !== "string") {
                res.status(400)
                throw new Error("Nome do produto deve ser string")
            }
        }

        if (newPrice !== undefined) {
            if (typeof newPrice !== "number") {
                res.status(400)
                throw new Error("Preço deve ser um número")
            }
        }
        if (newImageUrl !== undefined) {
            if (typeof newImageUrl !== "string") {
                res.status(400)
                throw new Error("Url deve ser uma string")
            }
        }

        const [productEdited] = await db("products").where("id", "=", `${id}`)
        if (!productEdited) {
            res.status(404)
            throw new Error("Produto não cadastrado")
        }
        const productUpdate: TProduct = {
            id: productEdited.id,
            name: newName || productEdited.name,
            price: isNaN(newPrice) ? productEdited.price : newPrice,
            description: newDescription || productEdited.description,
            image_url: newImageUrl || productEdited.image_url
        }
        await db("products").update(productUpdate).where({ id: id })

        const productToShow= await db("products")
        .select("id","name","price","description","image_url AS imageUrl")
        .where({id:id})
        res.status(200).send({
            message: "Produto atualizado com sucesso",
            product: productToShow
        })

    } catch (error) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

// 07 Create Purchase
app.post("/purchases", async (req: Request, res: Response) => {
    try {
        const id = req.body.id
        const buyerId = req.body.buyerId

        const products = req.body.products
        let totalPrice = 0
        const purchase = {
            id,
            buyer_id: buyerId,
            total_price: totalPrice
        }

        const [idExist] = await db("purchases").where({ id: id })
        if (idExist) {
            res.status(400)
            throw new Error("Número 'id' da purchase já cadastrado")
        }
        if (!buyerId) {
            res.status(400)
            throw new Error("id do comprador não informado")
        }

        await db("purchases").insert(purchase)

        for (let i in products) {
            const purchaseProducts = {
                purchase_id: id,
                product_id: products[i].productId,
                quantity: products[i].quantity
            }

            await db("purchases_products").insert(purchaseProducts)
            const [produtoNext] = await db("products").select("price").where({ id: purchaseProducts.product_id })
            totalPrice += purchaseProducts.quantity * produtoNext.price
        }

        const produtosPurchase = await db("products")
            .select("id", "name", "price", "description", "image_url AS imageUrl", "quantity")
            .innerJoin("purchases_products", "products.id", "=", "purchases_products.product_id")
            .where({ purchase_id: id })
        const totalPurchase = await db("purchases").update({ total_price: totalPrice }).where({ id: id })
        const result = { ...purchase, products: produtosPurchase }
        res.status(200)
        res.send({
            message: "Purchase adicionada",
            result
        })
    } catch (error) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})


// 08 Delete Purchase by Id
app.delete('/purchases/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        if (typeof id !== "string") {

            res.status(400)
            throw new Error("Id deve ser uma string")
        }

        await db("purchases_products").del().where({ purchase_id: id })
        await db("purchases").del().where({ id: id })
        res.status(200).send({ message: "Pedido cancelado com sucesso" })


    } catch (error) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})


// 09 Get Purchase by Id
app.get('/purchases/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        if (typeof id !== "string") {

            res.status(400)
            throw new Error("Id deve ser uma string")
        }

        const [purchaseExist] = await db("purchases")
        .select(
            "purchases.id AS purchaseId",
            "users.id AS buyerId",
            "users.name AS buyerName",
            "users.email AS buyerEmail",
            "purchases.total_price AS totalPrice",
            "purchases.created_at AS createdAt",
            "purchases.paid",
        ).innerJoin("users","purchases.buyer_id","=","users.id")
        .where({ "purchases.id": id })

        if (!purchaseExist) {
            res.status(400)
            throw new Error("Id informado não consta no cadastro")
        }
        const productsPurchase = await db("products")
            .select("id","name","price", "description", "image_url AS imageUrl", "quantity")
            .innerJoin("purchases_products", "products.id", "=", "product_id")
            .where({ purchase_id: id })

        const result = { ...purchaseExist, products: productsPurchase }
        res.status(200)
        res.send(result)


    } catch (error) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})
