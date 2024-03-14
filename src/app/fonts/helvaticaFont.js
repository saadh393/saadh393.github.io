import localFont from 'next/font/local'

// Font files can be colocated inside of `app`
const HalveticaFont = localFont({
    src: [
        {
            path: './HelveticaNowDisplay-Regular.ttf',
            weight: '400',
            style: 'normal',
        }, {
            path: './HelveticaNowDisplay-Medium.ttf',
            weight: '500',
            style: 'normal',
        }, {
            path: './HelveticaNowDisplay-Bold.ttf',
            weight: '600',
            style: 'normal',
        }, {
            path: './HelveticaNowDisplay-Black.ttf',
            weight: '700',
            style: 'normal',
        }, {
            path: './HelveticaNowDisplay-ExtraBold.ttf',
            weight: '800',
            style: 'normal',
        },
    ],
})

export default HalveticaFont