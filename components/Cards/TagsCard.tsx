
import React from 'react'
import RenderTag from '../shared/Search/RenderTag'
import Link from 'next/link'
interface props {
tag :{
    _id:string,
    name:string,
}
}
const TagsCard = ({tag}:props) => {
  return (
    
    <Link href={`/profile/${tag._id}`}>
    <div className='shadow-light100_darknone flex flex-col items-center background-light900_dark200 rounded-xl border-none w-full max-xs:min-w-full xs:w-[260px] p-4 gap-4'>
      <RenderTag name={tag.name} _id={''} />
    </div>
  </Link>
  )
}

export default TagsCard
