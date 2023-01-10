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

app.get('/users', (req: Request, res: Response)=>{
    res.status(200).send(products)
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