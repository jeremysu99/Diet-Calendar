import '@/styles/globals.css'
import Navbar from '@/components/navbar-component/navbar'
import LoginForm from '../components/login-component/LoginForm'

export default function App({ Component, pageProps }){
    return(
        <div>
            <Component {...pageProps} />
        </div>
    )
}
