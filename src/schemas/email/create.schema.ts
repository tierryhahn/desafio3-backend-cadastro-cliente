import * as yup from "yup"

const createSchema = yup.object().shape({
    emails: yup.array().of(yup.string().email().required().required())
})

export default createSchema