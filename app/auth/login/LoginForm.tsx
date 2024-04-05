"use client";

import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import TextField from "@/components/TextField";
import Button from "@/components/Button";
import Image from "next/image";
import Spinner from "@/components/Spinner";
import { Divider } from "@mui/material";
import { SnackbarProvider, VariantType, enqueueSnackbar } from "notistack";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

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
        {
          res.error === "CredentialsSignin"
            ? ""
            : enqueueSnackbar(res.error, { variant: "error" });
        }
        return;
      }

      router.replace("/dashboard");
      setLoading(false);

      console.log(res);
    } catch (error) {
      setLoading(false);
      enqueueSnackbar("Something went wrong!", { variant: "error" });
      console.log(error);
    }
  };

  return (
    <SnackbarProvider maxSnack={3}>
      <div className='flex items-center'>
        <div className='w-1/2'>
          <Image
            src='/sign-In.png'
            width={500}
            height={100}
            alt='signIn logo'
            className='object-cover w-full h-screen'
          />
        </div>
        <div className='w-1/2'>
          <div className='mx-20 rounded-lg py-10 px-7 bg-[#1f102b]'>
            <h1 className='text-xl text-center font-bold mb-10'>SIGN IN</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
              <TextField
                id='email'
                type='text'
                name='email'
                value={email}
                placeholder='Email Address'
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

              <Link
                href='/auth/register'
                className='mt-5 text-center text-slate-400'>
                Don't have an account?{" "}
                <span className='text-white'>Create Account</span>
              </Link>
            </form>

            <Divider
              sx={{
                "&::before, &::after": {
                  borderColor: "secondary.light",
                },
                margin: "30px 0",
              }}>
              OR
            </Divider>
            <div className='flex items-center justify-center gap-5 mt-5'>
              <Image
                src='/Google.png'
                alt='Google logo'
                height={50}
                width={50}
              />
              <Image src='/Apple.png' alt='Apple logo' height={50} width={50} />
              <Image
                src='/Facebook.png'
                alt='Facebook logo'
                height={50}
                width={50}
              />
            </div>
          </div>
        </div>
      </div>
    </SnackbarProvider>
  );
}
