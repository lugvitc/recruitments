
export default function Card({ children, className }: {children: React.ReactNode, className: string }) {
    return (
        <div className={"py-4 px-6 border-2 border-[#202020] backdrop-blur-sm rounded-md " + className}>
            {children}
        </div>
    )
}