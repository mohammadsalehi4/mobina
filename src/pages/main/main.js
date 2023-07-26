/* eslint-disable brace-style */
/* eslint-disable object-shorthand */
/* eslint-disable prefer-template */
/* eslint-disable space-infix-ops */
import React, {useEffect} from 'react'
import '../../app-assets/vendors/css/vendors-rtl.min.css'
import '../../app-assets/css-rtl/bootstrap-extended.css'
import '../../app-assets/css-rtl/components.css'
import '../../app-assets/css-rtl/themes/dark-layout.css'
import '../../app-assets/css-rtl/themes/semi-dark-layout.css'
import '../../app-assets/css-rtl/plugins/forms/form-validation.css'
import '../../app-assets/css-rtl/pages/authentication.css'
import '../../app-assets/css-rtl/custom-rtl.css'
// eslint-disable-next-line no-duplicate-imports
import '../../app-assets/vendors/css/vendors-rtl.min.css'
import '../../app-assets/css-rtl/core/menu/menu-types/vertical-menu.css'
import '../../app-assets/css-rtl/themes/bordered-layout.css'
import '../../app-assets/css-rtl/colors.css'
import './main.css'
import { serverAddress } from '../../address'
import toast from 'react-hot-toast'

const Main = () => {
    const login = async (event) => {
        
        const username = document.getElementById('login_username').value
        const password = document.getElementById('login_password').value
        //save username and password on local database

        //movaghati
        try {
            const response = await fetch(serverAddress, {
     
                method: "POST",
                 
                body: JSON.stringify({
                    username: username,
                    password: password
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
                })
                const getData = await response.json()
                if (getData.success===true) {
                    if (document.getElementById('remember_me').checked) {
                        if (username && password) {
                            localStorage.setItem('username', JSON.stringify(username))
                            localStorage.setItem('password', JSON.stringify(password))
                        }
                    }
                    window.location.assign('/researcher') 
                } else {
                    event.preventDefault()
                    toast.error('نام کاربری یا رمز عبور اشتباه است!', {
                        position: 'bottom-left'
                      })
                }
        } catch (error) {
            toast.error('عدم ارتباط با سرور!', {
                position: 'bottom-left'
              })
        }
        
    }
    

    useEffect(() => {
        if (localStorage.getItem('username') && localStorage.getItem('password')) {
            document.getElementById('login_username').value = JSON.parse(localStorage.getItem('username'))
            document.getElementById('login_password').value = JSON.parse(localStorage.getItem('password'))
        }
    }, [])
    return (
        <body id='main' class="vertical-layout vertical-menu-modern blank-page navbar-floating footer-static vazir " data-open="click" data-menu="vertical-menu-modern" data-col="blank-page">
            <div class="app-content content ">
                <div class="content-wrapper">
                    <div class="content-body">
                        <div class="auth-wrapper auth-cover">
                            <div class="auth-inner row m-0">
                                <a class="brand-logo" href="/">
                                    <h2 class="brand-text text-primary ms-1 vazir text-decoration-none">پنتا</h2>
                                </a>

                                <div class="d-flex col-lg-4 align-items-center auth-bg px-2 p-lg-5" id='login_form_content'>
                                    <div class="col-12 col-sm-8 col-md-6 col-lg-12 px-xl-2 mx-auto">
                                        <h2 class="card-title fw-bold mb-1 gray">به پنتا خوش آمدید!</h2>
                                        <form class="auth-login-form mt-5" onSubmit={(event) => { event.preventDefault() }}>
                                            <div class="mb-2 mt-3">
                                                <label class="form-label gray" for="login_username">نام کاربری</label>
                                                <input class="form-control login_form gray" id="login_username" type="text" name="login_username" placeholder="نام کاربری..." aria-describedby="login-email" autofocus="" tabindex="1" />
                                            </div>
                                            <div class="mb-2 mt-3">
                                                <div class="d-flex mt-2">
                                                    <label class="form-label gray" for="login_password">رمز عبور</label><a href="auth-forgot-password-cover.html " class='login_forgote_password_link text-primary'></a>
                                                </div>
                                                <div class="input-group input-group-merge form-password-toggle">
                                                    <input class="form-control form-control-merge login_form gray" id="login_password" type="password" name="login_password" placeholder="············" aria-describedby="login_password" tabindex="2" />
                                                </div>
                                            </div>
                                            <div class="mb-2 mt-3">
                                                <div class="form-check mt-2" id='login_remember_me'>
                                                    <input class="form-check-input " id="remember_me" type="checkbox" tabindex="3"/>
                                                    <label for="remember_me" className='gray vazir'>به خاطر داشته باش</label>
                                                </div>
                                            </div>
                                            <button class="btn btn-primary w-100 login_form" tabindex="4" onClick={login}>ورود</button>
                                        </form>
                                        <div class="d-flex mt-2">
                                           <a href="/recovery " class='login_forgote_password_link text-primary'><small>رمز عبور را فراموش کرده اید؟</small></a>
                                        </div>
                                    </div>
                                </div>
                                <div class="d-none d-lg-flex col-lg-8 align-items-center p-5" id='rightLoginBackground'>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    )
}


export default Main