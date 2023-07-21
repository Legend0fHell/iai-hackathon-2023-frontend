import { Navbar } from '../../common/Navbar/Navbar'
import { Footer } from '../../common/Footer/Footer'


export default function Layout({ children, user_data }) {
    return (
        <>
            <Navbar userData={user_data} />
                <main>{children}</main>
            <Footer />
        </>
    )
}