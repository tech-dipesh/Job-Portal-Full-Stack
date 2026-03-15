import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import useFetchData from '../../hooks/useFetchData'
import { deleteCompany, getSingleCompany } from '../../api/auth.companies'
import Errorloading from '../../components/common/Errorloading'
import Linkcomps from '../../components/common/Linkcomps'
import Buttoncomps from '../../components/common/Button'
import AllCompanyJobs from './AllCompanyJobs'
import { useAuth } from '../../context/Authcontext'
import Popup from '../../components/Popup'
import { faCalendarPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import authUid from '../../auth/authUid'

export default function Singlecompany() {
  const { id } = useParams()
  const { data: insideValue } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [error, setError] = useState("")
  const { data, error: singleerr, loading, execute } = useFetchData(getSingleCompany)
  const { execute: deleteaction, error: deleteerr, data: deleteoutput } = useFetchData(deleteCompany)
  
  useEffect(() => {
    execute(id)
  }, [id])
  
  if(!authUid(id)){
    return <Errorloading data={{error: "Please Enter a Correct UID"}}/>
  }

  const clickDelete = async () => {
    await deleteaction(id);
    if (deleteoutput) {
      setTimeout(() => {
        navigate(0)
      }, 50);
    }
  }
  
  return (
    <div>
      <Errorloading data={{ error: error || singleerr, loading }} />
      {data &&
        <div className='bg-slate-800 rounded-xl p-6 space-y-3'>
          <h1 className='text-2xl font-bold text-white'>Name: {data.name}</h1>
          <p className='text-gray-400 text-sm leading-relaxed'>Description: {data.description}</p>

          <hr className='border-gray-700' />
          <div className='flex items-center gap-6 text-sm text-gray-400 font-bold'>
            <span><FontAwesomeIcon icon={faCalendarPlus} /><strong>Founded Year: {new Date(data?.created_at).toLocaleDateString()}</strong></span>
            <Link to={`https://${data?.website}`} className='text-blue-500 hover:underline' target='_blank'>Visit Website</Link>
          </div>
        </div>
      }
      {insideValue?.role == 'admin' &&
        <div className='flex gap-3 my-4'>
          {!open ?
            <span onClick={() => setOpen(true)}>
              <Buttoncomps values={'Delete Company'} color={'bg-red-500'} />
            </span>
            :
            <Popup setOpen={setOpen} error={error || singleerr} setError={setError} fetchError={deleteerr} type={'Company'}>
              <span onClick={clickDelete} className="justify-center flex">
                <Buttoncomps values="Delete Job" color={'bg-red-500'} />
              </span>
            </Popup>
          }
          <Buttoncomps values={<Linkcomps content={'Edit Company'} to={`edit`} />} />
        </div>
      }
      <AllCompanyJobs />
    </div>
  )
}
