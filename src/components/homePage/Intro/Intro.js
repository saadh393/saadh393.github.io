import React from 'react'
import PopularSpace from '../Cards/PopularSpace'
import IntroCard from '../Cards/IntroCard'

export default function Intro() {
    return (
        <div className='lg:grid lg:grid-cols-4'>
            <PopularSpace />
            <IntroCard />
        </div>
    )
}
