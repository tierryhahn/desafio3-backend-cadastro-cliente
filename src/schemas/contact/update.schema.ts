import * as yup from "yup"

const updateSchema = yup.object().shape({
    name: yup.string().required(),
})

export default updateSchema