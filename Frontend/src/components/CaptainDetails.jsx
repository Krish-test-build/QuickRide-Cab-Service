import React from 'react'

const CaptainDetails = (props) => {
  return (
    <div className='bg-white p-2 rounded-t-xl pt-4'>
          <div className="w-full max-w-md">
            <div className="flex flex-col justify-between items-center mb-4 ">
              
              <div className='flex items-start  justify-between gap-20'>
                <div className='inline-flex gap-4 mt-4 items-center'>
                  <img className='w-13 h-13 rounded-full object cover' src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cG9ydHJhaXR8ZW58MHwyfDB8fHww" alt="" />
                <h4 className='text-xl font-medium'> Lorem ipsum</h4>
                </div>
              <div className='mb-4 flex flex-col mt-5'>
                <h4 className='text-xl text-black font-semibold'>₹300.2</h4>
                <p className='text-base text-gray-400'>Earned</p>
              </div>
              </div>
              <div className=' inline-flex p-4   text-center  font-medium bg-[#ededed] rounded-2xl'>
                <div className='flex flex-col mr-5'>
                  <svg className='h-8 w-8 self-center' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM13 12H17V14H11V7H13V12Z"></path></svg>
                  <h4 className=' text-xl font-semibold'>10.2</h4>
                  <h4 className='text-gray-400'>Total Hours</h4>
                  </div>

                <div className='flex flex-col mr-5 ml-1'>
                  <svg className='h-8 w-8 self-center' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20 13C20 15.2091 19.1046 17.2091 17.6569 18.6569L19.0711 20.0711C20.8807 18.2614 22 15.7614 22 13 22 7.47715 17.5228 3 12 3 6.47715 3 2 7.47715 2 13 2 15.7614 3.11929 18.2614 4.92893 20.0711L6.34315 18.6569C4.89543 17.2091 4 15.2091 4 13 4 8.58172 7.58172 5 12 5 16.4183 5 20 8.58172 20 13ZM15.293 8.29297 10.5 12.5 12.5 14.5 16.7072 9.70718 15.293 8.29297Z"></path></svg>
                  <h4 className=' text-xl font-semibold' >30K</h4>
                  <h4 className='text-gray-400'>Total Distance</h4>

                </div>
                <div className='flex flex-col ml-4'>
                  <svg className='h-8 w-8 self-center' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20.0049 2C21.1068 2 22 2.89821 22 3.9908V20.0092C22 21.1087 21.1074 22 20.0049 22H4V18H2V16H4V13H2V11H4V8H2V6H4V2H20.0049ZM8 4H6V20H8V4ZM20 4H10V20H20V4Z"></path></svg>
                  <h4 className=' text-lg font-semibold'>None</h4>
                  <h4 className='text-gray-400'>Notes</h4>

                </div>
              </div>
              
              

          </div>
          </div>
        </div>
  )
}

export default CaptainDetails