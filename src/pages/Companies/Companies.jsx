import React, { useState, useEffect } from 'react'
import CompanyCard from './CompanyCard'
import Header from '../../components/Header'
import { getAllCompanies, updateCompany, deleteCompany } from '../../services/companyService'
import { Link, useNavigate } from 'react-router-dom'
import * as companyService from '../../services/companyService'
import "../../styles/Card.css"
import "../../styles/Header.css"
import '../../styles/index.css'


const Companies = (props) => {
  const [companies, setCompanies] = useState([])
  const navigate = useNavigate()

  const handleDeleteCompany = async (companyId) => {
    try {
      await deleteCompany(companyId)
      setCompanies(companies.filter((company) => company._id !== companyId))
    } catch (error) {
      throw error
    }
  }

    useEffect(() => {
    const fetchAllCompanies = async () => {
      const companyData = await getAllCompanies()
      setCompanies(companyData)
    }
    fetchAllCompanies()
    return () => { setCompanies([]) }
  }, [])
  
  return (
    <div className="layout">
      <Header title="All Companies" />
      <div className="create-company-container">
        <Link to="/companies/create"><h3>Add a Company</h3></Link>
      </div>
      {companies?.map((company) => (
          <CompanyCard
            company={company}
            key={company._id}
            user={props.user}
            handleDeleteCompany={handleDeleteCompany}
          />
      ))}
    </div>
  )
}

export default Companies