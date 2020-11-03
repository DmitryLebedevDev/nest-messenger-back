export const check = (any: any, errorMessage: string) => {
  if (any)
    throw new Error(errorMessage)
}