Case study User Authentication System

Sources: 
https://webcss.hashnode.dev/how-to-setup-nodejs-server-for-authentication 
https://developer.mozilla.org/en-US/docs/Learn/Forms/Your_first_form 

Next steps: 
  get authentication data from single page application ?
    off GET /signin
    off GET /signup
  type script && es-modules
  2FA
  anti brute force
  user change password
  graphql api for authentication?
    mutation signup(input: UserSignup) {
      token
    }
    mutation signin(input: UserSignin) {
      token
    }

  start db and server together: docker-compose or 

  token
    token regenerate
      from user side?

script init
  generate db username and password
  generate token secret