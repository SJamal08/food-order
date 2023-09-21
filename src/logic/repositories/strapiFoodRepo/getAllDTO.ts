import { Food } from "../../model/Food"

export interface GetAllDTO {
    data: Daum[]
    meta: Meta
  }
  
  export interface Daum {
    id: number
    attributes: Attributes
  }
  
  export interface Attributes {
    Title: string
    Description: string
    Price: number
    img: string
    createdAt: string
    updatedAt: string
    publishedAt: string,
    calories: number
  }
  
  export interface Meta {
    pagination: Pagination
  }
  
  export interface Pagination {
    page: number
    pageSize: number
    pageCount: number
    total: number
  }
  
  export function getFoodsFromDTO(dto: GetAllDTO): Food[] {
    const foods =dto.data.map( element => {
        const {Title: title, Description:description, Price: price, img, calories} = element.attributes; 
        const food: Food = {
            id: element.id,
            title,
            description,
            price,
            calories,
            img
        };
        return food;
  })
  return foods;
  }