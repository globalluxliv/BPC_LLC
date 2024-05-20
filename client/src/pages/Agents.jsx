import React from 'react'
import MikeImage from '../photos/Mike.png';
import { FaPhone } from "react-icons/fa6";
import Footer from '../components/Footer';


export default function Agents() {
  return (
    <div>
      <section class="max-w-screen-xl mx-auto py-20 px-8 lg:px-10">
  <h2 class="text-4xl xl:text-5xl capitalize text-center text-indigo-900 font-bold">our team</h2>
  <hr class="mx-auto w-12 h-1 outline-0 border-0 bg-green-300 block mt-4 mb-6"/>
  <p class="text-center text-xl text-gray-800">Our team consists only of the best talents</p>

        <div class="flex flex-col gap-6 mt-16">
          

    {/* first person */}
    <div class="flex flex-col md:flex-row gap-6">
      <div class="w-full lg:w-1/4 rounded-3xl overflow-hidden">
              <img src={MikeImage} alt="https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                class="w-full h-full object-contain aspect-video lg:aspect-square" />
      </div>
      <div class="w-full lg:w-9/12 bg-blue-100 rounded-3xl flex flex-col justify-center p-8 lg:p-14">
        <h3 class="text-2xl capitalize text-indigo-900 font-semibold">Akm Mike Bhuiyan</h3>
        <span class="inline-block capitalize text-xl text-indigo-900 font-light mt-1.5 mb-5">Licensed Principal Broker</span>
              <p class="text-indigo-900 opacity-75 leading-normal">
               As a resident of New York for over 34 years, Mike Bhuiyan has extensive experience specializing in the ins and outs of this city. As a top-producing broker, his goal is to find his clients the best solutions using his dynamic ability to anticipate his client’s needs and exceeding their expectations every single time. Whether dealing with buyers or sellers, his strong knowledge of New York City’s neighborhoods, combined with his consistent history of making a deal happen, has earned him his growing success and set him apart as a top-ranking broker at DJK Residential. Prior to his successful real estate career, Mike has owned a national designer fashion business in the Garment District for over a decade. He is also very dedicated to community service. Utilizing his fluency in English, Bengali, Hindi, Urdu, Spanish, and Portuguese, Mike has travelled to over 82 countries with various interests and has established a school and college for the economically disadvantaged. In his free time, he is a Certified Leadership Trainer and Senator of the Junior Chamber International, Past District Governor for Lions Clubs International District 20-R2 New York, Progressive Melvin Jones Fellow of Lions Clubs International, Founder Presidents [ of District 20-R2 Foundation, Manhattan Downtown Community Alliance, Manhattan Downtown Multicultural Food Pantry and member of Real Estate Board of New York, Manhattan Association of Realtors, New York State Association of Realtors and National Association of Realtors.

              </p>
              <br/>
              <p>Phone: 212.884.2211</p>
              <email> Email: mbhuiyan@bpcresidential.com</email>
            </div>
          
    </div>
    
          {/* second person */}
    {/* <div class="flex flex-col md:flex-row-reverse gap-6">
      <div class="w-full lg:w-1/4 rounded-3xl overflow-hidden">
        <img src="https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Erin Calzoni" class="w-full h-full object-cover aspect-video lg:aspect-square"/>
      </div>
      <div class="w-full lg:w-9/12 bg-blue-100 rounded-3xl flex flex-col justify-center p-8 lg:p-14">
        <h3 class="text-2xl capitalize text-indigo-900 font-semibold">Erin Calzoni</h3>
        <span class="inline-block capitalize text-xl text-indigo-900 font-light mt-1.5 mb-5">nurse</span>
        <p class="text-indigo-900 opacity-75 leading-normal">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam saepe sint expedita suscipit nemo nihil cupiditate culpa temporibus, facere nisi.</p>
      </div>
          </div> */}
          
          {/* third person */}
    {/* <div class="flex flex-col md:flex-row gap-6">
      <div class="w-full lg:w-1/4 rounded-3xl overflow-hidden">
        <img src="https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" class="w-full h-full object-cover aspect-video lg:aspect-square"/>
      </div>
      <div class="w-full lg:w-9/12 bg-yellow-100 rounded-3xl flex flex-col justify-center p-8 lg:p-14">
        <h3 class="text-2xl capitalize text-indigo-900 font-semibold">jenna smith</h3>
        <span class="inline-block capitalize text-xl text-indigo-900 font-light mt-1.5 mb-5">
          pediatrician</span>
        <p class="text-indigo-900 opacity-75 leading-normal">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam saepe sint expedita suscipit nemo nihil cupiditate culpa temporibus, facere nisi.</p>
      </div>
    </div> */}
          
          {/* fourt person */}
    {/* <div class="flex flex-col md:flex-row-reverse gap-6">
      <div class="w-full lg:w-1/4 rounded-3xl overflow-hidden">
        <img src="https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" class="w-full h-full object-cover aspect-video lg:aspect-square"/>
      </div>
      <div class="w-full lg:w-9/12 bg-green-100 rounded-3xl flex flex-col justify-center p-8 lg:p-14">
        <h3 class="text-2xl capitalize text-indigo-900 font-semibold">christina meyer</h3>
        <span class="inline-block capitalize text-xl text-indigo-900 font-light mt-1.5 mb-5">psychologist</span>
        <p class="text-indigo-900 opacity-75 leading-normal">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam saepe sint expedita suscipit nemo nihil cupiditate culpa temporibus, facere nisi.</p>
            </div>
            
    </div> */}
  </div>
      </section>
      <Footer/> 
    </div>
  )
}
