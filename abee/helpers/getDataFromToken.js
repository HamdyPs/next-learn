import jwt from 'jsonwebtoken'

export const getDataFromToken = (req) => {
  try {
    const token = req.cookies.get("token")?.value || ""
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
    return decodedToken
  } catch (error) {
    throw new Error(error.message)
  }
}