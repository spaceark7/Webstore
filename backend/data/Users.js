import bcrypt from 'bcryptjs'


const users = [
    {
        name: "Admin User",
        email: "admin@webstore.com",
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: "ujang",
        email: "ujang@pembeli.com",
        password: bcrypt.hashSync('123456', 10)
    },

    {
    name: "Siti",
    email: "siti@pembeli.com",
    password: bcrypt.hashSync('654321', 10)
    }
]

export default users
