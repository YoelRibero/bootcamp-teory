import { Part } from './Part'

export const Content = ({
  partOne,
  exerciseOne,
  partTwo,
  exerciseTwo,
  partThree,
  exerciseThree,
}) => (
  <div>
    <Part part={partOne} exercise={exerciseOne} />
    <Part part={partTwo} exercise={exerciseTwo} />
    <Part part={partThree} exercise={exerciseThree} />
  </div>
);