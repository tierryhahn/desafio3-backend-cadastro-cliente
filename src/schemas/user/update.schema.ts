import * as yup from "yup"

const updateUserSchema = yup.object().shape({
    name: yup.string(),
    email: yup.string().email(),
    password: yup.string()
})

export default updateUserSchema