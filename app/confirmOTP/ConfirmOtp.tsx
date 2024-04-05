"use client";

import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import TextField from "@/components/TextField";
import Button from "@/components/Button";
import { SnackbarProvider, enqueueSnackbar } from "notistack";

export default function ConfirmOTP() {
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
        setError(true);
        console.log(res);
        {
          res.error === "CredentialsSignin"
            ? ""
            : enqueueSnackbar("Incorrect OTP provided.", { variant: "error" });
        }
        return;
      }

      router.replace("/dashboard");

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const { data: session } = useSession();
  console.log(session);

  return (
    <SnackbarProvider maxSnack={3}>
      <div className='grid place-content-center h-screen'>
        <div className='bg-[#1f102b]'>
          <div className='p-5 rounded-lg py-10'>
            <div className='m-5 text-center'>
              <h1 className='text-xl font-bold mb-5'>Enter OTP</h1>
              <p className='mb-7 '>
                We’ve sent an OTP code to your email <br /> User53684@gmail.com
              </p>
            </div>
            <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
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
                hidden={true}
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
              <p className='text-center my-2 text-slate-400'>
                We will resend in 59s
              </p>
              <div className='flex items-center justify-center'>
                <Button> Verify </Button>
              </div>

              <Link
                href='/auth/login'
                className='text-sm mt-3 text-center text-slate-400'>
                Already have an account?{" "}
                <span className='text-white'>Sign In</span>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </SnackbarProvider>
  );
}
