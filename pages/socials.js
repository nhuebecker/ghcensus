import {useState, useEffect} from 'react'
import fetch from 'isomorphic-unfetch'
import { filter } from 'lodash'

import { Instagram, Twitter, Camera } from 'react-feather';

import Wrapper from "../components/Wrapper"

const Home = ({ personalInfo, randomInfo }) => {
  const [inputValue, setInputValue] = useState("")
  const [socials, setSocials] = useState(personalInfo)

  useEffect(() => {
    console.log(inputValue)
    if (inputValue != "") {
      setSocials(filter(personalInfo, (p) => p.name.toLowerCase().includes(inputValue.toLowerCase())))
    } else {
      setSocials(personalInfo)
    }
    console.log(socials)
  }, [inputValue])

  return (
    <Wrapper title="GHP 57 Census">
        <header className="my-8">
          <h1 className="text-6xl font-black text-gray-700 text-center">GHP 57 Socials</h1>
        </header>
        <div>
          <div className="flex justify-center">
            <input className="border-2 p-2 rounded-lg outline-none" value={inputValue} placeholder={"Search..."} onChange={e => setInputValue(e.target.value)}/>
          </div>
          <div className="flex flex-wrap justify-center">
            {socials.map(person => (
              <div 
                className="w-64 mx-4 my-6 shadow rounded-lg transform transition duration-300 hover:shadow-md hover:scale-110"
                key={person.id} 
              >
                <p className="w-full py-1 text-center font-bold text-black bg-red-500 rounded-t-lg">
                  {person.name}
                </p>
                <div className="flex h-full justify-center mx-10 my-4">
                  {
                    person.instagram ?
                      (<a target="_blank" className="text-red-500 px-2" href={`https://instagram.com/${person.instagram}`}>
                        <Instagram size={36}/>
                      </a>) :
                      null
                  }
                  {
                    person.snapchat ?
                      (<a target="_blank" className="text-yellow-600 px-2" href={`https://snapchat.com/add/${person.snapchat}`}>
                        <Camera size={36}/>
                      </a>) :
                      null
                  }
                  {
                    person.twitter ?
                      (<a target="_blank" className="text-blue-600 px-2" href={`https://twitter.com/${person.instagram}`}>
                        <Twitter size={36}/>
                      </a>) :
                      null
                  }
                </div>
              </div>
            ))}
          </div>
        </div>
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
