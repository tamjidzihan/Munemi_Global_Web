import Salek_KHAN_IMG from '../../assets/team/Advocate_Salek_Khan.jpg'
import Forkanuzzaman_IMG from '../../assets/team/Advocate_Forkanuzzaman.jpg'

const boardMembers = [
    {
        name: 'Md. Nazrul Islam',
        designation: 'Chairman',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4ef',
    },
    {
        name: 'Advocate Salek KHAN',
        designation: 'Director',
        image: Salek_KHAN_IMG,
    },
    {
        name: 'Advocate Forkanuzzaman',
        designation: 'Director',
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
                            <div className="bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 group-hover:-translate-y-2">
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
