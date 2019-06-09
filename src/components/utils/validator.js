const validateEmail = email => {
  var re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  return re.test(email)
}

const validatePass = pass => {
  var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/
  return re.test(pass)
}

export const validateRegisterForm = (email, pass1, pass2) => {
  return new Promise((resolve, reject) => {
    if (!validateEmail(email)) {
      reject(new Error("Email is invalid."))
    }
    if (!validatePass(pass1)) {
      reject(new Error(`
      Password must have:
      at least one number, one lowercase and one uppercase letter
      at least eight characters.
      `))
    }
    if (pass1 !== pass2) {
      reject(new Error('Passwords do not match.'))
    }
    resolve()
  })
}