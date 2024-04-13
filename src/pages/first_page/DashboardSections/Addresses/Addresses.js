import React from 'react'

import { Row, Col } from 'react-bootstrap'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import imgCard from '../../images/crypto-wallet.png'

import '../Entities/Entities.css'

const Addresses = () => {
    
    return (
        <div className='mt-5'>
            <Row className='g-3'>

                <Col lg={6} xl={8} className='order-1 order-lg-2'>
                    <Card style={{}}>
                        <CardContent>
                            <div className='d-flex justify-content-between'>
                                <p className='entities-text'>محدودیت‌ها در یک نگاه</p>
                                <p className='small-text-entities'>
                                   
                                در لحظه
                                    
                                    <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 20 20" style={{paddingRight:'5px'}}>
                                        <g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
                                            <path d="M5.604 5.45a6.44 6.44 0 0 0-1.883 5.278a.5.5 0 0 1-.994.105a7.44 7.44 0 0 1 2.175-6.096c2.937-2.897 7.675-2.85 10.582.098c2.907 2.947 2.888 7.685-.05 10.582a7.425 7.425 0 0 1-5.097 2.142a7.527 7.527 0 0 1-2.14-.271a.5.5 0 0 1 .266-.964a6.524 6.524 0 0 0 1.856.235a6.424 6.424 0 0 0 4.413-1.854c2.541-2.506 2.562-6.61.04-9.168c-2.522-2.558-6.627-2.594-9.168-.088"></path>
                                            <path d="M3.594 11.363a.5.5 0 0 1-.706.04l-1.72-1.53a.5.5 0 1 1 .664-.746l1.72 1.53a.5.5 0 0 1 .042.706"></path>
                                            <path d="M2.82 11.3a.5.5 0 0 0 .7.1l2-1.5a.5.5 0 1 0-.6-.8l-2 1.5a.5.5 0 0 0-.1.7M10 6.5a.5.5 0 0 1 .5.5v3.5a.5.5 0 0 1-1 0V7a.5.5 0 0 1 .5-.5"></path>
                                            <path d="M13.5 10.5a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 1 .5.5"></path>
                                        </g>
                                    </svg>

                                </p>
                            </div>
                            <div className='d-flex flex-wrap justify-content-between ' style={{ marginTop: '60px' }}>
                                <div xl={3} className='d-flex p-3 p-lg-1'>
                                    <div className='box-icon' style={{ backgroundColor: '#C5E5F0' }}>

                                        <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                            width="2.5em" height="2.5em" viewBox="-150 -150 801 801"
                                            preserveAspectRatio="xMidYMid meet">
                                            <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                                                fill="#118ab2" stroke="none">
                                                <path d="M224 5066 c-58 -18 -126 -68 -163 -118 -66 -89 -61 84 -59 -2428 l3
-2285 25 -50 c31 -64 91 -124 155 -155 l50 -25 2325 0 2325 0 50 25 c64 31
124 91 155 155 l25 50 0 1170 0 1170 -24 53 c-30 67 -114 145 -178 166 -27 8
-460 97 -963 196 -503 100 -925 184 -937 187 l-22 5 -3 647 -3 646 -33 67
c-65 132 -128 164 -412 207 -113 17 -650 98 -1193 181 -543 82 -1009 150
-1035 149 -26 0 -65 -6 -88 -13z m1285 -376 c657 -100 1202 -185 1212 -191 10
-5 25 -19 33 -31 14 -20 16 -243 16 -2140 l0 -2118 -320 0 -320 0 0 509 c0
599 3 579 -95 676 -96 96 -91 95 -542 95 -354 0 -387 -1 -433 -19 -78 -30
-134 -81 -172 -159 l-33 -67 -3 -517 -3 -518 -270 0 c-303 0 -324 4 -353 65
-14 30 -16 253 -16 2263 0 1632 3 2238 11 2261 11 30 59 71 84 71 5 0 547 -81
1204 -180z m2410 -1911 c504 -99 927 -187 939 -195 54 -35 52 3 52 -1180 0
-1215 4 -1146 -65 -1178 -29 -14 -135 -16 -944 -16 l-911 0 0 1375 c0 756 3
1375 6 1375 4 0 419 -81 923 -181z m-2032 -1532 l28 -27 3 -505 3 -505 -426 0
-425 0 0 495 c0 331 4 502 11 518 6 13 23 31 37 40 24 15 64 17 384 14 l358
-2 27 -28z"/>
                                                <path d="M689 4035 c-56 -30 -62 -119 -13 -166 l26 -24 258 0 258 0 26 24 c50
47 42 137 -15 166 -40 21 -502 21 -540 0z"/>
                                                <path d="M1739 4021 c-47 -48 -37 -130 21 -164 24 -15 62 -17 265 -17 266 0
285 4 311 67 19 43 5 93 -33 123 -24 19 -40 20 -280 20 l-255 0 -29 -29z"/>
                                                <path d="M689 3395 c-56 -30 -62 -119 -13 -166 l26 -24 258 0 258 0 26 24 c50
47 42 137 -15 166 -40 21 -502 21 -540 0z"/>
                                                <path d="M1739 3381 c-47 -48 -37 -130 21 -164 24 -15 62 -17 265 -17 266 0
285 4 311 67 19 43 5 93 -33 123 -24 19 -40 20 -280 20 l-255 0 -29 -29z"/>
                                                <path d="M689 2755 c-56 -30 -62 -119 -13 -166 l26 -24 258 0 258 0 26 24 c50
47 42 137 -15 166 -40 21 -502 21 -540 0z"/>
                                                <path d="M1739 2741 c-47 -48 -37 -130 21 -164 24 -15 62 -17 265 -17 266 0
285 4 311 67 19 43 5 93 -33 123 -24 19 -40 20 -280 20 l-255 0 -29 -29z"/>
                                                <path d="M689 2115 c-56 -30 -62 -119 -13 -166 l26 -24 258 0 258 0 26 24 c50
47 42 137 -15 166 -40 21 -502 21 -540 0z"/>
                                                <path d="M1739 2101 c-47 -48 -37 -130 21 -164 24 -15 62 -17 265 -17 266 0
285 4 311 67 19 43 5 93 -33 123 -24 19 -40 20 -280 20 l-255 0 -29 -29z"/>
                                                <path d="M3659 2101 c-47 -48 -37 -130 21 -164 24 -15 62 -17 265 -17 266 0
285 4 311 67 19 43 5 93 -33 123 -24 19 -40 20 -280 20 l-255 0 -29 -29z"/>
                                                <path d="M3659 1461 c-47 -48 -37 -130 21 -164 24 -15 62 -17 265 -17 266 0
285 4 311 67 19 43 5 93 -33 123 -24 19 -40 20 -280 20 l-255 0 -29 -29z"/>
                                                <path d="M3659 821 c-47 -48 -37 -130 21 -164 24 -15 62 -17 265 -17 266 0
285 4 311 67 19 43 5 93 -33 123 -24 19 -40 20 -280 20 l-255 0 -29 -29z"/>
                                            </g>
                                        </svg>

                                    </div>
                                    <div className='d-flex flex-column'>
                                        <span className='number-entities' style={{ fontSize: '18px' }}>9457k</span>
                                        <span className='small-text-entities'>  کل آدرس‌ها</span>
                                    </div>
                                </div>
                                <div xl={3} className='d-flex p-3 p-lg-1' style={{ marginLeft: '13px' }}>
                                    <div className='box-icon' style={{ backgroundColor: '#C7F7EA' }}>

                                        <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                            width="2.5em" height="2.5em" viewBox="-60 -40 612 612"
                                            preserveAspectRatio="xMidYMid meet">

                                            <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                                                fill="#06d6a0" stroke="none">
                                                <path d="M170 4758 c-29 -31 -41 -79 -47 -189 -9 -154 11 -280 72 -469 30 -91
65 -212 79 -269 29 -119 52 -157 131 -221 55 -43 75 -67 75 -89 0 -6 -39 -59
-87 -118 -114 -141 -133 -178 -133 -263 0 -85 31 -207 69 -274 36 -62 132
-156 221 -216 162 -108 207 -154 231 -232 6 -18 14 -100 19 -183 5 -94 14
-167 25 -197 19 -54 127 -178 155 -178 10 0 32 8 48 17 27 15 38 16 87 6 177
-38 280 -138 376 -368 101 -244 141 -297 281 -371 79 -41 110 -65 203 -160
109 -110 112 -112 255 -182 185 -90 316 -135 395 -136 74 -1 114 20 235 128
98 87 149 116 208 116 88 0 114 -33 167 -210 20 -68 45 -136 56 -152 42 -59
156 -103 353 -138 304 -53 912 -90 944 -58 8 8 12 56 12 148 0 125 2 140 25
186 29 56 66 85 175 134 41 18 98 48 127 66 91 58 94 91 18 174 l-55 60 0 70
c0 131 -42 179 -204 231 -77 25 -109 41 -137 68 -54 52 -221 339 -213 365 3
12 33 58 66 103 71 100 88 138 88 200 0 90 -40 128 -161 152 -91 19 -93 22
-100 158 -5 93 -13 134 -34 192 -24 65 -26 83 -20 145 7 80 -2 116 -42 158
-34 36 -33 79 8 194 107 307 120 367 100 465 -28 136 -104 198 -306 250 -42
11 -62 25 -125 90 -41 42 -87 85 -103 94 -16 10 -70 23 -132 30 -109 14 -147
28 -295 111 l-65 36 -105 -5 c-123 -6 -272 -31 -349 -58 -77 -27 -142 -68
-256 -165 -187 -157 -273 -186 -575 -188 l-185 -1 -60 33 c-146 79 -369 270
-410 352 -13 25 -37 95 -55 155 -41 139 -77 210 -134 263 -36 33 -53 42 -81
42 -31 0 -45 -9 -98 -64 -88 -89 -132 -110 -222 -104 -58 4 -88 13 -156 46
-71 34 -99 56 -182 141 -107 110 -136 123 -177 79z m265 -265 c49 -33 175 -74
246 -80 108 -9 168 14 252 98 38 38 72 69 76 69 15 0 60 -57 84 -105 14 -27
40 -99 57 -159 17 -61 41 -129 52 -152 41 -88 310 -318 458 -392 l74 -37 186
1 c340 1 422 29 668 233 139 115 205 141 436 172 134 17 181 10 265 -40 102
-62 177 -90 239 -91 103 0 138 -16 216 -97 82 -86 110 -103 232 -137 78 -22
94 -31 131 -69 25 -27 46 -61 53 -88 22 -81 9 -141 -94 -437 -26 -73 -36 -119
-36 -161 0 -53 4 -63 36 -102 l36 -43 -7 -77 c-6 -69 -4 -85 24 -166 25 -74
31 -106 31 -179 1 -149 37 -199 163 -224 77 -15 97 -32 97 -80 0 -30 -15 -60
-75 -149 -42 -62 -78 -124 -81 -140 -7 -35 9 -74 91 -213 93 -157 151 -235
186 -254 17 -8 65 -27 107 -41 99 -33 149 -58 162 -82 5 -11 10 -46 10 -78 0
-84 17 -132 61 -177 29 -28 36 -42 29 -51 -6 -7 -71 -42 -144 -79 -201 -99
-236 -153 -236 -366 l0 -103 -167 7 c-442 18 -784 64 -924 124 -73 32 -95 70
-140 240 -37 142 -104 202 -225 202 -80 0 -136 -29 -244 -126 -101 -91 -174
-129 -227 -119 -48 9 -247 86 -334 130 -107 53 -155 89 -259 195 -75 75 -113
105 -177 138 -130 67 -166 114 -259 332 -96 229 -159 305 -305 375 -99 47
-176 63 -232 48 -38 -11 -44 -10 -65 10 -12 11 -35 46 -50 76 -24 50 -27 70
-33 206 -11 239 -46 300 -256 443 -139 94 -197 152 -239 237 -31 63 -37 86
-41 162 -7 107 -3 117 100 240 104 125 119 150 119 187 0 44 -19 72 -103 146
-80 72 -93 93 -109 179 -6 35 -38 147 -71 249 -52 160 -62 203 -71 307 -10
123 -7 252 7 274 5 9 35 -13 99 -76 50 -50 105 -99 121 -110z"/>
                                            </g>
                                        </svg>

                                    </div>
                                    <div className='d-flex flex-column'>
                                        <span className='number-entities'>9457k</span>
                                        <span className='small-text-entities'>   آدرس‌های ایرانی </span>
                                    </div>
                                </div>
                                <div xl={3} className='d-flex p-3 p-lg-1'>
                                    <div className='box-icon' style={{ backgroundColor: '#FFF6E0' }}>

                                        <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                            width="2.5em" height="2.5em" viewBox="-40 -40 582 582"
                                            preserveAspectRatio="xMidYMid meet">

                                            <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                                                fill="#ffd166" stroke="none">
                                                <path d="M3284 4456 c-50 -13 -137 -43 -195 -66 -306 -124 -367 -140 -532
-140 -176 0 -327 34 -507 115 -298 133 -448 139 -593 21 -94 -76 -121 -129
-198 -377 -38 -123 -97 -322 -131 -441 l-61 -217 -71 -17 c-286 -69 -544 -200
-624 -316 -133 -195 0 -386 368 -529 277 -108 725 -190 1260 -231 215 -16 916
-16 1125 0 674 54 1120 149 1419 305 90 47 197 141 227 200 60 116 20 241
-109 343 -105 82 -317 172 -541 229 l-85 21 -13 49 c-7 28 -42 188 -78 356
-69 327 -86 386 -136 480 -58 108 -193 206 -318 229 -76 14 -104 12 -207 -14z
m252 -171 c29 -14 73 -48 98 -76 58 -65 79 -131 151 -469 31 -146 84 -371 117
-500 33 -129 61 -246 62 -260 1 -23 -4 -25 -69 -37 -121 -23 -423 -61 -600
-77 -648 -58 -1251 -35 -1915 76 -203 33 -230 41 -230 62 0 72 291 1091 335
1176 20 38 86 97 127 115 80 33 192 8 398 -88 77 -36 200 -76 305 -99 37 -8
128 -13 235 -13 208 1 283 16 474 97 66 28 173 68 236 90 134 45 190 45 276 3z
m704 -1152 c157 -50 282 -115 347 -178 53 -51 55 -56 50 -92 -13 -80 -164
-179 -387 -251 -582 -190 -1567 -261 -2445 -176 -739 71 -1293 250 -1322 428
-5 35 -3 40 50 91 65 64 189 127 350 180 110 35 137 41 137 28 0 -5 -7 -33
-15 -63 -18 -66 -19 -143 -4 -173 15 -28 59 -76 82 -88 25 -14 309 -65 521
-94 748 -100 1462 -93 2222 25 192 30 226 41 267 90 45 53 47 121 8 253 l-20
67 27 -6 c15 -4 74 -22 132 -41z"/>
                                                <path d="M989 2126 c-133 -47 -213 -224 -180 -398 31 -163 111 -343 210 -476
137 -182 324 -311 566 -391 142 -47 266 -69 430 -78 187 -9 257 19 399 163 55
55 81 74 109 79 73 14 104 0 195 -91 59 -59 104 -94 151 -116 65 -33 67 -33
206 -32 429 3 806 175 1026 466 135 180 231 447 216 598 -16 148 -109 269
-221 285 -27 4 -112 -3 -222 -19 -384 -54 -667 -75 -1139 -83 -579 -9 -1148
26 -1580 97 -79 13 -122 12 -166 -4z m291 -175 c437 -60 704 -75 1285 -75 595
0 845 15 1318 80 177 24 189 25 213 9 55 -36 76 -142 49 -250 -115 -461 -499
-746 -1040 -772 -111 -5 -124 -4 -165 17 -24 12 -79 57 -121 100 -102 102
-148 125 -259 125 -111 0 -157 -23 -259 -125 -42 -43 -97 -88 -121 -100 -42
-21 -53 -22 -170 -17 -472 21 -840 255 -989 628 -77 193 -77 338 1 394 25 18
19 18 258 -14z"/>
                                                <path d="M1601 1754 c-143 -31 -220 -93 -229 -184 -6 -70 30 -140 120 -230
142 -142 349 -203 531 -155 78 20 124 45 185 100 99 89 136 229 81 310 -50 73
-164 132 -317 161 -93 18 -287 17 -371 -2z m408 -169 c76 -18 138 -51 147 -77
10 -34 -55 -116 -121 -151 -33 -18 -57 -22 -140 -22 -91 0 -106 3 -165 31 -36
17 -83 46 -105 65 -44 39 -95 106 -95 125 0 12 61 39 110 48 51 10 307 -4 369
-19z"/>
                                                <path d="M3207 1760 c-140 -24 -265 -84 -321 -153 -28 -36 -31 -45 -31 -110 1
-88 21 -130 97 -203 88 -86 186 -124 318 -124 142 0 276 53 384 151 217 199
181 371 -91 433 -77 17 -269 20 -356 6z m343 -161 c25 -5 55 -17 68 -25 21
-14 21 -16 8 -43 -27 -51 -141 -147 -203 -171 -71 -28 -195 -37 -249 -20 -80
25 -164 106 -164 157 0 60 173 111 385 112 61 0 130 -4 155 -10z"/>
                                            </g>
                                        </svg>

                                    </div>
                                    <div className='d-flex flex-column'>
                                        <span className='number-entities'>9457k</span>
                                        <span className='small-text-entities'> آدرس‌های کلاهبرداری </span>
                                    </div>
                                </div>
                                <div xl={3} className='d-flex p-3 p-lg-1'>
                                    <div className='box-icon' style={{ backgroundColor: '#FCD9E1' }}>

                                        <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                            width="2.5em" height="2.5em" viewBox="-70 -60 612 612"
                                            preserveAspectRatio="xMidYMid meet">

                                            <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                                                fill="#ef476f" stroke="none">
                                                <path d="M1995 4435 c-246 -46 -452 -191 -584 -410 -19 -31 -50 -102 -69 -158
-33 -95 -36 -113 -40 -250 l-4 -147 -42 -19 c-83 -37 -156 -149 -156 -241 0
-103 78 -212 182 -252 58 -22 60 -25 87 -89 52 -123 150 -249 263 -335 l58
-45 0 -137 c0 -152 -15 -205 -65 -238 -26 -17 -601 -243 -775 -305 -154 -55
-236 -105 -341 -209 -111 -110 -163 -191 -211 -330 l-32 -95 -4 -252 -4 -253
1859 0 c1255 0 1879 3 1919 11 235 41 459 174 609 362 457 571 165 1421 -551
1599 -132 33 -342 31 -474 -4 -120 -32 -210 -73 -314 -142 -145 -96 -300 -281
-357 -425 -12 -31 -23 -57 -24 -59 -1 -1 -56 18 -123 44 -88 34 -129 55 -153
81 l-34 34 -3 163 -3 162 41 28 c102 68 225 222 280 354 26 60 32 67 68 78
126 37 200 146 189 280 -7 98 -68 184 -154 221 l-33 13 0 100 c0 75 3 100 13
100 20 0 151 65 165 83 7 9 12 32 10 54 -2 30 -9 42 -36 58 -136 82 -204 136
-342 271 -110 106 -178 163 -230 194 -176 103 -391 142 -585 105z m335 -166
c139 -37 219 -89 364 -235 72 -72 157 -150 189 -174 57 -42 58 -44 35 -53 -48
-19 -226 -21 -314 -2 -78 16 -85 16 -109 1 -48 -32 -45 -105 5 -131 39 -20
220 -47 290 -43 l55 3 5 -138 c6 -155 8 -159 79 -171 22 -3 53 -18 70 -32 77
-65 31 -194 -70 -194 -60 0 -86 -17 -105 -69 -80 -224 -187 -353 -367 -441
-112 -54 -191 -73 -312 -73 -122 1 -201 20 -315 76 -156 77 -307 256 -349 414
-17 61 -41 86 -87 89 -21 1 -47 2 -56 3 -9 1 -30 15 -47 32 -26 26 -31 38 -31
79 0 63 38 106 105 116 77 11 85 30 85 203 0 182 16 258 76 380 38 76 62 110
128 176 185 187 422 251 676 184z m1759 -1789 c287 -82 502 -297 586 -585 100
-348 -40 -727 -344 -929 -145 -96 -285 -139 -461 -139 -129 -1 -200 12 -311
54 -277 106 -482 362 -529 659 -64 410 196 819 595 935 97 29 146 34 270 30
82 -3 143 -10 194 -25z m-2154 -97 c46 -14 94 -18 210 -18 141 0 208 9 288 40
15 7 17 -1 17 -88 0 -123 14 -186 53 -244 48 -71 95 -101 239 -159 129 -51
133 -54 131 -81 -9 -94 -5 -296 6 -348 51 -246 176 -451 361 -598 41 -33 77
-61 79 -63 2 -2 -651 -4 -1452 -4 l-1457 0 0 129 c0 78 6 159 15 203 38 180
161 351 320 443 22 13 236 98 475 190 239 92 456 180 481 196 54 34 106 103
125 166 8 27 14 91 14 155 0 99 2 109 18 104 9 -3 44 -13 77 -23z"/>
                                                <path d="M3775 2354 c-325 -52 -553 -285 -597 -608 -18 -139 19 -314 95 -440
44 -74 152 -181 227 -227 113 -67 198 -91 335 -97 146 -5 224 11 344 70 105
52 230 170 284 268 101 185 118 378 52 577 -60 178 -194 324 -369 402 -101 44
-275 70 -371 55z m221 -165 c24 -6 44 -14 44 -18 0 -9 -680 -685 -684 -680
-12 14 -26 111 -26 176 0 238 141 432 370 510 74 25 219 31 296 12z m250 -143
c24 -24 44 -47 44 -52 0 -5 -168 -177 -374 -383 l-374 -374 -29 24 c-16 13
-39 36 -52 52 l-24 29 374 374 c206 206 378 374 383 374 5 0 28 -20 52 -44z
m143 -263 c49 -246 -65 -486 -283 -593 -88 -43 -157 -60 -245 -60 -50 0 -121
12 -160 26 -10 3 99 119 324 344 187 187 343 340 346 340 3 0 11 -26 18 -57z"/>
                                            </g>
                                        </svg>

                                    </div>
                                    <div className='d-flex flex-column'>
                                        <span className='number-entities'>9457k</span>
                                        <span className='small-text-entities'> آدرس‌های تحریمی </span>
                                    </div>
                                </div>
                            </div>

                        </CardContent>
                    </Card>
                </Col>

                <Col lg={6} xl={4} className='order-2 order-lg-1'>
                    <Card style={{}}>
                        <CardContent className='pb-0'>
                            <div className='d-flex flex-wrap justify-content-between network-entiti'>
                                <div>
                                    <p className='entities-text'>
                                        شبکه های تحت پوشش
                                    </p>
                                    <p className='small-text-entities'>بر مبنای فول نود راه‌اندازی شده</p>
                                    <p className='entities-text'>
                                        8 شبکه
                                    </p>
                                    <p className='small-text-entities'>135513 توکن پشتیبانی شده</p>
                                </div>
                                <img src={imgCard} alt='img' className='img-entities' />
                            </div>

                        </CardContent>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Addresses