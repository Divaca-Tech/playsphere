"use client";

import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import TextField from "@/components/TextField";
import Button from "@/components/Button";
import Image from "next/image";
import Spinner from "@/components/Spinner";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorText, setErrorText] = useState("");

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const { email, password } = formData;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await signIn("login-credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError(true);
        setLoading(false);
        console.log(res);
        return setErrorText(res.error);
      }

      router.replace("/dashboard");
      setLoading(false);

      console.log(res);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className='flex items-center justify-center space-x-36 mt-20'>
      <Image src='/logo.png' width={200} height={10} alt='playsphere logo' />
      <div className='w-2/5'>
        <div className='shadow-md shadow-slate-200 p-5 rounded-lg py-10'>
          <div className='m-5'>
            <h1 className='text-xl font-bold mb-5'>SIGN IN</h1>
            <p className='mb-7'>Welcome Back!</p>
          </div>
          <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
            <div className='w-fit text-blue-200'></div>
            <TextField
              id='email'
              type='text'
              name='email'
              value={email}
              placeholder='Email'
              errorText={
                error && email.length === 0 && "Please enter your email"
              }
              error={error}
              handleChange={handleChange}
            />
            <TextField
              id='password'
              type='password'
              name='password'
              value={password}
              placeholder='Password'
              errorText={
                error && password.length === 0 && "Please enter your password"
              }
              error={error}
              handleChange={handleChange}
            />
            <div className='flex items-center justify-center'>
              <Button>{loading ? <Spinner /> : "SIGN IN"}</Button>
            </div>

            {/* {error && (
              <div className='bg-red-500 text-white text-sm rounded-md mt-2 w-fit p-5'>
                {errorText}
              </div>
            )} */}

            <Link href='/register' className='text-sm mt-3 text-center'>
              Don't have an account? <span className='underline'>Register</span>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
