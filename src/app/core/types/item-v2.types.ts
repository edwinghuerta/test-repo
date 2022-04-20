export interface ItemV2 {
    title?:string,
    description?:string,
    price?:number
    imageUrl?:string,
    button?:Button,
    showArrow:boolean
}

export interface Button {
    state?:boolean,
    text?:string,
    clickable?:boolean,
    color?:string,
    borderColor?:string
}