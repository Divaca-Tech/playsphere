"use client";

import Link from "next/link";
import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import TextField from "@/components/TextField";
import Button from "@/components/Button";
import Image from "next/image";
import Spinner from "@/components/Spinner";
import { Divider } from "@mui/material";
import { SnackbarProvider, enqueueSnackbar } from "notistack";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    password2: "",
  });

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const { name, email, phoneNumber, password, password2 } = formData;

  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== password2) {
      enqueueSnackbar("Passwords do not match", { variant: "error" });
      return;
    } else {
      try {
        setLoading(true);
        const res = await signIn("register-credentials", {
          name,
          email,
          password,
          phoneNumber,
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

        router.replace("/confirmOTP");
        setLoading(false);
        console.log(res);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
  };

  return (
    <SnackbarProvider maxSnack={3}>
      <div className='flex items-center'>
        <div className='w-1/2'>
          <Image
            src='/register.png'
            width={500}
            height={100}
            alt='signUp image'
            className='object- w-full'
          />
        </div>
        <div className='w-1/2'>
          <div className='mx-20 mt-20 rounded-lg py-10 px-7 bg-[#1f102b]'>
            <h1 className='text-xl text-center font-bold mb-10'>SIGN UP</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
              <TextField
                id='name'
                type='text'
                name='name'
                value={name}
                placeholder='Full Name'
                errorText={
                  error && name.length === 0 && "Please enter your name"
                }
                error={error}
                handleChange={handleChange}
              />
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
                id='phoneNumber'
                type='number'
                name='phoneNumber'
                value={phoneNumber}
                placeholder='Phone Number'
                errorText={
                  error &&
                  phoneNumber.length !== 11 &&
                  "Please enter a correct phone number (11 digits)"
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
                  error &&
                  password.length < 6 &&
                  "Please enter more than 6 characters"
                }
                error={error}
                handleChange={handleChange}
              />
              <TextField
                id='password2'
                type='password'
                name='password2'
                value={password2}
                placeholder='Confirm Password'
                errorText=''
                error={error}
                handleChange={handleChange}
              />
              <div className='flex items-center justify-center'>
                <Button>{loading ? <Spinner /> : "SIGN UP"}</Button>
              </div>

              <Link
                href='/auth/login'
                className='mt-5 text-center text-slate-400'>
                Already have an account?{" "}
                <span className='text-white'>Sign In</span>
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
