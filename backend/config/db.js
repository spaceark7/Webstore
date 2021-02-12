import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      'mongodb+srv://webstore123:webstore123@webstore.auk2f.mongodb.net/webstore-dev?retryWrites=true&w=majority',
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
      }
    )

    console.log(process.env.MONGODB_URI)

    console.log(`MongoDB Connected @: ${conn.connection.host}`.green.underline)
  } catch (error) {
    console.error(`error: ${error}`.red.underline.bold)
    process.exit(1)
  }
}

export default connectDB
