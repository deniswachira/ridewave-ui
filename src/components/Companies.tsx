import bmw from "../assets/logos/bmw.png"
import toyota from "../assets/logos/toyota.png"
import mazda from "../assets/logos/mazda.png"

export default function Companies() {
    return (
        <div className="flex flex-col place-items-center min-w-lg bg-base-200 ">
            <h1 className="text-3xl font-bold">Our Trusted <span className="text-green-800">Brands</span>  our customers love</h1>
            <div className="flex flex-wrap justify-center lg:gap-40 gap-10 md:gap-20 mt-8 md:justify-around">
                <div className="text-gray-600 dark:text-gray-600 hover:shadow-2xl hover:animate-ping hover:delay-300 p-2 ">
                    <img src={bmw} width= "100px"  alt=""  />
                </div>
                <div className="text-gray-600 dark:text-gray-600 hover:animate-bounce transition hover:delay-300">
                    <img src={toyota} width={200} height={200} alt="" />
                </div>
                <div className="text-gray-600 dark:text-gray-600 hover:motion-safe:animate-spin transition hover:delay-300">
                    <img src={bmw} width="100px" alt="" />
                </div>
                <div className="text-gray-600 dark:text-gray-600 hover:animate-bounce transition hover:delay-300">
                    <img src={mazda} width={180} alt="" />
                </div>
                <div className="text-gray-600 dark:text-gray-600 hover:animate-pulse transition hover:delay-300">
                    <img src={bmw} width="100px" alt="" />
                </div>
            </div>
        </div>
    )
}


