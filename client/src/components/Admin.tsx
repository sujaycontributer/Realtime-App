
export default function Admin() {
  return (
    <div className='w-full flex justify-center items-center bg-gray-200 h-screen p-4 text-black font-mono'>
        <div className='flex flex-col items-center gap-4  p-4 w-[50%]'>
                 <div>
                      <h1 className='text-xl font-semibold text-neutral-800 ml-8'>Create the room  </h1>
                      <input type="text" placeholder='459q3432fsf' className={`mt-4 px-4 py-3 w-[320px] rounded-xl border-2 focus:border-amber-700`}/>
                 </div>
                <button className='px-2 h-12 w-30 rounded-2xl cursor-pointer border-2 mx-auto border-violet-400'>
                    Create room
                </button>
        </div>
    </div>
  )
}
