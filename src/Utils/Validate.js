export const checkValidateData = (email, password) => {
    const emailValidate = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);
    const passwordValidate = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(password);

    if (!emailValidate) return <p>Email ID is not valid</p>
    if (!passwordValidate) return <p>Password is not valid</p>

    return null;

}