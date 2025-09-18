import * as yup from 'yup';

export const isStringRequired = (isRequired=true) => {
    return isRequired ? yup.string().required() : yup.string();
}

export const isNumberRequired = (isRequired=true) => {
    return isRequired ? yup.number().required() : yup.number();
}

export const isImageRequired = () => {
    return yup.array().min(1, "At least one image is required");
}

export const isArrayRequired = () => {
    return yup.array().min(1, "At least one feature is required");
}