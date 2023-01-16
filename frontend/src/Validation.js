

function Validation(name, email, phone, password) {

    let errors = {};

    if(!name){
        errors.name="Name is required"
    }
    if(!email){
        errors.email="Email is required"
    }else if(!/\S+@\S+\.\S+/.test(email)){
        errors.email="Email is Invalid"
    }
    if(!phone){
        errors.phone="Phone Number is required"
    }else if(phone.length < 10){
        errors.phone="Phone Number should be 10 digit"
    }
    if(!password){
        errors.password="Password is required"
    }else if(password.length < 6){
        errors.password="Password should be at least 6 characters"
    }
    

  return (
    errors
  )
}

export default Validation