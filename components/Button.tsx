function Button({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <button className='bg-[#7E008B] rounded-lg text-slate-200 font-bold cursor-pointer px-6 py-2'>
        {children}
      </button>
    </>
  );
}

export default Button;
