export const isPhone = (phone: string) => /^1[3456789]\d{9}$/.test(phone)

export const isPassword = (password: string) => /^[a-zA-Z0-9]{7,10}$/.test(password)

export const isNoValue = (value: unknown) => {
  if (value === null) return true
  if (value === undefined) return true
  if (typeof value === 'string' && !value) return true
  return false
}
