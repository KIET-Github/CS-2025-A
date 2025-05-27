export const checkValidForm=(email,password)=>{
    // eslint-disable-next-line 
    // const isNameValid=/\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/.test(name);
    // eslint-disable-next-line 
    const isEmailValid=/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    const isPasswordValid=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
    
    if(!isEmailValid)return("Email is not valid");
    if(!isPasswordValid)return("Password is not valid");
    // if(!isNameValid)return("Name is not valid");
    return null;
}