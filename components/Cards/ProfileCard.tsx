
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
    <Link href={`/profile/${profile.clerkId}`}  className='shadow-light100_darknone max-s:min-w-full xs:w[260px]' >
    <section className='background-light900_dark200 light-border flex w-full flex-col items-center justify-center rounded-2xl border p-8'>
      <Image src={profile.picture} alt={profile.name} width={100} height={100} className='rounded-full' />
      <div className='mt-4 text-center '>
      <h3 className='h3-bold text-dark200_light900 line-clamp-1'>{profile.name}</h3>
      <div className='body-regular dark:text-light-500'>@{profile.username}</div>
 </div>
      <div className='flex gap-2 flex-row items-center line-clamp-3 mt-4'>
        {interactedTags.map((tag) => (
          <RenderTag key={tag} name={tag} _id={''} />
        ))}
      </div>
    </section>
  </Link>
  
  )
}

export default ProfileCard
