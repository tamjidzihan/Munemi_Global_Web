import { useAuth } from '../../../context/AuthContext';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import CoverOne from '../../../assets/cover-01.png';

const Profile = () => {
  const { user } = useAuth()
  return (
    <>
      <Breadcrumb pageName="Profile" />

      <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default ">
        <div className="relative z-20 h-35 md:h-65">
          <img
            src={CoverOne}
            alt="profile cover"
            className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
          />
        </div>
        <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
          <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 p-1 backdrop-blur-sm border-4 border-white shadow-lg sm:h-44 sm:max-w-44 sm:p-3">
            <div className="relative mt-7 md:mt-10 drop-shadow-2 text-5xl md:text-6xl lg:text-7xl text-white font-bold text-center w-full">
              {user?.firstName ? (
                user.firstName.slice(0, 1).toUpperCase() + user.lastName.slice(0, 1).toUpperCase()
              ) : (
                "NA"
              )}
            </div>

          </div>
          <div className="mt-4">
            <div className="mb-1.5 text-2xl font-semibold text-black ">
              {user?.firstName}{" "} {user?.lastName}
            </div>
            <div className="font-medium text-purple-600 bg-purple-100 px-4 py-2 rounded-full"> {user?.role === 2 ? "Admin" : "User"}</div>
            <div className="mx-auto max-w-180">
              <h4 className="font-semibold text-black ">
                About Me
              </h4>
              <p className="mt-4.5">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Pellentesque posuere fermentum urna, eu condimentum mauris
                tempus ut. Donec fermentum blandit aliquet. Etiam dictum dapibus
                ultricies. Sed vel aliquet libero. Nunc a augue fermentum,
                pharetra ligula sed, aliquam lacus.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
