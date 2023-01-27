export type TUser = {
    id: string,
    name: string,
    email: string,
    password: string,
    created_at: string

}

export type TProduct = {
    id:string,
    name:string,
    price: number,
    description: string,
    image_url: string
}

export type TPurchase = {
    id: string,
    buyer_id: string,
    total_price: number,
    created_at: string,
    paid: number
    }

export type TPurchase_product ={
    purchase_id: string,
    product_id: string,
    quantity: number
}