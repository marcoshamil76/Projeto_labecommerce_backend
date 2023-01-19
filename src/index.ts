// import { frota } from "./frota"
// type Carro = {
//   marca:string,
//    modelo:string,
//    ano:number}

// function buscarCarrosPorMarca(frota:Carro[], marca:string):Carro[] {
//   if (marca === undefined) {
//     return frota
//   }

//   return frota.filter(
//     (carro) => {
//       return carro.marca === marca
//     }
//   )
// }

// console.log(buscarCarrosPorMarca(frota,"Toyota"))

import { addUsers2, getProductById, products, purchases,users } from "./database"
import { addUsers } from "./database"
import express, {Request, Response} from 'express'
import cors from 'cors'
import { TProduct, TPurchase, TUser} from "./types"

// console.log(`Lista de usuários cadastrados`)
// console.table(users)
// console.log(`Lista de produtos`)
// console.table(products)
// console.log(`Lista de Compras`)
// console.table(purchases)

// console.log(users)
// console.log(addUsers("04", "mhs@mhs.com","1976"))
// console.table(users)
// console.log(getProductById("p03"))
// console.log(addUsers2("05","bwayne@mhs.com","1978"))

// Deus é +!
const app = express()

app.use(express.json())
app.use(cors())




app.listen(3003, ()=>{
    console.log("Servidor rodando na porta 3003")
})

app.get('/products', (req: Request, res: Response)=>{
    res.status(200).send(products)
})

app.get('/products/search', (req: Request, res: Response)=>{
    const q = req.query.q as string
    const result = products.filter((product)=>{
        return product.name.toLocaleLowerCase().includes(q.toLowerCase())
    })
    res.status(200).send(result)
})

app.get('/products', (req: Request, res: Response)=>{
    try {
        
        res.status(200).send(products)
    } catch (error) {
        console.log(error)
        if(res.statusCode === 200){
            res.status(500)
        }
        // res.send(error.message)
        
    }
})

app.get('/purchases', (req: Request, res: Response)=>{
    try {
        
        res.status(200).send(purchases)
    } catch (error) {
        console.log(error)
        if(res.statusCode === 200){
            res.status(500)
        }
        // res.send(error.message)
        
    }
})

app.get('/users', (req: Request, res: Response)=>{
    try {
        res.status(200).send(users)
            } catch (error:any) {
                console.log(error)
                if(res.statusCode === 200){
                    res.status(500)
                }
                res.send(error.message)
                
            }
})

app.get('/users/search', (req: Request, res: Response)=>{
    const q = req.query.q as string
    const result = users.filter((user)=>{
        return user.email.toLocaleLowerCase().includes(q.toLowerCase())
    })
    res.status(200).send(result)
})

// adicionar um product
app.post('/products',(req:Request, res: Response)=>{
    try {
        const {id, name, price, category} = req.body as TProduct
    
    const newProduct = {
        id,
        name,
        price,
        category
            }
    products.push(newProduct)
    const checkId = products.find((product)=>{
        return product.id === id
    })
        if(checkId ){
            res.status(400)
            console.log(" AQUI",checkId)
            throw new Error("Id já existente")
        }else if(req.body.id !=="Number"){
            res.status(400)
            throw new Error("Id precisa ser um número")

        }
    
    res.status(201).send("Product successfully added!")
        
    } catch (error: any) {
        console.log(error)
                if(res.statusCode === 200){
                    res.status(500)
                }
                res.send(error.message)     
    }
  
    
})

// Adição de usuário
app.post('/users',(req:Request, res: Response)=>{
    try {
        const {id, email, password} = req.body as TUser
    
    const newUser = {
        id,
        email,
        password
        }
    
    const checkId = users.find((user)=> user.id === req.body.id)
    
       if(checkId){
        throw new Error("Id já em uso")
       }
       const checkEmail= users.find((user)=> user.email === email)
    
       if(checkEmail){
        
        throw new Error("Este email já foi cadastrado")
       }

       users.push(newUser)
    res.status(201).send("User successfully added!")
        
    } catch (error) {
        console.log(error)
                if(res.statusCode === 200){
                    res.status(500)
                }
                res.send(error.message)     
    }

    
})

