import { Navbar } from '../../common/Navbar/Navbar'
import { Footer } from '../../common/Footer/Footer'


export default function Layout({ children }) {
    return (
        <>
            <Navbar />
                <main>{children}</main>
            <Footer />
        </>
    )
}