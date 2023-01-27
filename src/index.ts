import { addUsers2, getProductById, products, purchases,users } from "./database"
import { addUsers } from "./database"
import express, {Request, Response} from 'express'
import cors from 'cors'
import { TProduct, TPurchase, TUser} from "./types"
import { db } from "./database/knex"

// https://documenter.getpostman.com/view/24460706/2s8ZDYZ2hE
// link do documento

// new Date().toISOString() para alterar a data para string
// Deus é +!
const app = express()

app.use(express.json())
app.use(cors())


app.listen(3003, ()=>{
    console.log("Servidor rodando na porta 3003")
})

// app.get('/products', (req: Request, res: Response)=>{
//     res.status(200).send(products)
// })

//************************************ */ Refatorado para uso do Knex
app.get('/products', async (req:Request, res: Response)=>{
    try {
        // A maneira abaixo está correto porém foi refatorado para o uso do QueryBuilder
        // const result = await db.raw(`SELECT * FROM products`) 
        // res.status(200).send(result)

        const result = await db("products")
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


// app.get('/products/search', (req: Request, res: Response)=>{
//     const q = req.query.q as string
//     const result = products.filter((product)=>{
//         return product.name.toLocaleLowerCase().includes(q.toLowerCase())
//     })
//     res.status(200).send(result)
// })

//*****************************************/ Refatorado para uso do Knex
app.get('/products/search', async (req: Request, res: Response)=>{
    try {
        const q = req.query.q as string
        const id = req.params.id
        // A maneira abaixo está correto porém foi refatorado para o uso do QueryBuilder
        // const productFind = await db.raw(
        //     `SELECT * FROM products
        //     WHERE name LIKE "%${q}%"`
            
        // )

        const productFind = await db("products").where("name", "LIKE", `%${q}%`)
        
        if(productFind){
            res.status(200).send(productFind)
        }else{
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



app.get('/purchases', async (req: Request, res: Response)=>{
    try {
        const result = await db("purchases")
        res.status(200).send(result)
        // res.status(200).send(purchases)
    } catch (error) {
        console.log(error)
        if(res.statusCode === 200){
            res.status(500)
        }
    }
})

// app.get('/users', (req: Request, res: Response)=>{
//     try {
//         res.status(200).send(users)
//             } catch (error:any) {
//                 console.log(error)
//                 if(res.statusCode === 200){
//                     res.status(500)
//                 }
//                 res.send(error.message)
                
//             }
// })


//****************************************** */ Refatorado para uso do knex
app.get ('/users', async (req:Request,res: Response)=>{
    try {
        const result = await db.raw(`SELECT * FROM users`)
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

app.get('/users/search', (req: Request, res: Response)=>{
    const q = req.query.q as string
    const result = users.filter((user)=>{
        return user.email.toLocaleLowerCase().includes(q.toLowerCase())
    })
    res.status(200).send(result)
})

app.post('/products', async (req:Request, res: Response)=>{
    try {
        const {id,name, price,description, image_url} = req.body 
 
        if(typeof id !== "string"){
            res.status(400)
            throw new Error("'id' deve ser string")
        }
        if (id.length < 3){
            res.status(400)
            throw new Error("'id' deve possuir pelo menos 4 caracteres")
        }

        if (typeof name !== "string"){
            res.status(400)
            throw new Error("'name' deve ser string")
        }

        if (typeof description !== "string"){
            res.status(400)
            throw new Error("'description' deve ser string")
        }

        if (typeof image_url !== "string"){
            res.status(400)
            throw new Error("'image_url' deve ser string")
        }

        const [productAlreadyExists]:TProduct[] | undefined[] = await db("products").where({id:id})

        if (productAlreadyExists){
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
        res.status(201).send({
            message: "Produto criado com sucesso",
            user: newProduct
        })
       
    } catch (error) {
        console.log(error)
                if(res.statusCode === 200){
                    res.status(500)
                }
                res.send(error.message)     
    }
})
// adicionar um product 
// app.post('/products',(req:Request, res: Response)=>{
//     try {
//         const {id, name, price, description, image_url} = req.body as TProduct
    
//     const newProduct = {
//         id,
//         name,
//         price,
//         description,
//         image_url
//             }
//             const checkId = products.find((product)=>{
//                 return product.id === id
//             })
//             if(checkId ){
//                 res.status(400)
//                 console.log(" AQUI",checkId)
//                 throw new Error("Id já existente")
//             // }else if(req.body.id !=="Number"){
//             //     res.status(400)
//             //     console.log(req.body.id)
//             //     throw new Error("Id precisa ser um número")
                
//             }else{
//                 products.push(newProduct)
//                 res.status(201).send("Product successfully added!")  
//             }
            
        
        
//     } catch (error: any) {
//         console.log(error)
//                 if(res.statusCode === 200){
//                     res.status(500)
//                 }
//                 res.send(error.message)     
//     }
// })

// Adição de usuário
// app.post('/users',(req:Request, res: Response)=>{
//     try {
//         const {id, email, password} = req.body as TUser
    
//     const newUser = {
//         id,
//         email,
//         password
//         }
    
//     const checkId = users.find((user)=> user.id === req.body.id)
    
//        if(checkId){
//         throw new Error("Id já em uso")
//        }
//        const checkEmail= users.find((user)=> user.email === email)
    
//        if(checkEmail){
        
//         throw new Error("Este email já foi cadastrado")
//        }

//        users.push(newUser)
//     res.status(201).send("User successfully added!")
        
//     } catch (error) {
//         console.log(error)
//                 if(res.statusCode === 200){
//                     res.status(500)
//                 }
//                 res.send(error.message)     
//     }
// })


//*********************************************** */ Refatorado para uso do knex ADIÇÃO USUÁRIO
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% Add user OK
app.post('/users', async (req:Request, res: Response)=>{
    try {
        const {id,name, email, password} = req.body 
        // ,name, email, password
        if(typeof id !== "string"){
            res.status(400)
            throw new Error("'id' deve ser string")
        }
        if (id.length < 3){
            res.status(400)
            throw new Error("'id' deve possuir pelo menos 4 caracteres")
        }

        if (typeof name !== "string"){
            res.status(400)
            throw new Error("'name' deve ser string")
        }

        if (typeof email !== "string"){
            res.status(400)
            throw new Error("'email' deve ser string")
        }

        if (typeof password !== "string"){
            res.status(400)
            throw new Error("'password' deve ser string")
        }

        const [userAlreadyExists]:TUser[] | undefined[] = await db("users").where({id:id})

        if (userAlreadyExists){
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

        // if(id !== undefined){
        //     if(typeof id = "string")
        // }
        // const checkId = await db.raw(
        //     `SELECT * FROM products
        //     WHERE id = "${id}"`
            
        // )
       
    
    // const checkId = users.find((user)=> user.id === req.body.id)
    
    //    if(checkId){
    //     throw new Error("Id já em uso")
    // //    }
    //    const checkEmail= users.find((user)=> user.email === email)
    
    //    if(checkEmail){
        
    //     throw new Error("Este email já foi cadastrado")
    //    }
        
    //   await db.raw  (`
    //    INSERT INTO users (name, email, password)
    //    VALUES 
    //    ("${newUser.name}","${newUser.email}","${newUser.password}");
    //    `)
    // //    users.push(newUser)
    // res.status(201).send("Cadastro realizado com sucesso!")
        
    } catch (error) {
        console.log(error)
                if(res.statusCode === 200){
                    res.status(500)
                }
                res.send(error.message)     
    }
})
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& A Refazer&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
// app.post('/purchase', (req:Request, res:Response)=>{
//     try {
//         const {id, buyer_id, total_price,paid}= req.body as TPurchase

//         const newPurchase = {
//             id,
//             buyer_id,
//             total_price,
//             paid
//         }
//         console.log(newPurchase)

//         const checkUserId = users.find((user)=> user.id === req.body.userId)
//         const checkProductId = products.find((product)=> product.id === req.body.productId)

//         if(!checkUserId){
//             throw new Error("Este Id não consta no cadastro")
//         }
//         if(!checkProductId){
//             throw new Error("Este Id de produto não consta")
//         }
//         if ((checkProductId.price * quantity) !== Number(totalPrice)){
//             console.log(totalPrice, checkProductId.price, newPurchase.quantity)
//             throw new Error("Valor Total incorreto")
//         }
//         purchases.push(newPurchase)
//         res.status(201).send("Purchase cadastrada com sucesso")
//     } catch (error) {
//         console.log(error)
//                 if(res.statusCode === 200){
//                     res.status(500)
//                 }
//                 res.send(error.message)  
        
//     }
// })

// Aprofundamento Express Exercicios

// Get Product by user id
// app.get("/products/:id",(req: Request, res: Response)=>{
//     try {
//      const id = req.params.id
//     const productFind = products.find((product)=>{
//         return product.id === id
//     })
//     if (productFind){
//         res.status(200).send(productFind)
//     }else{
//         res.status(404).send("Produto não encontrado")
//     }
//     } catch (error) {
//         console.log(error)
//                 if(res.statusCode === 200){
//                     res.status(500)
//                 }
//                 res.send(error.message)
//     }
    
// })

// *********************************************Refatorado par uso do knex

app.get("/products/:id", async (req: Request, res: Response)=>{
    try {
        const id = req.params.id

        const [productFind] = await db.raw(
            `SELECT * FROM products
            WHERE id="${id}"`
        )
        // Esta parte abaixo foi substituída pela busca acima
    // const productFind = products.find((product)=>{
    //     return product.id === id
    // })
    if (productFind){
        res.status(200).send(productFind)
    }else{
        res.status(400)
        throw new Error("Produto não encontrado!")
    }
    } catch (error) {
        console.log(error)
                if(res.statusCode === 200){
                    res.status(500)
                }
                res.send(error.message)
    }
    
})

// app.get("/purchases/:id",(req: Request, res: Response)=>{
//     const id = req.params.id
//     const purchasesFind = purchases.find((purchase)=>{
//         return purchase.userId === id
//     })
//     if (purchasesFind){
//         res.status(200).send(purchasesFind)
//     }else{
//         res.status(404).send("Produto não encontrado")
//     }
// })


// app.get("/purchases/:id", async (req: Request, res: Response)=>{
//     const id = req.params.id
//     // const purchasesFind = purchases.find((purchase)=>{
//     //     return purchase.userId === id
//     // })
//     const [purchasesFind] = await db("purchases").innerJoin("users","purchases.buyer_id", "=", "users.id")
//         if (purchasesFind){
//             res.status(200).send(purchasesFind)
//         }else{
//             res.status(404).send("Purchase não encontrada")
//     }
// })

app.get("/purchases/:id", async (req: Request, res: Response)=>{
    try {
        const id = req.params.id
    const purchaseFind = await db("purchases").where({id:id})
    if(purchaseFind){
        res.status(200).send(purchaseFind)
    }else{
        res.status(400).send("Purchase não encontrada")
    }
    } catch (error) {
        console.log(error)
        if(res.statusCode === 200){
            res.status(500)
        }
        res.send(error.message)
    }
    
})

// Delete user by id
app.delete("/users/:id",(req: Request, res: Response)=>{
    try {
        const id = req.params.id
    
    const userIndex = users.findIndex((user)=>{
        return user.id === id
    })
    if (userIndex>=0){
        users.splice(userIndex,1)
        res.status(200).send("User deletado com sucesso")
    }else{
        res.status(404).send("User não encontrado")
    }
    } catch (error) {
        console.log(error)
        if (res.statusCode === 200){
            res.status(500)

        }
        res.send(error.message)
    }
    
})
// Delete product by id
app.delete("/products/:id",(req: Request, res: Response)=>{
    try {
        const id = req.params.id
    
    const productIndex = products.findIndex((product)=>{
        return product.id === id
    })
    if (productIndex>=0){
        products.splice(productIndex,1)
        res.status(200).send("Product deletado com sucesso")
    }else{
        res.status(404).send("Product não encontrado")
    }
    } catch (error) {
        console.log(error)
        if(res.statusCode === 200){
            res.status(500)
        }
        res.send(error.message)
        
    }
    
})
// Edit user by id
app.put("/users/:id",(req: Request, res: Response)=>{
    try {
        const id = req.params.id

    const newId = req.body.id as string | undefined
    const newEmail = req.body.email as string | undefined
    const newPassword = req.body.password as  string | undefined
    

    const userEdited = users.find((user)=>{
        // return user.id === id
    })

    if (userEdited){
        // userEdited.id = newId || userEdited.id    
        userEdited.email = newEmail || userEdited.email
        userEdited.password = newPassword || userEdited.password
        res.status(200).send("User atualizado com sucesso")
    }else{
        res.status(404).send("User não encontrado")
    }
    } catch (error) {
        console.log(error)
        if(res.statusCode === 200){
            res.status(500)
        }
        res.send(error.message)
        
    }
    
    })

    //Edit user by id
    // app.put("/products/:id",(req: Request, res: Response)=>{
    //     try {
    //         const id = req.params.id
    
    //     const newId = req.body.id as string | undefined
    //     const newName = req.body.name as string | undefined
    //     const newPrice = req.body.price as  number | undefined
    //     const newCategory = req.body.category as string | undefined
        
    
    //     const productEdited = products.find((product)=>{
    //         return product.id === id
    //     })
    
    //     if (productEdited){
    //         if(newId){
    //             if(newId.length>=2){
    //                productEdited.id =newId
                   
    //             }else{
    //                 console.log(newId)
    //                 throw new Error("Id precisa ter ao menos dois caracteres")
    //             }
    //         }else{
    //             productEdited.id = productEdited.id
    //         }
    //         if(newName){
    //             if(newName.length>=3){
    //                 productEdited.name = newName
    //             }else{
    //                 throw new Error("Nome precisa ter ao menos três caracteres")
    //             }
    //         }else{
    //             productEdited.name = productEdited.name
    //         }
    //         if(newCategory){
    //             if(newCategory.length>=3){
    //                 productEdited.category = newCategory
    //             }else{
    //                 throw new Error("Categoria precisa ter ao menos três caracteres")
    //             }
    //         }else{
    //             productEdited.category = productEdited.category
    //         }
    //         productEdited.price = newPrice || productEdited.price
    //         res.status(200).send("Product atualizado com sucesso")
    //     }else{
    //         res.status(404).send("Product não encontrado")
    //     }
    //     } catch (error) {
    //         console.log(error)
    //         if(res.statusCode ===200){
    //             res.status(500)
    //         }
    //         res.send(error.message)
            
    //     }
        
    //     })


        app.put("/products/:id", async (req: Request, res: Response)=>{
            try {
                const id = req.params.id
        
            // const newId = req.body.id as string | undefined
            const newName = req.body.name as string | undefined
            const newPrice = req.body.price as  number | undefined
            const newDescription = req.body.description as string | undefined
            const newImageUrl = req.body.image_url as string | undefined
            

            if(id === undefined){
                res.status(400)
                throw new Error("Id não informado!")
            }
                if (newName !== undefined){
                    if(typeof newName  !== "string"){
                        res.status(400)
                        throw new Error("Nome do produto deve ser string")
                    }
                }

                if(newPrice !== undefined){
                    if(typeof newPrice !== "number"){
                        res.status(400)
                        throw new Error("Preço deve ser um número")
                    }
                }
                if(newImageUrl !== undefined){
                    if(typeof newImageUrl !== "string"){
                        res.status(400)
                        throw new Error("Url deve ser uma string")
                    }
                }

                const [productEdited] = await db("products").where("id", "=", `${id}`)
                if (!productEdited){
                    res.status(404)
                    throw new Error("Produto não cadastrado")
                }
                const productUpdate:TProduct = {
                    id: productEdited.id,
                    name: newName || productEdited.name,
                    price: isNaN(newPrice) ? productEdited.price : newPrice,
                    description: newDescription || productEdited.description,
                    image_url: newImageUrl || productEdited.image_url 
                }
                await db("products").update(productUpdate).where({id:id})
                res.status(200).send({
                    message: "Produto atualizado com sucesso",
                    product: productUpdate
                })

            } catch (error) {
                console.log(error)
                if(res.statusCode ===200){
                    res.status(500)
                }
                res.send(error.message)
            }
            })
    