"use client";

import Link from "next/link";
import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import TextField from "@/components/TextField";
import Button from "@/components/Button";
import Image from "next/image";
import Spinner from "@/components/Spinner";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    password2: "",
  });

  const [errorText, setErrorText] = useState("");
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
      setErrorText("Passwords do not match");
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
          return setErrorText(res.error);
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
    <div className='flex items-center justify-center space-x-36'>
      <Image src='/logo.png' width={200} height={10} alt='playsphere logo' />
      <div className='h-screen w-2/5 '>
        <div className='shadow-md shadow-slate-300 rounded-lg py-10'>
          <div className='m-5'>
            <h1 className='text-xl font-bold mb-5'>CREATE ACCOUNT</h1>
            <p className='mb-10'>Enter your personal information</p>
          </div>

          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <TextField
              id='name'
              type='text'
              name='name'
              value={name}
              placeholder='Full Name'
              errorText={error && name.length === 0 && "Please enter your name"}
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
            {errorText && (
              <div className='bg-red-500 text-white text-sm rounded-md mt-2 w-fit p-3'>
                {errorText}
              </div>
            )}

            <Link href='/' className='text-sm mt-3 text-center'>
              Already have an account? <span className='underline'>Login</span>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
