export class PageResult<T> {
  readonly data: T[]
  readonly page: Page

  constructor(data: T[], page: Page) {
    this.data = data
    this.page = page
  }

  static toResult<T>(data: T[], page: Page): PageResult<T> {
    return new PageResult(data, page)
  }
}

export interface Page {
  currentPage: number
  itemsPerPage: number
  totalPages: number
  totalItems: number
}
