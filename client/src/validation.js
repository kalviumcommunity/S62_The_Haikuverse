const  validationFormObject = {
    validateName: (name) => {
        const nameRegex = /^[a-zA-Z\s]+$/;
        if (name.length < 2) {
            return 'Name cannot be less than 2 letters';
        }
        if (nameRegex.test(name) == false) {
            return 'Name should not have any symbols';
        }
        return true;
    },
    validatePass: (password) => {
        const passwordRegex = {
            minLength: 8,
            maxLength: 128,
            hasUpperCase: /[A-Z]/,
            hasLowerCase: /[a-z]/,
            hasSpecialChar: /[!"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~]/,
        };
        if (password.length < passwordRegex.minLength) {
            return 'Password should be more than equal to 8 characters';
        }

        if (password.length > passwordRegex.maxLength) {
            return 'Password should be less than 128 characters';
        }

        if (passwordRegex.hasLowerCase.test(password) == false) {
            return 'Password should have some LowerCase character a-z';
        }
        if (passwordRegex.hasUpperCase.test(password) == false) {
            return 'Password should have some UpperCase character A-Z';
        }
        if (passwordRegex.hasSpecialChar.test(password) == false) {
            return 'Password should have at least 1 special character';
        }

        return true;
    },
    validateEmail: (email) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (email.length > 254) {
            return { isValid: false, error: 'Email is too long' };
        }
    
        if (emailRegex.test(email) == false) {
            return 'Write the email in correct format name@example.com';
        }
    
        return true;
    },
}    

export default validationFormObject;