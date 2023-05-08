import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'raunak1',
        email: 'raunak1@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
    },
    {
        name: 'raunak2',
        email: 'raunak2@gmail.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'raunak3',
        email: 'raunak3@gmail.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'raunak4',
        email: 'raunak4@gmail.com',
        password: bcrypt.hashSync('123456', 10),
    },
]

export default users;