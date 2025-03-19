import Avatar from "./Avatar";
import { UserInfo } from "../types/types";

type AvatarModalProps = {
  isAvatarModalOpen: boolean;
  setIsAvatarModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userInfo: UserInfo;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
};

function AvatarModal({
  isAvatarModalOpen,
  setIsAvatarModalOpen,
  userInfo,
  setUserInfo,
}: AvatarModalProps) {
  if (!isAvatarModalOpen) return null;

  function handleSetAvatar() {
    updateAvatar();
    setIsAvatarModalOpen(false);
  }

  // Updates the avatar_name field in User DB table based on userInfo.avatar_name state value
  const updateAvatar = async () => {
    try {
      const storedToken = localStorage.getItem("token");

      await fetch(`/api/users/${userInfo.id}/avatar`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
        body: JSON.stringify({ avatar_name: userInfo.avatar_name }),
      });
    } catch (error) {
      console.error("Error adding new avatar:", error);
    }
  };

  return (
    <>
      <div className="avatarModalOverlay">
        <div className="avatarModalContainer">
          <Avatar userInfo={userInfo} setUserInfo={setUserInfo} />
          <button onClick={() => handleSetAvatar()} className="avatarButton">
            Set avatar
          </button>
        </div>
      </div>
    </>
  );
}

export default AvatarModal;
