export default function Employecomps({ uid, full_name, email, experience, education, role, resume_url, profile_pic_url }) {
  return (
    <div key={uid} className='bg-neutral-600  rounded-xl shadow-lg transition-shadow flex justify-between items-start flex-col gap-3 border border-gray-200 p-8 min-h-auto w-82 '>
      {email && <p className='text-gray-600 text-center mb-4'>{email}</p>}
      {full_name && <div className='text-gray-700'>Full Name: {full_name}</div>}
      {experience && <h2>Experience Years: {experience}</h2>}
      {education && <div>Education: {education}</div>}
      {role && <div>Role:{role}</div>}
       {resume_url && 
      <iframe src={resume_url} width="20%" height="200px">
  <p>Your browser does not support iframes. <a href={resume_url}>Download the PDF</a>.</p>
    </iframe>
      }
    {profile_pic_url &&
     <img src={profile_pic_url} className='w-32 h-32 rounded-full object-cover'/>
    }
    </div>
  )
}
