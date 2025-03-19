import Salek_KHAN_IMG from '../../assets/team/Advocate_Salek_Khan.jpg'
import Forkanuzzaman_IMG from '../../assets/team/Advocate_Forkanuzzaman.jpg'
import NazmulIslam_IMG from '../../assets/team/Nazrul_Islam.jpg'
import NowhserAli_IMG from '../../assets/team/Nowhser_Ali.jpg'

const boardMembers = [
    {
        name: 'Md. Nazrul Islam',
        designation: 'Chairman',
        image: NazmulIslam_IMG,
    },
    {
        name: 'Nowhser Ali Chisty',
        title: 'Member of FBCCI',
        designation: 'Executive Director',
        image: NowhserAli_IMG,
    },
    {
        name: 'Advocate Salek KHAN',
        designation: 'Adviser',
        image: Salek_KHAN_IMG,
    },
    {
        name: 'Advocate Forkanuzzaman',
        designation: 'Adviser',
        image: Forkanuzzaman_IMG,
    }

]
export function BoardMembers() {
    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-3xl text-midnight font-bold text-center mb-4">
                    Our Board Members
                </h2>
                <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                    Meet our experienced team of immigration specialists and consultants
                    who are dedicated to helping you achieve your immigration goals
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {boardMembers.map((member, index) => (
                        <div key={index} className="group">
                            <div className="bg-white max-h-[600px] rounded-lg overflow-hidden shadow-md transition-transform duration-300 group-hover:-translate-y-2">
                                <div className="aspect-w-3 aspect-h-4 relative">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>
                                <div className="p-6 text-center">

                                    <h3 className="font-bold text-lg mb-1 group-hover:text-red-500 transition-colors">
                                        {member.name}
                                    </h3>
                                    {member.title && <p className=' text-sm text-gray-500'>({member.title})</p>}
                                    <p className="text-gray-600">{member.designation}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
