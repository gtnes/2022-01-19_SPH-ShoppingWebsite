
// 存储token到本地存储中
export const setToken = (token) => {
    localStorage.setItem("TOKEN", token)
}

// 从本地存储中获取token
export const getToken = () => {
    return localStorage.getItem("TOKEN")
}

// 清除本地token
export const removeToken = () => {
    localStorage.removeItem("TOKEN")
}