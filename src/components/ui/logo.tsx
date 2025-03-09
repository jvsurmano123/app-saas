import { PawPrint } from 'lucide-react'

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="relative h-8 w-8">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-600 to-blue-400 shadow-lg" />
        <div className="absolute inset-0.5 rounded-[10px] bg-white" />
        <div className="absolute inset-1.5 rounded-lg bg-gradient-to-br from-blue-600 to-blue-400" />
        <svg
          className="absolute inset-0 h-full w-full p-1.5 text-white"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.75 9.5C6.75 7.70507 8.20507 6.25 10 6.25C11.7949 6.25 13.25 7.70507 13.25 9.5C13.25 11.2949 11.7949 12.75 10 12.75C8.20507 12.75 6.75 11.2949 6.75 9.5Z"
            fill="currentColor"
          />
          <path
            d="M14 15.75C14 14.5074 12.9926 13.5 11.75 13.5H8.25C7.00736 13.5 6 14.5074 6 15.75V17.25H14V15.75Z"
            fill="currentColor"
          />
          <path
            d="M12.75 7C12.75 5.20507 14.2051 3.75 16 3.75C17.7949 3.75 19.25 5.20507 19.25 7C19.25 8.79493 17.7949 10.25 16 10.25C14.2051 10.25 12.75 8.79493 12.75 7Z"
            fill="currentColor"
          />
          <path
            d="M20 13.25C20 12.0074 18.9926 11 17.75 11H14.25C13.0074 11 12 12.0074 12 13.25V14.75H20V13.25Z"
            fill="currentColor"
          />
        </svg>
      </div>
      <div className="flex flex-col">
        <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
          VetCare
        </span>
      </div>
    </div>
  )
} 