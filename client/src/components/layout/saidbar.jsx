import { Card, IconButton, Input, Typography } from '@material-tailwind/react'
import React from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

const Saidbar = () => {
  return (
    <Card className="col-start-2 col-end-4 row-span-8 bg-blue-gray-900 shadow-lg rounded-none rounded-l-lg px-6 py-4">
      <div className="relative flex w-full gap-2 md:w-max">
            <Input
              type="search"
              color="white"
              label="Search..."
              className="pr-20"
              containerProps={{
                className: "min-w-[288px]",
              }}
            />
            <IconButton variant="text" color="white">
              <MagnifyingGlassIcon className="h-4 w-4"/>
            </IconButton>
          </div>
    </Card>
  )
}

export default Saidbar