import Button from "../Elements/Button";
import InputForm from "../Elements/Input";

const FormRegister = () => {
    return (
        <form action="">
        <InputForm 
        label="Full Name" 
        type="text" 
        placeholder="insert your fullname" 
        name="fullname"
        />
        <InputForm 
        label="Email" 
        type="email" 
        placeholder="6Z4qz@example.com" 
        name="email"
        />
        <InputForm 
        label="Password" 
        type="password" 
        placeholder="********" 
        name="password"
        />
        <InputForm 
        label="Confirm Password" 
        type="password" 
        placeholder="********" 
        name="confirmpassword"
        />
        <Button variant="bg-blue-600 w-full" >Register</Button>
      </form>
    );
}

export default FormRegister;