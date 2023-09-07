import React from "react"
import { useSetTitle } from "../../helpers/hooks/useSetTitle"
import { ImageUser } from "../../components/UI"

const Profile: React.FC = () => {
    useSetTitle("Profile")

    return (
        <div>
            <ImageUser />
        </div>
    )
}

export default Profile
