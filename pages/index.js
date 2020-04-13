import {useState, useEffect} from 'react'
import fetch from 'isomorphic-unfetch'
import { filter } from 'lodash'

import { Instagram, Twitter, Camera } from 'react-feather';

import Wrapper from "../components/Wrapper"

const Home = ({ personalInfo, randomInfo }) => {
  return (
    <Wrapper title="GHP 57 Census">
        <header className="my-8">
          <h1 className="text-6xl font-black text-gray-700 text-center">GHP 57 Census</h1>
          <h1 className="text-6xl font-black text-gray-700 text-center">This is a WIP</h1>
        </header>
    </Wrapper>
  )
}

export const getData = async () => {
  const personalInfo = await fetch('https://v2-api.sheety.co/6b27f4e118034ea092a116fab64dc74e/ghpApi/personalInfo')
    .then((r) => r.json())
    .then((r) => r['personalInfo'])
  const randomInfo = await fetch('https://v2-api.sheety.co/6b27f4e118034ea092a116fab64dc74e/ghpApi/randomInfo')
    .then((r) => r.json())
    .then((r) => r['randomInfo'])
  return [personalInfo, randomInfo]
}

export const getStaticProps = async () => {
  let [personalInfo, randomInfo] = await getData()
  return { props: { personalInfo, randomInfo } }
}

export default Home
