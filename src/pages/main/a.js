/* eslint-disable no-use-before-define */
/* eslint-disable no-tabs */
import React, {Fragment, useEffect, useRef, useState} from 'react'
import PropTypes from 'prop-types'
import {Form, Input} from 'antd'
import {FormattedMessage, injectIntl} from 'react-intl'
import * as moment from 'moment'
import momentDurationFormatSetup from 'moment-duration-format'
import Avatar from '../../../components/avatar'
import Button from '../../../components/theme/button'
import Flex from '../../../components/flex'
import Icon from '../../../components/icon'
import Render from '../../../components/render'
import Notification from '../../../components/theme/notification'
import AuthWidget from '../../../widgets/auth-widget'
import {captureException, utils, validator} from '../../../../utility'
import style from './style.module.less'
import {TraineeRepository} from '../../../../repository'
import ROUTE_CONSTANTS_GUEST from '../../guest/constants'
import {useRouter} from 'next/router'
import {useSelector} from 'react-redux'
import {getAxiosConfig} from '../../../../utility/axiosHelper'
import {site_key} from '../../../../environment/env'
import ReCAPTCHA from 'react-google-recaptcha'
import {customizedQuery} from '../../../../utility/router'

momentDurationFormatSetup(moment)

const VerifyMobile = props => {
	const {intl} = props
	const router = useRouter()

	const host = useSelector(state => state.hostConfig.host)
	const utm = useSelector(state => state.utm)

	// let returnPath = [];

	const DELAY = 1500

	const [intervalID, setIntervalID] = useState(null)
	const [smsData, setSmsData] = useState({})
	const [userData, setUserData] = useState(null)
	const [smsExpired, setSmsExpired] = useState(false)
	const [showNotification, setShowNotification] = useState(false)
	const [remainingTime, setRemainingTime] = useState(false)
	const [notificationData, setNotificationData] = useState({
		type: null,
		title: null,
		description: null
	})

	const recaptchaRef = useRef()
	const [recaptchaToken, setRecaptchaToken] = useState('')
	const [recaptchaLoad, setRecaptchaLoad] = useState(false)
	// const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
	// const [recaptchaExpired, setRecaptchaExpired] = useState(false);

	useEffect(() => {
		// returnPath = router.query.returnpath
		// 	? [
		// 			{
		// 				returnpath: router.query.returnpath,
		// 			},
		// 	  ]
		// 	: [];

		setTimeout(() => {
			setRecaptchaLoad(true)
		}, DELAY)
	}, [])

	const recaptchaOnChange = token => {
		setRecaptchaToken(token)
		// if (token === null) setRecaptchaExpired(true);
	}

	const asyncScriptOnLoad = () => {
		recaptchaRef.current.execute()
		// 	.then(res => {
		// 	console.log("recaptchaRef.current.execute() response ==============>");
		// 	setRecaptchaLoaded(true);
		// }).catch(error => {
		// 	console.log("recaptchaRef.current.execute() error ==========>", error);
		// 	setRecaptchaLoaded(false);
		// });
	}

	const sendSms = recaptchaToken => {
		const postUtm = {
			cellphone: router.query.phone,
			['g_recaptcha_response']: recaptchaToken
		}
		for (const [key, value] of Object.entries(utm)) {
			if (value) {
				postUtm[key] = value
			}
		}
		if (router.query.phone) {
			TraineeRepository.user.auth
				.sendSmsLimited(postUtm, getAxiosConfig(host))
				.then(res => {
					setSmsData(res.data)
					setSmsExpired(false)
					handleCountDown(res.data.expire_time)
				})
				.catch(err => {
					captureException({
						messsage: `api limited got error! code:${err?.response?.status}`,
						err
					})
					if (err?.response?.status === 429) {
						handleCountDown(err.response?.data?.data.expire_time)
						setSmsExpired(false)
						setSmsData(err.response.data.data)
						
					} else {
						setSmsData(null)
						setSmsExpired(true)
						setShowNotification(true)
						setNotificationData({
							type: 'error',
							title: 'common.notification.error',
							description:
								'common.notification.error.sending_code'
						})
					}
				})
		}
	}

	useEffect(() => {
		if (recaptchaToken) {
			sendSms(recaptchaToken)
		}
	}, [recaptchaToken])

	const handleCountDown = _remainingTime => {
		let existTime = _remainingTime
		const countDowncurrent = setInterval(() => {
			const lastTime = moment
				.duration((existTime -= 1), 'seconds')
				.format('mm:ss')
			setRemainingTime(lastTime)
		}, 1000)
		setIntervalID(countDowncurrent)
	}

	useEffect(() => {
		if (remainingTime <= 0) {
			stopIntervals()
			setSmsExpired(true)
		}
	}, [remainingTime])

	const stopIntervals = () => {
		clearInterval(intervalID)
		setIntervalID(null)
	}

	const checkPhoneNumber = () => {
		TraineeRepository.user.auth
			.checkPhone(
				{
					cellphone: router.query.phone
				},
				getAxiosConfig(host)
			)
			.then(res => {
				setUserData(res.data)
			})
	}

	useEffect(() => {
		if (router.query.nextPath === 'change-password') {
			checkPhoneNumber()
		}
	}, [])

	const changePhoneNumber = () => {
		if (router.query.returnpath) {
			const queries = Object.keys(router.query).length ? {
						returnpath: router.query.returnpath,
						...customizedQuery(router.query)
				  } : {}
			return router.push({
				pathname: ROUTE_CONSTANTS_GUEST.AUTH.path,
				query: queries
			})
		}
		router.push({
			pathname: ROUTE_CONSTANTS_GUEST.AUTH.path
		})
	}

	const handleHistory = token => {
		stopIntervals()
		// const returnpath = router.query.returnpath || null;
		const queries = Object.keys(router.query).length ? {
					...(router?.query?.returnpath ? {returnpath: router?.query?.returnpath?.toString()} : {}),
					...customizedQuery(router.query)
			  } : {}

		if (router.query.nextPath === 'register') {
			router.push({
				pathname: ROUTE_CONSTANTS_GUEST.AUTH_REGISTER.url(
					router.query.phone
				),
				query: {
					...queries,
					token
				}
			})
		} else if (router.query.nextPath === 'change-password') {
			router.push({
				pathname: ROUTE_CONSTANTS_GUEST.AUTH_CHANGE_PASSWORD.url(
					router.query.phone
				),
				query: {
					token,
					...queries
				}
			})
		}
	}

	const onFinish = values => {
		TraineeRepository.user.auth
			.checkSmsCode(
				{
					token: smsData.token,
					code: values.code
				},
				getAxiosConfig(host)
			)
			.then(res => {
				setShowNotification(false)
				handleHistory(res.data.token)
			})
			.catch(error => {
				if (error.response.data.code === 2002) {
					setShowNotification(true)
					setNotificationData({
						type: 'error',
						title: 'common.notification.error',
						description: 'common.notification.error.verify_code'
					})
				}
			})
	}

	const hideNotification = () => {
		setShowNotification(false)
	}

	return (
		<React.Fragment>
			<Notification
				visible={showNotification}
				type={notificationData.type || null}
				title={notificationData.title || null}
				description={notificationData.description || null}
				onInvisible={hideNotification}
			/>
			<AuthWidget>
				<Form
					name="verify_mobile"
					onFinish={onFinish}
					className={style.form}
				>
					<Flex
						direction="column"
						justify="start"
						align="center"
						content="center"
						self="stretch"
					>
						<Flex
							className={style.icon}
							align="center"
							justify="center"
							content="center"
						>
							<Icon name="registeration" />
						</Flex>
						<Flex
							className={style.formTitle}
							align="center"
							justify="center"
							content="center"
						>
							<FormattedMessage id="common.login_and_register" />
						</Flex>

						<Render
							condition={userData}
							render={() => (
								<Fragment>
									<Avatar src={userData.avatar_url}>
										{[
											userData.first_name,
											userData.last_name
										].join(' ') || null}
									</Avatar>
									<Flex className={style.fullName}>
										{[
											userData.first_name,
											userData.last_name
										].join(' ')}
									</Flex>
								</Fragment>
							)}
						/>

						<Flex
							className={style.verifyText}
							align="center"
							justify="center"
							content="center"
							direction="column"
						>
							<span className={style.verifyText_title}>
								<FormattedMessage id="common.verification_code_insert" />
							</span>
							<span className={style.verifyText_subTitle}>
								<FormattedMessage id="common.resend_verify_code_sent" />
								<span className={style.verifyText_phone_num}>
									{router.query.phone.substring(3)}
								</span>
								<a
									onClick={() => changePhoneNumber()}
									id="GTM-CHANGE-CELL-BTN"
								>
									(
									<FormattedMessage id="common.change_num_phone" />
									)
								</a>
							</span>
						</Flex>
						<Flex
							className={style.alert}
							align="center"
							justify="center"
							content="center"
							direction="column"
						>
							<p>
								کاربر گرامی، در صوردت{' '}
								<span className={style.innerText}>
									عدم دریافت کد تایید پیامکی
								</span>
								، با پشتیبانی وبسایت به شماره ۰۲۱۷۴۳۰۲۳۶۵ در
								ارتباط باشید.
							</p>
							<a href={'tel:02174302365'}>
								<Button
									block
									className={utils.classes(
										style.supportBtn,
										style.btn
									)}
									icon={'support'}
									iconClassName={style.supportIcon}
								>
									تماس با پشتیبانی
								</Button>
							</a>
						</Flex>
						<Flex
							className={style.inputLabel}
							align="center"
							justify="center"
							content="center"
						>
							<FormattedMessage id="common.verify_code" />
						</Flex>
						<Flex
							align="center"
							justify="center"
							content="center"
							self="stretch"
							className={style.inputText}
						>
							<Form.Item
								name="code"
								rules={[
									validator.required(),
									validator.numeric(),
									validator.exactLength(5)
								]}
							>
								<Input
									placeholder={intl.formatMessage({
										id: 'common.placeholder.input_verify_code'
									})}
								/>
							</Form.Item>
						</Flex>
						<Render
							condition={recaptchaLoad}
							render={() => (
								<Flex self="stretch">
									<ReCAPTCHA
										style={{display: 'inline-block'}}
										theme="dark"
										size="invisible"
										sitekey={site_key}
										ref={recaptchaRef}
										onChange={recaptchaOnChange}
										asyncScriptOnLoad={asyncScriptOnLoad}
									/>
								</Flex>
							)}
						/>
						<Flex self="stretch">
							<Button
								type="primary"
								block
								className={utils.classes(
									style.submitBtn,
									style.btn
								)}
								htmlType="submit"
								disabled={!smsData}
								id="GTM-VERIFY-BTN"
							>
								<FormattedMessage id="common.continue" />
							</Button>
						</Flex>
						<Flex self="stretch">
							<Render
								condition={!smsExpired}
								render={() => (
									<Flex
										align="center"
										justify="center"
										content="center"
										direction="column"
										flex={1}
									>
										<div className={style.duration}>
											ارسال مجدد کد تا{' '}
											{remainingTime || '-'} دیگر
										</div>
									</Flex>
								)}
							/>
							<Render
								condition={smsExpired}
								render={() => (
									<Button
										block
										type={'default'}
										className={style.resendBtn}
										onClick={() => asyncScriptOnLoad()}
										disabled={!remainingTime}
										id="GTM-RESEND-CODE-BTN"
									>
										<FormattedMessage id="common.resend_verify_code" />
									</Button>
								)}
							/>
						</Flex>
					</Flex>
				</Form>
			</AuthWidget>
		</React.Fragment>
	)
}

VerifyMobile.propTypes = {
	intl: PropTypes.object.isRequired
}

export default injectIntl(VerifyMobile)
