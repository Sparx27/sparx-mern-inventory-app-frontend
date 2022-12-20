import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Card from '../../components/card/Card'
import ChangePassword from '../../components/changePassword/ChangePassword'
import Loader from '../../components/loader/Loader'
import { selectUser } from '../../redux/features/auth/authSlice'
import { updateuser } from '../../services/authService'
import './Profile.scss'

const EditProfile = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const user = useSelector(selectUser)
  const { email } = user

  useEffect(() => {
    if (!email) {
      navigate('/profile')
    }
  }, [email, navigate])

  const initialState = {
    name: user?.name,
    email: user?.email,
    phone: user?.phone,
    bio: user?.bio,
    photo: user?.photo
  }
  const [profile, setProfile] = useState(initialState)
  const [profileImg, setProfileImg] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProfile({ ...profile, [name]: value })
  }

  const handleImgChange = (e) => {
    setProfileImg(e.target.files[0])
  }

  const saveProfile = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Handle Image upload
      let imageURL
      if (
        profileImg &&
        (
          profileImg.type === 'image/jpeg' ||
          profileImg.type === 'image/jpg' ||
          profileImg.type === 'image/png'
        )
      ) {
        const image = new FormData()
        image.append('file', profileImg)
        image.append('cloud_name', 'dfiidsyt7')
        image.append('upload_preset', 'vhiqs6en')

        // Save image to cloudinary
        const response = await fetch(
          'https://api.cloudinary.com/v1_1/dfiidsyt7/image/upload',
          { method: 'post', body: image }
        )
        const imgData = await response.json()
        imageURL = imgData.url.toString()
      }

      // Save Profile
      const formData = {
        name: profile.name,
        phone: profile.phone,
        bio: profile.bio,
        photo: profileImg ? imageURL : profile.photo
      }

      await updateuser(formData)
      toast.success('User updated')
      navigate('/profile')
    } catch (error) {
      setIsLoading(false)
      toast.error(error.message)
    }
  }

  return (
    <div className='profile --my2'>
      {isLoading && <Loader />}

      <Card cardClass='card --flex-dir-column'>

        <span className='profile-photo'>
          <img src={user?.photo} alt='profilepic' />
        </span>

        <form className='--form-control --m' onSubmit={saveProfile}>
          <span className='profile-data'>
            <p>
              <label>Name:</label>
              <input
                type='text' name='name' value={profile?.name}
                onChange={handleInputChange}
              />
            </p>
            <p>
              <label>Email:</label>
              <input type='email' name='email' value={profile?.email} disabled />
              <br />
              <code>Email cannot be changed.</code>
            </p>
            <p>
              <label>Phone:</label>
              <input
                type='text' name='phone' value={profile?.phone}
                onChange={handleInputChange}
              />
            </p>
            <p>
              <label>Bio:</label>
              <br />
              <textarea
                name='bio' value={profile?.bio} cols='30' rows='10'
                onChange={handleInputChange}
              />
            </p>
            <p>
              <label>Photo:</label>
              <input
                type='file' name='image'
                onChange={handleImgChange}
              />
            </p>
            <div>
              <button className='--btn --btn-primary'>Save Changes</button>
            </div>
          </span>
        </form>

      </Card>
      <br />

      <ChangePassword />
    </div>
  )
}

export default EditProfile
