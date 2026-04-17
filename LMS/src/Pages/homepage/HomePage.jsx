import { useState, useEffect } from "react"
import axios from "axios"
import Header from "../../components/Header"
import Banner from "./Banner"
import BooksGrid from "./BooksGrid"
import './homepage.css'

export default function HomePage({books}) {

  return (
    <div className="home-page">
      <title>HomePage</title>
      
      <Header />

      <Banner />

      <BooksGrid books={books} />
    </div>
  )
}
