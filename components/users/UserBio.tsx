interface UserBioProps {
    userId: string;
}

const UserBio:React.FC<UserBioProps> = ({
    userId
}) => {
  return (
    <div>UserBio</div>
  )
}

export default UserBio