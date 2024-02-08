import {useRouter} from "next/router";
import {useState} from "react";
import s from "../styles/SignIn.module.css";
import Link from 'next/link';

const Login = () => {
    const router = useRouter()
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async () => {
        try {
            const res = await fetch("http://localhost:3030/users/login", {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name, password
                })
            });
            if (res.status === 200) {
                console.log("login ok!!!");
                router.push('/home');
            } else {
                console.error("Login failed");
            }
        } catch (e) {
            console.error("error::", e.message)
        }
    };

    const handleSignUp = async () => {
        console.log("ID:", name, "新規登録");
        router.push('/signup');
    };

    return(
        <>
            <main className={s.all}>
                <div className={s.boxLarge}>
                    <h1 className={s.login}>LogIn</h1>

                    <p><input
                        type="text"
                        placeholder= "User ID"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={s.box}/></p>

                    <p><input type="password" minLength="8" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} className={s.box}/></p>
                    <div className={s.container}>
                        <p><input type="submit" value="LogIn" onClick={handleSubmit} className={s.login_button} /></p>
                        <p><input type="submit" value="SignUp" onClick={handleSignUp} className={s.signup_button} /></p>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Login;