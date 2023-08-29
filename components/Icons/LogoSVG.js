import React from "react";
import { SvgXml } from "react-native-svg";

export default function LogoSVG({fill, width, height}) {
    const logo =`<?xml version="1.0" standalone="no"?>
    <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20010904//EN"
     "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">
    <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
     width="2048.000000pt" height="2000.000000pt" viewBox="0 0 2048.000000 2000.000000"
     preserveAspectRatio="xMidYMid meet">
    
    <g transform="translate(0.000000,2000.000000) scale(0.100000,-0.100000)"
    fill=${fill} stroke="none">
    <path d="M10780 15183 c-167 -13 -391 -58 -559 -113 -171 -56 -398 -166 -448
    -216 -21 -21 -21 -24 -7 -84 41 -176 61 -305 69 -445 4 -55 8 -111 11 -124 6
    -27 14 -26 109 9 413 152 1072 187 1670 89 199 -33 266 -46 405 -80 19 -4 49
    -11 65 -15 52 -11 217 -61 295 -89 41 -14 95 -33 120 -42 63 -21 311 -141 422
    -204 428 -239 906 -637 1238 -1029 176 -207 276 -350 560 -800 131 -206 174
    -268 278 -392 91 -108 92 -109 196 -98 81 10 200 43 273 76 17 8 34 14 38 14
    20 0 244 120 328 176 160 107 356 309 438 452 33 56 32 82 -1 82 -33 0 -170
    30 -232 51 -176 59 -387 192 -645 408 -125 105 -247 217 -692 632 -869 814
    -1577 1273 -2361 1532 -348 116 -657 180 -995 207 -111 9 -471 11 -575 3z"/>
    <path d="M9288 14767 c-236 -124 -418 -264 -858 -663 -213 -193 -260 -238
    -260 -253 0 -18 130 -151 147 -151 8 0 44 30 81 66 170 166 436 324 672 399
    145 47 183 54 316 62 89 5 117 10 122 21 7 18 -24 263 -44 351 -18 77 -53 181
    -67 199 -14 18 -18 16 -109 -31z"/>
    <path d="M10645 14014 c-16 -2 -70 -9 -120 -15 -213 -26 -412 -79 -564 -151
    -120 -56 -131 -70 -131 -160 0 -40 -5 -142 -11 -227 -9 -121 -9 -155 1 -161 7
    -4 155 -10 329 -13 422 -7 710 -37 1076 -110 55 -11 111 -22 125 -24 54 -11
    279 -75 358 -103 417 -147 804 -401 1216 -800 266 -257 435 -515 636 -970 149
    -340 222 -463 336 -569 128 -120 307 -191 480 -191 258 0 627 156 923 390 88
    69 120 104 104 113 -5 2 -55 19 -113 36 -174 54 -319 146 -468 299 -129 132
    -239 286 -462 642 -258 413 -422 622 -711 905 -573 562 -1141 878 -1839 1024
    -324 67 -471 83 -825 86 -170 2 -323 1 -340 -1z"/>
    <path d="M9355 13894 c-11 -2 -45 -9 -75 -15 -146 -28 -372 -138 -545 -265
    -82 -60 -225 -205 -225 -228 0 -8 8 -30 18 -48 20 -37 63 -149 83 -218 7 -25
    17 -50 21 -57 10 -12 3 -14 253 62 66 19 158 44 205 55 47 11 101 24 120 29
    19 5 67 15 105 21 128 23 142 28 154 58 12 29 44 563 35 586 -9 23 -83 33
    -149 20z"/>
    <path d="M7893 13553 c-81 -106 -156 -243 -219 -400 -48 -120 -54 -138 -79
    -252 -29 -129 -49 -491 -27 -491 4 0 50 43 102 96 151 152 314 265 527 365 55
    26 104 53 108 58 19 32 -67 257 -155 404 -61 103 -190 257 -215 257 -7 0 -26
    -17 -42 -37z"/>
    <path d="M9650 12945 c-190 -20 -433 -70 -625 -127 -204 -60 -341 -111 -359
    -131 -25 -30 -17 -98 19 -174 23 -47 74 -104 270 -300 312 -312 444 -483 561
    -728 96 -201 118 -292 119 -490 0 -119 -4 -163 -19 -215 -50 -169 -183 -358
    -337 -476 -60 -46 -187 -114 -213 -114 -8 0 -25 -4 -38 -9 -13 -6 -40 -12 -61
    -16 -33 -5 -45 -16 -102 -94 -156 -212 -358 -353 -600 -417 -87 -23 -121 -27
    -260 -28 -167 -1 -235 9 -370 56 -134 45 -280 143 -401 266 -45 45 -85 82 -91
    82 -5 0 -27 -9 -49 -19 -36 -18 -115 -38 -329 -87 -206 -46 -363 -130 -485
    -260 -65 -69 -130 -180 -152 -259 -17 -60 -21 -242 -8 -295 40 -151 103 -263
    180 -315 40 -26 53 -30 115 -30 91 0 180 42 249 115 79 85 97 139 105 315 7
    165 15 187 76 225 46 29 131 27 175 -3 63 -42 75 -75 78 -229 3 -88 8 -140 15
    -146 12 -9 163 -54 222 -66 17 -3 62 -13 100 -21 378 -83 805 -148 1144 -175
    195 -15 604 -12 857 5 242 17 424 34 437 42 5 3 7 17 4 32 -3 14 -12 64 -21
    111 -62 327 67 604 321 691 60 21 86 24 218 24 205 -1 269 -18 562 -151 211
    -95 287 -110 417 -80 136 31 172 36 267 36 76 0 99 3 99 13 0 8 -11 40 -24 73
    -51 126 -69 219 -68 364 1 365 174 683 497 913 161 114 289 156 495 164 252 9
    438 -39 690 -177 31 -17 57 -25 58 -20 2 6 -22 68 -53 138 -32 70 -65 145 -75
    167 -206 463 -311 629 -549 865 -225 224 -452 403 -687 544 -392 234 -872 358
    -1607 416 -171 13 -624 11 -767 -5z"/>
    <path d="M8225 12509 c-112 -58 -200 -122 -296 -218 -143 -143 -207 -271 -228
    -456 -10 -88 -7 -121 14 -129 7 -2 41 2 76 10 86 20 321 19 419 -1 172 -37
    289 -90 434 -200 144 -108 277 -283 342 -451 20 -52 39 -94 43 -94 14 0 39 57
    51 113 10 48 9 71 -5 139 -31 154 -82 233 -288 447 -266 276 -364 422 -426
    636 -27 92 -41 153 -41 179 0 33 -10 56 -24 56 -6 0 -38 -14 -71 -31z"/>
    <path d="M7925 11399 c-200 -18 -406 -138 -516 -301 -95 -139 -133 -263 -133
    -428 0 -102 4 -125 32 -207 42 -124 84 -194 165 -280 98 -103 196 -162 352
    -211 80 -25 271 -22 365 7 212 65 364 190 454 374 65 136 79 199 74 348 -5
    130 -20 193 -74 304 -129 263 -418 421 -719 394z m231 -510 c57 -27 116 -87
    145 -147 26 -56 31 -178 9 -233 -40 -99 -125 -169 -229 -190 -214 -42 -401
    151 -351 363 17 71 30 95 82 147 73 73 129 93 236 85 35 -3 84 -14 108 -25z"/>
    <path d="M12570 10684 c-47 -9 -157 -55 -202 -83 -132 -84 -250 -215 -313
    -346 -146 -308 -88 -578 184 -858 124 -127 231 -168 347 -131 64 20 115 64
    140 122 63 144 80 347 45 524 -26 130 -26 132 0 185 64 132 249 119 302 -21
    63 -170 61 -529 -4 -727 -59 -179 -171 -314 -317 -380 -52 -24 -161 -49 -217
    -49 -64 -1 -71 -9 -57 -71 44 -190 13 -445 -81 -669 -56 -134 -56 -140 18
    -166 96 -33 113 -42 202 -99 160 -104 182 -110 294 -74 183 58 246 118 285
    267 9 33 18 146 23 281 10 235 20 307 69 451 27 82 36 101 165 356 48 95 87
    179 87 187 0 9 4 18 9 21 5 3 11 16 14 28 3 13 14 55 25 93 51 177 50 290 -5
    465 -106 336 -314 548 -643 657 -92 30 -120 35 -225 38 -66 2 -131 1 -145 -1z"/>
    <path d="M10285 9343 c-44 -19 -56 -30 -87 -88 -18 -33 -22 -56 -22 -130 0
    -109 12 -151 105 -373 103 -243 130 -315 169 -452 55 -189 55 -449 1 -585 -73
    -185 -238 -378 -385 -450 -227 -112 -608 -124 -1106 -36 -136 24 -229 41 -275
    51 -27 5 -72 14 -100 19 -43 9 -225 47 -335 71 -19 4 -71 16 -115 25 -44 9
    -96 20 -115 25 -35 8 -243 52 -335 71 -27 6 -66 15 -85 19 -87 19 -319 65
    -405 79 -366 63 -677 67 -915 10 -190 -45 -310 -114 -367 -209 -99 -165 -83
    -306 61 -540 139 -226 186 -347 186 -479 0 -49 3 -62 19 -71 12 -6 108 -10
    243 -10 558 0 1433 -41 2243 -105 105 -8 246 -19 315 -25 69 -5 267 -21 440
    -35 173 -14 421 -30 550 -35 753 -31 755 -31 955 -71 116 -22 179 -23 222 0
    65 33 86 69 80 144 -2 34 -16 96 -31 137 -32 88 -56 212 -56 291 0 62 23 222
    41 284 46 162 174 364 444 700 209 261 307 409 410 620 102 209 127 298 128
    450 2 217 -73 350 -243 434 -161 79 -257 95 -400 66 -160 -33 -207 -37 -310
    -32 -110 6 -225 37 -341 90 -30 14 -90 42 -134 62 -136 64 -211 85 -315 91
    -75 3 -103 1 -135 -13z"/>
    <path d="M13557 8413 c-4 -3 -7 -40 -8 -82 -1 -93 -12 -211 -29 -313 l-13 -76
    30 -49 c53 -82 90 -168 119 -275 25 -93 28 -118 27 -253 0 -135 -3 -158 -27
    -230 -26 -76 -81 -191 -116 -245 -55 -82 -96 -177 -132 -300 -28 -98 -96 -150
    -195 -150 -85 0 -158 46 -308 195 -137 136 -226 258 -317 435 -85 166 -120
    286 -127 434 l-6 119 -60 33 c-59 33 -141 64 -168 64 -32 0 -88 -91 -112 -182
    -11 -40 -12 -69 -4 -127 13 -97 59 -249 100 -326 126 -242 299 -419 594 -610
    278 -180 446 -317 542 -442 14 -18 31 -33 38 -33 6 0 25 24 40 53 42 77 115
    183 245 357 190 252 275 417 335 650 63 243 60 570 -7 784 -29 93 -109 252
    -160 318 -56 73 -164 182 -219 224 -50 37 -52 37 -62 27z"/>
    <path d="M13207 7601 c-99 -55 -257 -104 -372 -113 -24 -3 -31 -8 -33 -29 -4
    -33 47 -167 101 -269 80 -149 205 -314 234 -308 8 2 32 35 54 73 160 286 163
    295 163 425 -1 113 -42 262 -73 260 -3 -1 -36 -18 -74 -39z"/>
    </g>
    </svg>
    `

    const LogoSVG = () => <SvgXml xml={logo} width={width} height={height} />;
    return (   
        <LogoSVG/>
    )
}        