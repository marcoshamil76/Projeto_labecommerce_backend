// import { stringify } from "querystring"
// import { TUser } from "./types"
// import { TProduct } from "./types"
// import { TPurchase } from "./types"

// enum Category {
//     BIKES = "Bikes",
//     PARTS = "Peças",
//     ACCESSORIES = "Accessories",
//     CLOTHES = "Clothes",
//     SECURITY= "Security"
// }

// export const users:TUser[]=[
//     {id:"01",
//     email:"wwoman@herois.com",
//     password:"wwoman123"},
//     {
//         id:"02",
//         email:"bwidow@herois.com",
//         password:"bwidow123"
//     },
//     {
//         id:"03",
//         email:"cmarvel@herois.com",
//         password:"cmarvel123"
//     }
// ] 

// export const products:TProduct[]=[
//     {id:"p01",
//     name:"Capacete",
//     price: 99,
//     category:Category.SECURITY
// },
// {id:"p02",
//     name:"Luvas",
//     price: 20,
//     category:Category.SECURITY
// },
// {id:"p03",
//     name:"Bretelle",
//     price: 98,
//     category:Category.CLOTHES
// }
//   ]
//   export const purchases:TPurchase[]=[
//     {
//         userId:"01",
//         productId:"p01",
//         quantity: 2,
//         totalPrice:198
//     },
//     {
//         userId:"02",
//         productId:"p01",
//         quantity: 1,
//         totalPrice:99
//     },
//     {
//         userId:"03",
//         productId:"p02",
//         quantity: 2,
//         totalPrice:40
//     }
//   ]

//   function imprimeTresCoresFavoritas():void {
//     const cor1:string = process.argv[2]
//     const cor2:string = process.argv[3]
//     const cor3:string = process.argv[4]
  
//     console.log([cor1, cor2, cor3])
//   }
  
//   imprimeTresCoresFavoritas()
  

//   export function addUsers(id:string,email:string, password:string ):string {
//     users.push({id,email,password})
//     return ("Cadastro realizado com sucesso!")
//   }

//   export function addUsers2(id:string, email:string,password:string): void{
//     const newUser: TUser = {
//         id: id,
//         email: email,
//         password: password
//     }
//     users.push(newUser)
//     console.log(users)
//   }

//   export function getAllProducts ():TProduct[]{
//     return products
//   }

//   export function getProductById(id:string):TProduct[] | undefined{
//     return products.filter((product)=>{
//         return product.id === id
//     })
//   }