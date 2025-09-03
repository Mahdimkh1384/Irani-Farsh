export default function Features({ featureTitle, featureValue }) {
    return (
      <div className='lg:w-[48%] sm:w-[50%] h-[60px] rounded-md bg-[#EDEDED] flex flex-col justify-center gap-2 pr-4 pt-2'>
        <h4 className='text-sm'>{featureTitle}</h4>
        <h1 className='text-lg'>{featureValue}</h1>
      </div>
    )
  }
  