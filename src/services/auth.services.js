import axios from 'axios'
const host = "http://localhost:8080/api/v1/auth";

// sign up
const signUp = (userName,password,firstName,email,phone,address) => {
    return axios
    .post(host + "/signup",{
        userName,
        password,
        firstName,
        email,
        phone,
        address
    })
    .then((res) => {
        
        return res.data
    });
};


//sign in
const login = (userName,password ) => {
    
    return axios
    .post(host + "/signin",{
        userName,
        password
    })
    .then((res) => {
        console.log(res)
        if(res.data.jwtToken){
            localStorage.setItem("user", JSON.stringify(res.data));
        }
        

        

        return res.data
    });
}

// logout
const logout = () => {
    localStorage.removeItem("user");
}

// get logged user
const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
}

// exporting auth service
const authService = {
    signUp,
    login,
    logout,
    getCurrentUser
};

export default authService;