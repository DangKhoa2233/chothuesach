import React from 'react'

export const Footer = () => {
  return (
    <div className="bg-[#1b1b1b] p-[30px] lg:p-[40px] min-h-[300px] text-white mb-[60px] lg:mb-0">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[30px] h-full">
            <div>

            </div>
            <div className="flex flex-col items-center justify-around min-h-[220px]">
                <img src="/images/fly.png" className="w-[230px]"/>
                <p className="text-[25px]">@Fly Room</p>
            </div>
        </div>
    </div>
  )
}
