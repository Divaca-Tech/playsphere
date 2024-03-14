"use client";

import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import TextField from "@/components/TextField";
import Button from "@/components/Button";
import Image from "next/image";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    OTP: "",
  });

  const [error, setError] = useState(false);

  const router = useRouter();

  const { email, OTP } = formData;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await signIn("confirm-otp", {
        email,
        OTP,
        redirect: false,
      });

      if (res?.error) {
        console.log(res);
        setError(true);
      } else {
        router.replace("/dashboard");
      }

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const { data: session } = useSession();
  console.log(session);

  return (
    <div className='flex items-center justify-center space-x-36 mt-20'>
      <Image src='/logo.png' width={200} height={10} alt='playsphere logo' />
      <div className='w-2/5'>
        <div className='shadow-md shadow-slate-200 p-5 rounded-lg py-10'>
          <div className='m-5'>
            <h1 className='text-xl font-bold mb-5'>OTP Confirmation</h1>
            <p className='mb-7'>Please confirm the OTP sent to your email.</p>
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
              //   hidden={true}
              handleChange={handleChange}
            />
            <TextField
              id='OTP'
              type='text'
              name='OTP'
              value={OTP}
              placeholder='OTP Code'
              errorText={error && OTP.length === 0 && "Please enter your OTP"}
              error={error}
              handleChange={handleChange}
            />
            <div className='flex items-center justify-center'>
              <Button> Confirm OTP </Button>
            </div>

            <Link href='/register' className='text-sm mt-3 text-center'>
              Don't have an account? <span className='underline'>Register</span>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