// Criação de Purchase

// resolução Mikio
// const totalPrice = (checkProductId[0].price) * (newPurchase.quantity)
//                 console.log(totalPrice)
//                 const checkTotalPrice = (totalPrice === newPurchase.totalPrice)
//                 console.log(checkTotalPrice)

app.post('/purchase', (req:Request, res:Response)=>{
    try {
        const {userId, productId, quantity,totalPrice}= req.body as TPurchase

        const newPurchase = {
            userId,
            productId,
            quantity, 
            totalPrice
        }
        console.log(newPurchase)

        const checkUserId = users.find((user)=> user.id === req.body.userId)
        const checkProductId = products.find((product)=> product.id === req.body.productId)

        if(!checkUserId){
            throw new Error("Este Id não consta no cadastro")
        }
        if(!checkProductId){
            throw new Error("Este Id de produto não consta")
        }
        if ((checkProductId.price * quantity) !== Number(totalPrice)){
            console.log(totalPrice, checkProductId.price, newPurchase.quantity)
            throw new Error("Valor Total incorreto")
        }
        purchases.push(newPurchase)
        res.status(201).send("Purchase cadastrada com sucesso")
    } catch (error) {
        console.log(error)
                if(res.statusCode === 200){
                    res.status(500)
                }
                res.send(error.message)  
        
    }
})

// Aprofundamento Express Exercicios

// Get Product by user id
app.get("/products/:id",(req: Request, res: Response)=>{
    try {
     const id = req.params.id
    const productFind = products.find((product)=>{
        return product.id === id
    })
    if (productFind){
        res.status(200).send(productFind)
    }else{
        res.status(404).send("Produto não encontrado")
    }
    } catch (error) {
        console.log(error)
                if(res.statusCode === 200){
                    res.status(500)
                }
                res.send(error.message)
    }
    
})

app.get("/purchases/:id",(req: Request, res: Response)=>{
    const id = req.params.id
    const purchasesFind = purchases.find((purchase)=>{
        return purchase.userId === id
    })
    if (purchasesFind){
        res.status(200).send(purchasesFind)
    }else{
        res.status(404).send("Produto não encontrado")
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
        return user.id === id
    })

    if (userEdited){
        userEdited.id = newId || userEdited.id    
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
    app.put("/products/:id",(req: Request, res: Response)=>{
        try {
            const id = req.params.id
    
        const newId = req.body.id as string | undefined
        const newName = req.body.name as string | undefined
        const newPrice = req.body.price as  number | undefined
        const newCategory = req.body.category as string | undefined
        
    
        const productEdited = products.find((product)=>{
            return product.id === id
        })
    
        if (productEdited){
            if(newId){
                if(newId.length>=2){
                   productEdited.id =newId
                   
                }else{
                    console.log(newId)
                    throw new Error("Id precisa ter ao menos dois caracteres")
                }
            }else{
                productEdited.id = productEdited.id
            }
            if(newName){
                if(newName.length>=3){
                    productEdited.name = newName
                }else{
                    throw new Error("Nome precisa ter ao menos três caracteres")
                }
            }else{
                productEdited.name = productEdited.name
            }
            if(newCategory){
                if(newCategory.length>=3){
                    productEdited.category = newCategory
                }else{
                    throw new Error("Categoria precisa ter ao menos três caracteres")
                }
            }else{
                productEdited.category = productEdited.category
            }
            productEdited.price = newPrice || productEdited.price
            res.status(200).send("Product atualizado com sucesso")
        }else{
            res.status(404).send("Product não encontrado")
        }
        } catch (error) {
            console.log(error)
            if(res.statusCode ===200){
                res.status(500)
            }
            res.send(error.message)
            
        }
        
        })
