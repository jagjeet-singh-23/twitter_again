import { useState, useEffect, useCallback } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";
import useEditModal from "@/hooks/useEditModal";

import Modal from "../Modal";
import Input from "../Input";
import ImageUpload from "../ImageUpload";

const EditModal = () => {
  const { data: currentUser } = useCurrentUser();
  const { mutate: mutateFetchedUser } = useUser(currentUser?.id);
  const editModal = useEditModal();

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setName(currentUser?.name);
    setUsername(currentUser?.username);
    setBio(currentUser?.bio);
    setProfileImage(currentUser?.profileImage);
    setCoverImage(currentUser?.coverImage);
  }, [
    currentUser?.name,
    currentUser?.username,
    currentUser?.bio,
    currentUser?.profileImage,
    currentUser?.coverImage
  ]);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      await axios.patch('/api/edit', {
        name,
        username,
        bio,
        profileImage,
        coverImage
      });
      mutateFetchedUser();
      toast.success("Profile updated successfully");
      editModal.onClose();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false);
    }
  }, [name, username, bio, profileImage, coverImage, editModal, mutateFetchedUser]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <ImageUpload
        value={profileImage}
        disabled={isLoading}
        onChange={(image) => setProfileImage(image)}
        label="Upload profile image..."
      />
      <ImageUpload
        value={coverImage}
        disabled={isLoading}
        onChange={(image) => setCoverImage(image)}
        label="Upload cover image..."
      />
      <Input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        disabled={isLoading}
      />
      <Input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        disabled={isLoading}
      />
      <Input
        placeholder="Bio"
        onChange={(e) => setBio(e.target.value)}
        value={bio || ''}
        disabled={isLoading}
      />
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      title="Edit Profile"
      actionLabel="Save Changes"
      isOpen={editModal.isOpen}
      onSubmit={onSubmit}
      onClose={editModal.onClose}
      body={bodyContent}
    />
  )
}

export default EditModal