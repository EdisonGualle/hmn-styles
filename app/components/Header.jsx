 import Link from "next/link"

const Header = () => {
    const menulist= [
        {
            name: 'Inicio',
            link: ''
        },
        {
            name: 'Sobre Nosotros',
            link: '/sobre-nosotros'
        },
        {
            name: 'Contactanos',
            link: '/contactanos'
        },
    ]
  return (
    <div className="py-4 px-14 border-b flex items-center justify-between">
        <img className="h-9" src="/logo.png" alt="Logo" />
        <div className="flex gap-4 items-center font-semibold">
            {menulist?.map((item, index)=>{
                return <Link href={item?.link} key={index}>
                    <button>{item?.name}</button>
                </Link>
            })}
        </div>

        {/* Ingresar*/}
        <Link href={'/login'}>
            <button className="bg-blue-600 px-5 font-bold py-2 rounded-full text-white">Ingresar</button>
        </Link>
    </div>
  )
}

export default Header


