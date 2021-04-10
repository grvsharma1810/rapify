export const fakeAuthAPI = (dummyUserData, email, password) => {
    const user = dummyUserData.find(user => user.email === email)
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (user && user.password === password) {
                resolve({ success: true, status: 200, body: { user } })
            } reject({ success: false, status: 401 })
        }, 1000)
    })
}