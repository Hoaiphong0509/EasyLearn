export const isServer = typeof window === 'undefined'

export const isRequired = (value) => (value ? true : false)

export const isName = (name) => {
  const re = /^(?=.*)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z]{6,}$/
  return re.test(String(name))
}

export const isPassword = (password) => {
  const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
  return re.test(String(password))
}

export const isEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

export const isPhoneNumber = (phone) => {
  const phoneno = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
  return phone.match(phoneno)
}

export const getCodeYoutube = (value) => {
  const REGEX = /v=(\w+)/
  const res = value.match(REGEX)
  return res[1]
}
