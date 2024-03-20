import {PropsWithChildren} from "react";

const HeaderLayout = () => {
    return (
        <>
            <section className={'text-3xl font-bold min-w-full bg-slate-100 p-2 flex justify-around '}>
                <div>TODO</div>
            </section>
        </>
    )
}

const FooterLayout = () => {
    return (
        <section className={'text-3xl font-bold min-w-full bg-slate-200 p-2 flex justify-around overflow-hidden'}>
            <section className={'flex-col justify-center items-center text-center text-xl'}>
                <div>Rado Figura</div>
                <div className={'text-xs uppercase'}>AMCEF Candidate Application Assignement</div>
            </section>
        </section>
    )
}

/**
 * Layout takes at minimum full screen of a device so it's constant
 * any sticky or floating elements could be defined here as well
 * i.e. Notification provider, Error boundaries,...
 * @param children anything that needs to be available relatively in main canvas
 */
const Layout = ({children}: PropsWithChildren) => {

    return (
        <div className={'relative min-h-screen min-w-screen flex flex-col justify-between card-center bg-slate-800 text-slate-800'}>
            <HeaderLayout/>
            <section className={'relative w-screen grow flex justify-center'}>
                {children}
            </section>
            <FooterLayout/>
        </div>
    )
}

export default Layout
