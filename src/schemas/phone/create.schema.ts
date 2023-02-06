import * as yup from "yup"

const createPhoneSchema = yup.object().shape({
    phones: yup.array().of(yup.string().matches(
        /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/,
        "The telephones must be valid and contain the ddd before the number").required()).required()
})

export default createPhoneSchema