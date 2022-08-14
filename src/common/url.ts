export const baseUrl = 'https://localhost:7042'

export const getLoginByNameUrl = () => baseUrl + "/api/UserLogin/log"

export const getLoginByTokenUrl = () => baseUrl + "/api/UserLogin/refresh"

export const getRegisterUrl = () => baseUrl + "/api/UserLogin/reg"

export const getLogout = () => baseUrl + "/api/UserLogin/logout"

export const getAllBooksUrl = () => baseUrl + "/api/Book/get/all-books"

export const getCreateBooksUrl = () => baseUrl + "/api/Book/create/book"

export const getUpdateBooksUrl = () => baseUrl + "/api/Book/update/book"

export const getDeleteBooksUrl = (id: number) => baseUrl + "/api/Book/delete/book/" + id

export const getCreateTagsUrl = () => baseUrl + "/api/Book/create/tag"

export const getAllTagsUrl = () => baseUrl + "/api/Book/get/tags"