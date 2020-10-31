export const checkExist = (any: any, errorMessage: string) => {
  if (any)
    throw new Error(errorMessage)
}