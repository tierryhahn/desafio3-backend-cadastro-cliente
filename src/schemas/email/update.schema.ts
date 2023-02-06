import * as yup from "yup"

const updateSchema = yup.object().shape({
    email: yup.string().email().required()
})

export default updateSchema