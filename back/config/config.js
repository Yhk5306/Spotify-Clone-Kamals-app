module.exports= {
    MongoURI: 'mongodb+srv://user:your-password@cluster0.hhpxevk.mongodb.net/?retryWrites=true&w=majority',
    auth:{
        jwtSecret: process.env.JWT_SECRET || 'SECRET'
    }
}