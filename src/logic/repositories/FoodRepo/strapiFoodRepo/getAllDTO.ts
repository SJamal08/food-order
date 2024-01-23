import { string } from "yup"
import { FoodPayload } from "../IFoodRepository"
import { Food } from "../../../model/Food"

export interface GetAllDTO {
    data: Daum[]
    meta: Meta
  }
  export interface GetOneDTO {
    data: Daum
    meta: Meta
  }
  
  export interface Daum {
    id: number
    attributes: Attributes
  }
  
  export interface Attributes {
    id?: number
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
    const foods = dto.data.map( (element: any) => {
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

  export function getOneFoodFromDTO(dto: GetOneDTO): Food {
    console.log("in getOneFoodFromDTO")
    console.log(dto)
        const {Title: title, Description:description, Price: price, img, calories} = dto.data.attributes; 
        const food: Food = {
            id: dto.data.id,
            title,
            description,
            price,
            calories,
            img
        };
        return food;
  }

  export function formatDataFromFood(food: FoodPayload): { Title: string, Description: string, Price: number, img: string, calories: number } {
    const {title: Title, description: Description, price: Price, img, calories} = food; 
    const newPayload = {
        Title,
        Description,
        Price,
        calories,
        img
    };
    return newPayload;

  }