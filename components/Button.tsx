import { useFormStatus } from "react-dom";

function Button({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { pending } = useFormStatus();
  return (
    <>
      <button
        aria-disabled={pending}
        type='submit'
        className='bg-[#7E008B] rounded-lg text-slate-200 font-bold cursor-pointer px-6 py-2'>
        {children}
      </button>
    </>
  );
}

export default Button;
