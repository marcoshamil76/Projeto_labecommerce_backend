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
import { TProduct } from "./types"

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
    res.status(200).send(products)
})

app.get('/users', (req: Request, res: Response)=>{
    res.status(200).send(users)
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
  
    const {id, name, price, category} = req.body as TProduct
    
    const newProduct = {
        id,
        name,
        price,
        category
            }
    products.push(newProduct)
    res.status(201).send("Product successfully added!")
})

// Aprofundamento Express Exercicios

app.get("/products/:id",(req: Request, res: Response)=>{
    const id = req.params.id
    const productFind = products.find((product)=>{
        return product.id === id
    })
    if (productFind){
        res.status(200).send(productFind)
    }else{
        res.status(404).send("Produto não encontrado")
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


app.delete("/users/:id",(req: Request, res: Response)=>{
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
})

app.delete("/products/:id",(req: Request, res: Response)=>{
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
})

app.put("/users/:id",(req: Request, res: Response)=>{
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
    })


    app.put("/products/:id",(req: Request, res: Response)=>{
        const id = req.params.id
    
        const newId = req.body.id as string | undefined
        const newName = req.body.name as string | undefined
        const newPrice = req.body.price as  number | undefined
        const newCategory = req.body.category as string | undefined
        
    
        const productEdited = products.find((product)=>{
            return product.id === id
        })
    
        if (productEdited){
            productEdited.id = newId || productEdited.id    
            productEdited.name = newName || productEdited.name
            productEdited.price = newPrice || productEdited.price
            productEdited.category = newCategory || productEdited.category
            res.status(200).send("Product atualizado com sucesso")
        }else{
            res.status(404).send("Product não encontrado")
        }
        })
