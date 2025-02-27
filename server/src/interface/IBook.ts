export interface IBook {
  _id: string;
  title: string;
  author: string;
  price: number;
  stock: number;
  soldCount: number;
}

export interface IBookQueryParams {
  page?: string;
  title?: string;
  author?: string;
}