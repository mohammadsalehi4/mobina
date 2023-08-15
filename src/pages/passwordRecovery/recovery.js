/* eslint-disable no-unused-vars */
/* eslint-disable brace-style */
/* eslint-disable object-shorthand */
/* eslint-disable prefer-template */
/* eslint-disable space-infix-ops */
import React, {useEffect, useState} from 'react'
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
import './recovery.css'
import { serverAddress } from '../../address'
import toast from 'react-hot-toast'
import axios from 'axios'
import UILoader from '@components/ui-loader'
import Spinner from '@components/spinner/Loading-spinner'

const Recovery = () => {
    const [Loading, SetLoading]=useState(false)

    const submit = (event) => {
        event.preventDefault()
        const username = document.getElementById('login_username').value
        const phone_number = document.getElementById('login_Number').value

        if (username === '' || phone_number === '') {
            return toast.error('مقادیر را به درستی وارد کنید!', {
                position: 'bottom-left'
            })
        } else {
            SetLoading(true)
            axios.post(serverAddress+"/accounts/recover_password/", {
                username:username,
                phone_number:phone_number
            })
            .then((response) => {
                if (response.data.Success === true) {
                    SetLoading(false)
                    return toast.success('رمز عبور با موفقیت ارسال شد.', {
                        position: 'bottom-left'
                    })
                } else {
                    SetLoading(false)
                    return toast.error('بازیابی ناموفق!', {
                        position: 'bottom-left'
                    })
                }
                SetLoading(false)
            })
            .catch((err) => {

                if (err.response.statusText === 'Unauthorized') {
                    SetLoading(false)
                    return toast.error('بازیابی ناموفق!', {
                        position: 'bottom-left'
                    })
                } else {
                    SetLoading(false)
                    return toast.error('بازیابی ناموفق!', {
                        position: 'bottom-left'
                    })
                }
                SetLoading(false)
            })
        }
    }
    
    return (
        <UILoader blocking={Loading} loader={<Spinner />}>
        <body id='main' class="vertical-layout vertical-menu-modern blank-page navbar-floating footer-static vazir " data-open="click" data-menu="vertical-menu-modern" data-col="blank-page">
            <div class="app-content content ">
                <div class="content-wrapper">
                    <div class="content-body">
                        <div class="auth-wrapper auth-cover">
                            <div class="auth-inner row m-0">
                                <div class="d-flex col-lg-4 align-items-center auth-bg px-2 p-lg-5" id='login_form_content'>
                                    <div class="col-12 col-sm-8 col-md-6 col-lg-12 px-xl-2 mx-auto">
                                        <h3 class="card-title fw-bold mb-1 gray">نام کاربری خود را وارد کنید.</h3>
                                        <form class="auth-login-form mt-5" onSubmit={(event) => { submit(event) }}>
                                            <div class="mb-2 mt-3">
                                                <label class="form-label gray" for="login_username">نام کاربری</label>
                                                <input class="form-control login_form gray " id="login_username" type="text" name="login_username" placeholder="نام کاربری..." aria-describedby="login-email" autofocus="" tabindex="1" />
                                            </div>
                                            <div class="mb-2 mt-3">
                                                <label class="form-label gray" for="login_username">شماره موبایل</label>
                                                <input class="form-control login_form gray " id="login_Number" type="text" name="login_Number" placeholder="شماره موبایل..." aria-describedby="login-email" autofocus="" tabindex="1" />
                                            </div>
                                            <button class="btn btn-primary w-100 login_form mt-2" tabindex="4">بازیابی</button>
                                        </form>
                                        <div class="d-flex mt-2">
                                           <a href="/ " class='login_forgote_password_link text-primary'><small>بازگشت به صفحه اصلی</small></a>
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
        </UILoader>
    )
}


export default Recovery