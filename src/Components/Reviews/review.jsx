import React from 'react'

import Coments from '../coments/coments';

export default function review() {
  return (
    <div className="lg:pr-[108px] lg:pl-[108px] pt-20">
      <h1 className="text-xl">دیدگاه‌ها و امتیازها</h1>
      <Coments />
      <Coments />
      <Coments />
    </div>
  )
}
