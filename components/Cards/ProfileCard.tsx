
import Image from 'next/image'
import React from 'react'
import RenderTag from '../shared/Search/RenderTag'
import Link from 'next/link'
import { GetTopInteractedTags } from '@/lib/actions/tag.actions'
interface props {
    profile:{
        _id:string,
        clerkId:string,
        name:string,
        username:string,
        picture:string,
     
    }
}
const ProfileCard = async({profile}:props) => {
const interactedTags= await GetTopInteractedTags({userId:profile._id})

  return (
    <Link className='shadow-light100_darknone' href={`/profile/${profile.clerkId}`}>
    <div className='shadow-light100_darknone flex flex-col items-center background-light900_dark200 rounded-xl dark:border-none w-full max-xs:min-w-full xs:w-[260px] p-4 gap-4'>
      <Image src={profile.picture} alt={profile.name} width={100} height={100} className='rounded-full' />
      <h3 className='h3-bold text-dark200_light900 line-clamp-1'>{profile.name}</h3>
      <p className='body-regular dark:text-light-500'>@{profile.username}</p>
      <div className='flex gap-2 flex-row items-center line-clamp-3'>
        {interactedTags.map((tag) => (
          <RenderTag key={tag} name={tag} _id={''} />
        ))}
      </div>
    </div>
  </Link>
  
  )
}

export default ProfileCard
